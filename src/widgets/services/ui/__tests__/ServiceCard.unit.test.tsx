import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { ServiceCard } from '../ServiceCard'
import type { Service } from '../../types'
import enMessages from '@/i18n/locales/en.json'

const mockService: Service = {
  id: 'custom-software',
  icon: 'deployed_code',
  size: 'large',
  colSpan: 2,
  rowSpan: 2,
  badges: ['React', 'Node'],
}

const mockServiceWithFeatures: Service = {
  id: 'legacy-migration',
  icon: 'system_update_alt',
  size: 'medium',
  colSpan: 1,
  rowSpan: 2,
  features: ['Zero Downtime', 'Data Integrity'],
}

const mockServiceWithPlatforms: Service = {
  id: 'multi-platform',
  icon: 'devices',
  size: 'medium',
  colSpan: 1,
  rowSpan: 2,
  platforms: ['iOS', 'Android', 'Web'],
}

const mockAIService: Service = {
  id: 'ai-integration',
  icon: 'psychology',
  size: 'small',
  colSpan: 1,
  rowSpan: 1,
  variant: 'ai',
}

function renderWithIntl(component: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {component}
    </NextIntlClientProvider>
  )
}

describe('ServiceCard', () => {
  it('should render without crashing', () => {
    renderWithIntl(<ServiceCard service={mockService} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('should display icon, title, and description', () => {
    renderWithIntl(<ServiceCard service={mockService} />)

    // Icon
    expect(screen.getByText('deployed_code')).toBeInTheDocument()

    // Title
    expect(screen.getByText('Custom Software & MVPs')).toBeInTheDocument()

    // Description
    expect(
      screen.getByText(/Scalable architecture for high-growth startups/)
    ).toBeInTheDocument()
  })

  it('should render badges when present', () => {
    renderWithIntl(<ServiceCard service={mockService} />)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node')).toBeInTheDocument()
  })

  it('should render features when present', () => {
    renderWithIntl(<ServiceCard service={mockServiceWithFeatures} />)

    expect(screen.getByText('Zero Downtime')).toBeInTheDocument()
    expect(screen.getByText('Data Integrity')).toBeInTheDocument()
  })

  it('should render platforms when present', () => {
    renderWithIntl(<ServiceCard service={mockServiceWithPlatforms} />)

    expect(screen.getByText('iOS')).toBeInTheDocument()
    expect(screen.getByText('Android')).toBeInTheDocument()
    expect(screen.getByText('Web')).toBeInTheDocument()
  })

  it('should have ai-card class for AI variant', () => {
    renderWithIntl(<ServiceCard service={mockAIService} />)

    const card = screen.getByRole('article')
    expect(card.className).toContain('ai-card')
  })

  it('should apply correct grid span classes', () => {
    renderWithIntl(<ServiceCard service={mockService} />)

    const card = screen.getByRole('article')
    expect(card.className).toContain('lg:col-span-2')
    expect(card.className).toContain('lg:row-span-2')
  })

  it('should apply size-based styling', () => {
    renderWithIntl(<ServiceCard service={mockService} />)

    const card = screen.getByRole('article')
    expect(card.className).toContain('min-h-[380px]')
  })

  it('should have proper ARIA labels', () => {
    renderWithIntl(<ServiceCard service={mockService} />)

    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('aria-label', 'Custom Software & MVPs')
  })
})
