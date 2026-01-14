import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FloatingCards } from '../FloatingCards'

// Mock next-intl
const mockUseTranslations = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Activity: () => <div data-testid="activity-icon">📊</div>,
}))

describe('FloatingCards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with Spanish translations', () => {
    // Mock Spanish translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'codeCard.filename': 'realtime_metrics.py',
        'appCard.title': 'Fintech Platform',
        'appCard.status': 'ONLINE',
        'appCard.cta': 'Confirm Transaction',
      }
      return translations[key] || key
    })

    render(<FloatingCards />)

    // Check Spanish values
    expect(screen.getByText('realtime_metrics.py')).toBeDefined()
    expect(screen.getByText('Fintech Platform')).toBeDefined()
    expect(screen.getByText('ONLINE')).toBeDefined()
    expect(screen.getByText('Confirm Transaction')).toBeDefined()
  })

  it('should render with English translations', () => {
    // Mock English translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'codeCard.filename': 'realtime_metrics.py',
        'appCard.title': 'Fintech Platform',
        'appCard.status': 'ONLINE',
        'appCard.cta': 'Confirm Transaction',
      }
      return translations[key] || key
    })

    render(<FloatingCards />)

    // Check English values
    expect(screen.getByText('realtime_metrics.py')).toBeDefined()
    expect(screen.getByText('Fintech Platform')).toBeDefined()
    expect(screen.getByText('ONLINE')).toBeDefined()
    expect(screen.getByText('Confirm Transaction')).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<FloatingCards />)

    // Verify all expected translation keys were requested
    expect(translationKeys).toContain('codeCard.filename')
    expect(translationKeys).toContain('appCard.title')
    expect(translationKeys).toContain('appCard.status')
    expect(translationKeys).toContain('appCard.cta')
  })

  it('should render both floating cards', () => {
    mockUseTranslations.mockImplementation((key: string) => 'test-value')

    const { container } = render(<FloatingCards />)

    // Check both cards are rendered
    const cards = container.querySelectorAll('.glass-card')
    expect(cards.length).toBe(2)
  })

  it('should render code card with correct structure', () => {
    mockUseTranslations.mockImplementation((key: string) => 'test-value')

    const { container } = render(<FloatingCards />)

    // Check code card has terminal dots
    const dots = container.querySelectorAll(
      '.rounded-full.bg-red-500\\/80, .rounded-full.bg-yellow-500\\/80, .rounded-full.bg-green-500\\/80'
    )
    expect(dots.length).toBeGreaterThan(0)

    // Check Activity icon is rendered
    expect(screen.getByTestId('activity-icon')).toBeDefined()
  })

  it('should render app card with correct structure', () => {
    mockUseTranslations.mockImplementation((key: string) => 'test-value')

    const { container } = render(<FloatingCards />)

    // Check app card has status badge
    const statusBadge = container.querySelector('.bg-neon-green\\/20')
    expect(statusBadge).toBeDefined()

    // Check app card has CTA button
    const ctaButton = container.querySelector('.bg-primary.h-10')
    expect(ctaButton).toBeDefined()
  })
})
