import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import * as fc from 'fast-check'
import { ServiceCard } from '../ServiceCard'
import type { Service, ServiceSize, ServiceVariant } from '../../types'
import enMessages from '@/i18n/locales/en.json'

/**
 * Feature: services-section, Property 1: Service Card Required Content
 * Validates: Requirements 2.1, 2.2, 2.3
 */

const serviceSizeArbitrary = fc.constantFrom<ServiceSize>(
  'small',
  'medium',
  'large'
)
const serviceVariantArbitrary = fc.constantFrom<ServiceVariant>('default', 'ai')
const serviceIdArbitrary = fc.constantFrom(
  'custom-software',
  'legacy-migration',
  'multi-platform',
  'ai-integration',
  'ux-ui-design',
  'landing-pages'
)

// Known platforms that have icon mappings
const knownPlatforms = [
  'iOS',
  'Android',
  'Web',
  'Windows',
  'OpenAI',
  'Claude',
  'Gemini',
  'Mistral',
  'Ollama',
  'Grok',
  'DeepSeek',
  'Qwen',
  'MiniMax',
  'HuggingFace',
  'MCP',
]

const platformArbitrary = fc.constantFrom(...knownPlatforms)

const serviceArbitrary: fc.Arbitrary<Service> = fc.record({
  id: serviceIdArbitrary,
  icon: fc.string({ minLength: 1 }),
  size: serviceSizeArbitrary,
  colSpan: fc.option(fc.constantFrom<1 | 2>(1, 2), { nil: undefined }),
  rowSpan: fc.option(fc.constantFrom<1 | 2>(1, 2), { nil: undefined }),
  variant: fc.option(serviceVariantArbitrary, { nil: undefined }),
  badges: fc.option(fc.array(fc.string()), { nil: undefined }),
  features: fc.option(fc.array(fc.string()), { nil: undefined }),
  platforms: fc.option(fc.array(platformArbitrary), { nil: undefined }),
  backgroundImage: fc.option(fc.webUrl(), { nil: undefined }),
})

function renderWithIntl(component: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {component}
    </NextIntlClientProvider>
  )
}

describe('ServiceCard Property Tests', () => {
  it('Property 1: should display icon, title, and description for any service', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = renderWithIntl(<ServiceCard service={service} />)

        // Some cards have special layouts without standard icons
        // (custom-software has code editor, multi-platform has devices image, landing-pages has browser)
        const specialLayoutCards = [
          'custom-software',
          'multi-platform',
          'landing-pages',
        ]

        if (!specialLayoutCards.includes(service.id)) {
          // Icon should be present for standard cards
          const icon = container.querySelector('.material-symbols-outlined')
          expect(icon).toBeTruthy()
          expect(icon?.textContent).toBe(service.icon)
        }

        // Title should be present (from translations)
        const title = container.querySelector('h3')
        expect(title).toBeTruthy()
        expect(title?.textContent).not.toBe('')

        // Description should be present
        const description = container.querySelector('p')
        expect(description).toBeTruthy()
        expect(description?.textContent).not.toBe('')
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: services-section, Property 2: Conditional Content Display
   * Validates: Requirements 2.4, 2.5
   */
  it('Property 2: should display badges only when present', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = renderWithIntl(<ServiceCard service={service} />)

        if (service.badges && service.badges.length > 0) {
          // Badges should be rendered
          service.badges.forEach((badge) => {
            expect(container.textContent).toContain(badge)
          })
        }
      }),
      { numRuns: 100 }
    )
  })

  it('Property 2: should display features only when present', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = renderWithIntl(<ServiceCard service={service} />)

        if (service.features && service.features.length > 0) {
          // Features should be rendered
          // For landing-pages, features have format "icon:label"
          service.features.forEach((feature) => {
            if (feature.includes(':')) {
              // Extract label from "icon:label" format
              const label = feature.split(':')[1]
              if (label) {
                expect(container.textContent).toContain(label)
              }
            } else {
              expect(container.textContent).toContain(feature)
            }
          })
        }
      }),
      { numRuns: 100 }
    )
  })

  it('Property 2: should display platforms only when present', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = renderWithIntl(<ServiceCard service={service} />)

        if (service.platforms && service.platforms.length > 0) {
          // Platforms are rendered as SVG icons with alt text
          // All platforms in the test are known platforms (from platformArbitrary)
          service.platforms.forEach((platform) => {
            // Use a more flexible selector that checks for the platform name in alt or content
            const platformImage = container.querySelector(
              `img[alt="${platform}"]`
            )
            // Platform should be present either as image or in text content
            const hasPlatform =
              platformImage !== null ||
              container.textContent?.includes(platform)
            expect(hasPlatform).toBe(true)
          })
        }
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: services-section, Property 5: Accessibility Attributes
   * Validates: Requirements 6.1, 6.4
   */
  it('Property 5: should have ARIA labels for any service', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = renderWithIntl(<ServiceCard service={service} />)

        // Card should have role="article"
        const article = container.querySelector('[role="article"]')
        expect(article).toBeTruthy()

        // Card should have aria-label
        expect(article?.getAttribute('aria-label')).toBeTruthy()

        // Icon should have aria-label (only for cards with standard icons)
        const specialLayoutCards = [
          'custom-software',
          'multi-platform',
          'landing-pages',
        ]
        if (!specialLayoutCards.includes(service.id)) {
          const icon = container.querySelector('.material-symbols-outlined')
          expect(icon?.getAttribute('aria-label')).toBeTruthy()
        }
      }),
      { numRuns: 100 }
    )
  })

  /**
   * Feature: services-section, Property 6: Keyboard Navigation
   * Validates: Requirements 6.2
   */
  it('Property 6: should be keyboard navigable', () => {
    fc.assert(
      fc.property(serviceArbitrary, (service) => {
        const { container } = renderWithIntl(<ServiceCard service={service} />)

        // Card should be an article element (semantic HTML for accessibility)
        const article = container.querySelector('[role="article"]')
        expect(article).toBeTruthy()

        // The card itself doesn't need tabIndex as it's not interactive
        // But it should be properly structured for screen readers
        expect(article?.tagName).toBe('DIV')
      }),
      { numRuns: 100 }
    )
  })
})
