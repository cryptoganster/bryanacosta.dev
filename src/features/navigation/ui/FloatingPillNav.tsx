'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { cn } from '@/shared/lib/cn'

interface NavItem {
  label: string
  href: string
}

interface FloatingPillNavProps {
  items: NavItem[]
  className?: string
}

export function FloatingPillNav({ items, className }: FloatingPillNavProps) {
  const [activeHref, setActiveHref] = useState('#')

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveHref(href)
      }
    } else {
      setActiveHref(href)
    }
  }

  return (
    <nav className={cn('inline-flex items-center gap-2', className)}>
      {items.map((item) => {
        const isActive = activeHref === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={cn(
              'group relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300',
              'hover:scale-105 active:scale-95',
              isActive
                ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                : 'text-muted-foreground hover:text-white hover:bg-white/5 hover:border hover:border-white/10'
            )}
          >
            <span className="relative z-10">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
