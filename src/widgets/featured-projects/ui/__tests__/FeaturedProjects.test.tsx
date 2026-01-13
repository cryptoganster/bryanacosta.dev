import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedProjects } from '../FeaturedProjects'

// Mock next-intl
const mockUseTranslations = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}))

// Mock Card component
vi.mock('@/shared/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}))

// Mock projects data
vi.mock('@/entities/project/lib', () => ({
  projects: [
    {
      title: 'DeFi Protocol Dashboard',
      description: 'Institutional platform description',
      tags: ['React', 'TypeScript'],
      image: '/placeholder.jpg',
    },
    {
      title: 'Neural Engine API',
      description: 'Microservices infrastructure description',
      tags: ['Node.js', 'Python'],
      category: 'Backend Architecture',
    },
    {
      title: 'SaaS Analytics SDK',
      description: 'Development kit description',
      tags: ['SDK', 'Analytics'],
      stat: 'Performance +98%',
    },
    {
      title: 'Fintech Core System',
      description: 'Complete redesign description',
      tags: ['Fintech', 'Architecture'],
    },
  ],
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon">ArrowLeft</div>,
  ArrowRight: () => <div data-testid="arrow-right-icon">ArrowRight</div>,
  ExternalLink: () => <div data-testid="external-link-icon">ExternalLink</div>,
  ArrowUpRight: () => <div data-testid="arrow-up-right-icon">ArrowUpRight</div>,
  Activity: () => <div data-testid="activity-icon">Activity</div>,
}))

describe('FeaturedProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with Spanish translations', () => {
    // Mock Spanish translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        badge: 'Portfolio',
        title: 'Proyectos',
        titleHighlight: 'Destacados',
        description:
          'Una selección de arquitecturas digitales diseñadas para el rendimiento, la escalabilidad y la experiencia de usuario excepcional.',
        'cta.viewCase': 'Ver Caso de Estudio',
        'cta.viewDetails': 'Detalles Técnicos',
        'cta.viewAll': 'Ver todos los proyectos',
        callToAction: '¿Tienes un proyecto ambicioso en mente?',
      }
      return translations[key] || key
    })

    render(<FeaturedProjects />)

    // Check badge
    expect(screen.getByText('Portfolio')).toBeDefined()

    // Check title
    expect(screen.getByText('Proyectos')).toBeDefined()
    expect(screen.getByText('Destacados')).toBeDefined()

    // Check description
    expect(
      screen.getByText(
        'Una selección de arquitecturas digitales diseñadas para el rendimiento, la escalabilidad y la experiencia de usuario excepcional.'
      )
    ).toBeDefined()

    // Check CTA buttons
    expect(screen.getByText('Ver Caso de Estudio')).toBeDefined()
    expect(screen.getByText('Detalles Técnicos')).toBeDefined()
    expect(screen.getByText('Ver todos los proyectos')).toBeDefined()

    // Check call to action
    expect(
      screen.getByText('¿Tienes un proyecto ambicioso en mente?')
    ).toBeDefined()
  })

  it('should render with English translations', () => {
    // Mock English translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        badge: 'Portfolio',
        title: 'Featured',
        titleHighlight: 'Projects',
        description:
          'A selection of digital architectures designed for performance, scalability, and exceptional user experience.',
        'cta.viewCase': 'View Case Study',
        'cta.viewDetails': 'Technical Details',
        'cta.viewAll': 'View all projects',
        callToAction: 'Have an ambitious project in mind?',
      }
      return translations[key] || key
    })

    render(<FeaturedProjects />)

    // Check badge
    expect(screen.getByText('Portfolio')).toBeDefined()

    // Check title
    expect(screen.getByText('Featured')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()

    // Check description
    expect(
      screen.getByText(
        'A selection of digital architectures designed for performance, scalability, and exceptional user experience.'
      )
    ).toBeDefined()

    // Check CTA buttons
    expect(screen.getByText('View Case Study')).toBeDefined()
    expect(screen.getByText('Technical Details')).toBeDefined()
    expect(screen.getByText('View all projects')).toBeDefined()

    // Check call to action
    expect(screen.getByText('Have an ambitious project in mind?')).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<FeaturedProjects />)

    // Verify all expected translation keys were requested
    expect(translationKeys).toContain('badge')
    expect(translationKeys).toContain('title')
    expect(translationKeys).toContain('titleHighlight')
    expect(translationKeys).toContain('description')
    expect(translationKeys).toContain('cta.viewCase')
    expect(translationKeys).toContain('cta.viewDetails')
    expect(translationKeys).toContain('cta.viewAll')
    expect(translationKeys).toContain('callToAction')

    // Verify no hardcoded Spanish or English text
    expect(screen.queryByText('Proyectos Destacados')).toBeNull()
    expect(screen.queryByText('Featured Projects')).toBeNull()
  })

  it('should render all project cards', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    const { container } = render(<FeaturedProjects />)

    // Check that project titles from mock data are rendered
    expect(screen.getByText('DeFi Protocol Dashboard')).toBeDefined()
    expect(screen.getByText('Neural Engine API')).toBeDefined()
    expect(screen.getByText('SaaS Analytics SDK')).toBeDefined()
    expect(screen.getByText('Fintech Core System')).toBeDefined()
  })

  it('should render navigation arrows', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    render(<FeaturedProjects />)

    // Check that arrow icons are rendered
    expect(screen.getAllByTestId('arrow-left-icon')).toBeDefined()
    expect(screen.getAllByTestId('arrow-right-icon')).toBeDefined()
  })
})
