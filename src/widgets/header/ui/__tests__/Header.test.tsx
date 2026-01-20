import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

// Mock next-intl
const mockUseTranslations = vi.fn()

vi.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations,
}))

// Mock @/i18n/routing
vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    replace: vi.fn(),
    push: vi.fn(),
  }),
  usePathname: () => '/',
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

// Mock LanguageSwitcher
vi.mock('@/shared/ui/language-switcher', () => ({
  LanguageSwitcher: () => (
    <div data-testid="language-switcher">Language Switcher</div>
  ),
}))

// Mock NavLink
vi.mock('@/features/navigation/ui/NavLink', () => ({
  NavLink: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

// Mock Button
vi.mock('@/shared/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Terminal: () => <div data-testid="terminal-icon">Terminal</div>,
  Menu: () => <div data-testid="menu-icon">Menu</div>,
}))

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with Spanish translations', () => {
    // Mock Spanish translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        brand: 'DevPortfolio',
        'nav.services': 'Servicios',
        'nav.projects': 'Proyectos',
        'nav.stack': 'Stack',
        'nav.journey': 'Trayectoria',
      }
      return translations[key] || key
    })

    render(<Header />)

    // Check brand name
    expect(screen.getByText('DevPortfolio')).toBeDefined()

    // Check navigation links
    expect(screen.getByText('Servicios')).toBeDefined()
    expect(screen.getByText('Proyectos')).toBeDefined()
    expect(screen.getByText('Stack')).toBeDefined()
    expect(screen.getByText('Trayectoria')).toBeDefined()
  })

  it('should render with English translations', () => {
    // Mock English translations
    mockUseTranslations.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        brand: 'DevPortfolio',
        'nav.services': 'Services',
        'nav.projects': 'Projects',
        'nav.stack': 'Stack',
        'nav.journey': 'Journey',
      }
      return translations[key] || key
    })

    render(<Header />)

    // Check brand name
    expect(screen.getByText('DevPortfolio')).toBeDefined()

    // Check navigation links
    expect(screen.getByText('Services')).toBeDefined()
    expect(screen.getByText('Projects')).toBeDefined()
    expect(screen.getByText('Stack')).toBeDefined()
    expect(screen.getByText('Journey')).toBeDefined()
  })

  it('should use translation keys for all text content', () => {
    const translationKeys: string[] = []

    // Track which translation keys are requested
    mockUseTranslations.mockImplementation((key: string) => {
      translationKeys.push(key)
      return key // Return the key itself for verification
    })

    render(<Header />)

    // Verify all expected translation keys were requested
    expect(translationKeys).toContain('brand')
    expect(translationKeys).toContain('nav.services')
    expect(translationKeys).toContain('nav.projects')
    expect(translationKeys).toContain('nav.stack')
    expect(translationKeys).toContain('nav.journey')

    // Verify no hardcoded Spanish or English text
    expect(screen.queryByText('Servicios')).toBeNull()
    expect(screen.queryByText('Services')).toBeNull()
  })

  it('should integrate LanguageSwitcher component', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    render(<Header />)

    // Check that LanguageSwitcher is rendered
    expect(screen.getByTestId('language-switcher')).toBeDefined()
  })

  it('should render all structural elements', () => {
    mockUseTranslations.mockImplementation((key: string) => key)

    const { container } = render(<Header />)

    // Check header element
    const header = container.querySelector('header')
    expect(header).toBeDefined()

    // Check navigation
    const nav = container.querySelector('nav')
    expect(nav).toBeDefined()

    // Check icons are rendered
    expect(screen.getByTestId('terminal-icon')).toBeDefined()
    expect(screen.getByTestId('menu-icon')).toBeDefined()
  })
})
