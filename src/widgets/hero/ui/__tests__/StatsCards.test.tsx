import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsCards } from '../StatsCards'

// Mock next-intl
const mockUseTranslations = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  CheckCircle: () => <div data-testid="check-circle-icon">✓</div>,
  Award: () => <div data-testid="award-icon">🏆</div>,
  Rocket: () => <div data-testid="rocket-icon">🚀</div>,
}))

describe('StatsCards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with Spanish translations', () => {
    // Mock Spanish translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'achievements.value': '+40',
        'achievements.label': 'Éxitos logrados',
        'experience.value': '6+',
        'experience.label': 'Años experiencia',
        'mvps.value': '25',
        'mvps.label': 'MVPs Lanzados',
      }
      return translations[key] || key
    })

    render(<StatsCards />)

    // Check Spanish values
    expect(screen.getByText('+40')).toBeDefined()
    expect(screen.getByText('Éxitos logrados')).toBeDefined()
    expect(screen.getByText('6+')).toBeDefined()
    expect(screen.getByText('Años experiencia')).toBeDefined()
    expect(screen.getByText('25')).toBeDefined()
    expect(screen.getByText('MVPs Lanzados')).toBeDefined()
  })

  it('should render with English translations', () => {
    // Mock English translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'achievements.value': '+40',
        'achievements.label': 'Achievements',
        'experience.value': '6+',
        'experience.label': 'Years Experience',
        'mvps.value': '25',
        'mvps.label': 'MVPs Launched',
      }
      return translations[key] || key
    })

    render(<StatsCards />)

    // Check English values
    expect(screen.getByText('+40')).toBeDefined()
    expect(screen.getByText('Achievements')).toBeDefined()
    expect(screen.getByText('6+')).toBeDefined()
    expect(screen.getByText('Years Experience')).toBeDefined()
    expect(screen.getByText('25')).toBeDefined()
    expect(screen.getByText('MVPs Launched')).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<StatsCards />)

    // Verify all expected translation keys were requested
    expect(translationKeys).toContain('achievements.value')
    expect(translationKeys).toContain('achievements.label')
    expect(translationKeys).toContain('experience.value')
    expect(translationKeys).toContain('experience.label')
    expect(translationKeys).toContain('mvps.value')
    expect(translationKeys).toContain('mvps.label')

    // Verify no hardcoded Spanish text
    expect(screen.queryByText('Éxitos logrados')).toBeNull()
    expect(screen.queryByText('Años experiencia')).toBeNull()
    expect(screen.queryByText('MVPs Lanzados')).toBeNull()

    // Verify no hardcoded English text
    expect(screen.queryByText('Achievements')).toBeNull()
    expect(screen.queryByText('Years Experience')).toBeNull()
    expect(screen.queryByText('MVPs Launched')).toBeNull()
  })

  it('should render all three stat cards', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    render(<StatsCards />)

    // Check all icons are rendered
    expect(screen.getByTestId('check-circle-icon')).toBeDefined()
    expect(screen.getByTestId('award-icon')).toBeDefined()
    expect(screen.getByTestId('rocket-icon')).toBeDefined()
  })

  it('should render stat cards with correct structure', () => {
    mockUseTranslations.mockImplementation((key: string) => 'test-value')

    const { container } = render(<StatsCards />)

    // Check grid container exists
    const grid = container.querySelector('.grid')
    expect(grid).toBeDefined()

    // Check all three cards are rendered
    const cards = container.querySelectorAll('.glass-card')
    expect(cards.length).toBe(3)
  })
})
