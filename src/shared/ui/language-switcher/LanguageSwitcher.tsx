'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, localeFlags } from '@/i18n/config'
import type { Locale } from '@/i18n/config'
import { ChevronDown } from 'lucide-react'

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'inline'
}

export function LanguageSwitcher({
  variant = 'dropdown',
}: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLocaleChange = (newLocale: Locale) => {
    // Save menu state before navigation for mobile
    if (variant === 'inline') {
      sessionStorage.setItem('mobileMenuOpen', 'true')
    }

    setIsOpen(false)

    // Use startTransition for smoother change
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const currentLocale = locale as Locale

  // Inline variant for mobile menu - expands horizontally
  if (variant === 'inline') {
    return (
      <div className="relative w-full touch-manipulation" ref={dropdownRef}>
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 active:scale-95"
            aria-label="Change language"
            aria-expanded={isOpen}
          >
            <span className="text-base">{localeFlags[currentLocale]}</span>
            <span>{localeNames[currentLocale]}</span>
            <ChevronDown className="size-4 transition-transform duration-200" />
          </button>
        ) : (
          <div className="flex items-center gap-2 w-full">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 active:scale-95 ${
                  locale === loc
                    ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                aria-label={`Switch to ${localeNames[loc]}`}
                aria-current={locale === loc ? 'true' : 'false'}
              >
                <span className="text-base">{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Dropdown variant for desktop
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:scale-105 active:scale-95 hover:bg-white/15"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-base">{localeFlags[currentLocale]}</span>
        <span>{localeNames[currentLocale]}</span>
        <ChevronDown
          className={`size-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-[200] min-w-[160px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                locale === loc
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              aria-label={`Switch to ${localeNames[loc]}`}
              aria-current={locale === loc ? 'true' : 'false'}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
