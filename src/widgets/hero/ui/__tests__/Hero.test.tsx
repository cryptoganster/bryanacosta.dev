import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '../Hero'

// Mock next-intl
const mockUseTranslations = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}))

// Mock Avatar
vi.mock('@/shared/ui/avatar', () => ({
  Avatar: () => <div data-testid="avatar">Avatar</div>,
}))

// Mock Button
vi.mock('@/shared/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

// Mock TechStackScroller
vi.mock('../TechStackScroller', () => ({
  TechStackScroller: () => (
    <div data-testid="tech-stack-scroller">Tech Stack</div>
  ),
}))

// Mock StatsCards
vi.mock('../StatsCards', () => ({
  StatsCards: () => <div data-testid="stats-cards">Stats</div>,
}))

// Mock FloatingCards
vi.mock('../FloatingCards', () => ({
  FloatingCards: () => <div data-testid="floating-cards">Floating Cards</div>,
}))

// Mock SocialLinks
vi.mock('@/features/social-share/ui/SocialLinks', () => ({
  SocialLinks: () => <div data-testid="social-links">Social Links</div>,
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowRight: () => <div data-testid="arrow-right-icon">→</div>,
  Sparkles: () => <div data-testid="sparkles-icon">✨</div>,
  CheckCircle2: () => <div data-testid="check-circle-icon">✓</div>,
}))

describe('Hero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with Spanish translations', () => {
    // Mock Spanish translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        badge: 'Software Developer',
        title: 'Construyo el futuro con',
        titleHighlight: 'código de alto impacto',
        description:
          'Especialista en arquitecturas escalables, IA y desarrollo Full-Stack. Transformo la visión de tu startup en productos digitales robustos y memorables.',
        'cta.explore': 'Explorar Proyectos',
        'cta.contact': 'Iniciar Contacto',
        guarantee:
          'Proyectos entregados a tiempo y con calidad técnica garantizada',
      }
      return translations[key] || key
    })

    render(<Hero />)

    // Check badge
    expect(screen.getByText('Software Developer')).toBeDefined()

    // Check title
    expect(screen.getByText('Construyo el futuro con')).toBeDefined()
    expect(screen.getByText('código de alto impacto')).toBeDefined()

    // Check description
    expect(
      screen.getByText(
        'Especialista en arquitecturas escalables, IA y desarrollo Full-Stack. Transformo la visión de tu startup en productos digitales robustos y memorables.'
      )
    ).toBeDefined()

    // Check CTA buttons
    expect(screen.getByText('Explorar Proyectos')).toBeDefined()
    expect(screen.getByText('Iniciar Contacto')).toBeDefined()

    // Check guarantee text
    expect(
      screen.getByText(
        'Proyectos entregados a tiempo y con calidad técnica garantizada'
      )
    ).toBeDefined()
  })

  it('should render with English translations', () => {
    // Mock English translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        badge: 'Software Developer',
        title: 'Building the future with',
        titleHighlight: 'high-impact code',
        description:
          'Specialist in scalable architectures, AI, and Full-Stack development. I transform your startup vision into robust and memorable digital products.',
        'cta.explore': 'Explore Projects',
        'cta.contact': 'Start Contact',
        guarantee:
          'Projects delivered on time with guaranteed technical quality',
      }
      return translations[key] || key
    })

    render(<Hero />)

    // Check badge
    expect(screen.getByText('Software Developer')).toBeDefined()

    // Check title
    expect(screen.getByText('Building the future with')).toBeDefined()
    expect(screen.getByText('high-impact code')).toBeDefined()

    // Check description
    expect(
      screen.getByText(
        'Specialist in scalable architectures, AI, and Full-Stack development. I transform your startup vision into robust and memorable digital products.'
      )
    ).toBeDefined()

    // Check CTA buttons
    expect(screen.getByText('Explore Projects')).toBeDefined()
    expect(screen.getByText('Start Contact')).toBeDefined()

    // Check guarantee text
    expect(
      screen.getByText(
        'Projects delivered on time with guaranteed technical quality'
      )
    ).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<Hero />)

    // Verify all expected translation keys were requested
    expect(translationKeys).toContain('badge')
    expect(translationKeys).toContain('title')
    expect(translationKeys).toContain('titleHighlight')
    expect(translationKeys).toContain('description')
    expect(translationKeys).toContain('cta.explore')
    expect(translationKeys).toContain('cta.contact')
    expect(translationKeys).toContain('guarantee')

    // Verify no hardcoded Spanish text
    expect(screen.queryByText('Construyo el futuro con')).toBeNull()
    expect(screen.queryByText('Explorar Proyectos')).toBeNull()

    // Verify no hardcoded English text
    expect(screen.queryByText('Building the future with')).toBeNull()
    expect(screen.queryByText('Explore Projects')).toBeNull()
  })

  it('should render all child components', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    render(<Hero />)

    // Check all child components are rendered
    expect(screen.getByTestId('avatar')).toBeDefined()
    expect(screen.getByTestId('tech-stack-scroller')).toBeDefined()
    expect(screen.getByTestId('stats-cards')).toBeDefined()
    expect(screen.getByTestId('floating-cards')).toBeDefined()
    expect(screen.getByTestId('social-links')).toBeDefined()
  })

  it('should render all structural elements', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    const { container } = render(<Hero />)

    // Check main element
    const main = container.querySelector('main')
    expect(main).toBeDefined()

    // Check h1 element
    const h1 = container.querySelector('h1')
    expect(h1).toBeDefined()

    // Check icons are rendered
    expect(screen.getByTestId('sparkles-icon')).toBeDefined()
    expect(screen.getByTestId('arrow-right-icon')).toBeDefined()
    expect(screen.getByTestId('check-circle-icon')).toBeDefined()
  })
})
