import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

export function useNavigation() {
  const t = useTranslations('header')
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const items = [
    { label: 'Workflow', href: '#workflow' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.projects'), href: '#projects' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#workflow', '#services', '#projects']
      const scrollPosition = window.scrollY + 150 // Offset for header
      let foundSection = false

      for (const sectionId of sections) {
        const element = document.querySelector(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId)
            foundSection = true
            break
          }
        }
      }

      // If not in any menu section, set to null (no selection)
      if (!foundSection) {
        setActiveSection(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    items,
    activeSection,
    isScrolled: false,
    mobileMenuOpen: false,
  }
}
