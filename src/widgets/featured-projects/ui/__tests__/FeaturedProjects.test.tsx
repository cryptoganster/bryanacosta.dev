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
      id: 1,
      titleKey: 'projects.items.defi.title',
      descriptionKey: 'projects.items.defi.description',
      techStackKeys: ['react', 'typescript'],
      image: '/placeholder.jpg',
    },
    {
      id: 2,
      titleKey: 'projects.items.neural.title',
      descriptionKey: 'projects.items.neural.description',
      techStackKeys: ['nodejs', 'python'],
      categoryKey: 'projects.items.neural.category',
    },
    {
      id: 3,
      titleKey: 'projects.items.saas.title',
      descriptionKey: 'projects.items.saas.description',
      techStackKeys: ['typescript'],
      statKey: 'projects.items.saas.stat',
    },
    {
      id: 4,
      titleKey: 'projects.items.fintech.title',
      descriptionKey: 'projects.items.fintech.description',
      techStackKeys: ['java', 'postgres'],
    },
  ],
  getTechStackIcons: () => [],
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
        'projects.items.defi.title': 'DeFi Protocol Dashboard',
        'projects.items.defi.description':
          'Plataforma institucional para el monitoreo de activos digitales',
        'projects.items.neural.title': 'Neural Engine API',
        'projects.items.neural.description':
          'Infraestructura de microservicios para el procesamiento',
        'projects.items.neural.category': 'Arquitectura Backend',
        'projects.items.saas.title': 'SaaS Analytics SDK',
        'projects.items.saas.description':
          'Kit de desarrollo para integración de métricas',
        'projects.items.saas.stat': 'Rendimiento +98%',
        'projects.items.fintech.title': 'Fintech Core System',
        'projects.items.fintech.description':
          'Rediseño integral de la arquitectura de transacciones',
        'projects.cta.viewCase': 'Ver Caso de Estudio',
        'projects.cta.viewDetails': 'Detalles Técnicos',
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

    // Check CTA
    expect(screen.getByText('Ver todos los proyectos')).toBeDefined()

    // Check call to action
    expect(
      screen.getByText('¿Tienes un proyecto ambicioso en mente?')
    ).toBeDefined()

    // Check hover text
    expect(screen.getAllByText('View Project').length).toBeGreaterThan(0)

    // Check project titles are translated
    expect(screen.getByText('DeFi Protocol Dashboard')).toBeDefined()
    expect(screen.getByText('Neural Engine API')).toBeDefined()
    expect(screen.getByText('SaaS Analytics SDK')).toBeDefined()
    expect(screen.getByText('Fintech Core System')).toBeDefined()
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
        'projects.items.defi.title': 'DeFi Protocol Dashboard',
        'projects.items.defi.description':
          'Institutional platform for real-time monitoring',
        'projects.items.neural.title': 'Neural Engine API',
        'projects.items.neural.description':
          'Microservices infrastructure for natural language processing',
        'projects.items.neural.category': 'Backend Architecture',
        'projects.items.saas.title': 'SaaS Analytics SDK',
        'projects.items.saas.description':
          'Development kit for integrating advanced metrics',
        'projects.items.saas.stat': 'Performance +98%',
        'projects.items.fintech.title': 'Fintech Core System',
        'projects.items.fintech.description':
          'Complete redesign of transaction architecture',
        'projects.cta.viewCase': 'View Case Study',
        'projects.cta.viewDetails': 'Technical Details',
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

    // Check CTA
    expect(screen.getByText('View all projects')).toBeDefined()

    // Check call to action
    expect(screen.getByText('Have an ambitious project in mind?')).toBeDefined()

    // Check hover text
    expect(screen.getAllByText('View Project').length).toBeGreaterThan(0)

    // Check project titles are translated
    expect(screen.getByText('DeFi Protocol Dashboard')).toBeDefined()
    expect(screen.getByText('Neural Engine API')).toBeDefined()
    expect(screen.getByText('SaaS Analytics SDK')).toBeDefined()
    expect(screen.getByText('Fintech Core System')).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<FeaturedProjects />)

    // Verify all expected translation keys were requested (without 'projects.' prefix for namespaced calls)
    expect(translationKeys).toContain('badge')
    expect(translationKeys).toContain('title')
    expect(translationKeys).toContain('titleHighlight')
    expect(translationKeys).toContain('description')
    expect(translationKeys).toContain('cta.viewAll')
    expect(translationKeys).toContain('callToAction')

    // Verify project translation keys are used (with full path for non-namespaced calls)
    expect(translationKeys).toContain('projects.items.defi.title')
    expect(translationKeys).toContain('projects.items.neural.title')
    expect(translationKeys).toContain('projects.items.saas.title')
    expect(translationKeys).toContain('projects.items.fintech.title')

    // Verify no hardcoded Spanish or English text
    expect(screen.queryByText('Proyectos Destacados')).toBeNull()
    expect(screen.queryByText('Featured Projects')).toBeNull()
  })

  it('should render all project cards', () => {
    mockUseTranslations.mockImplementation((key: string) => {
      // Return mock translations for project keys
      const translations: Record<string, string> = {
        'projects.items.defi.title': 'DeFi Protocol Dashboard',
        'projects.items.defi.description': 'Institutional platform description',
        'projects.items.neural.title': 'Neural Engine API',
        'projects.items.neural.description':
          'Microservices infrastructure description',
        'projects.items.neural.category': 'Backend Architecture',
        'projects.items.saas.title': 'SaaS Analytics SDK',
        'projects.items.saas.description': 'Development kit description',
        'projects.items.saas.stat': 'Performance +98%',
        'projects.items.fintech.title': 'Fintech Core System',
        'projects.items.fintech.description': 'Complete redesign description',
      }
      return translations[key] || key
    })

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
