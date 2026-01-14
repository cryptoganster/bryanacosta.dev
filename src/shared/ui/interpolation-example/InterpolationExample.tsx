'use client'

import { useTranslations } from 'next-intl'

interface InterpolationExampleProps {
  name?: string
  count?: number
  years?: number
  technology?: string
}

/**
 * Example component demonstrating next-intl interpolation support
 * This component shows how to pass dynamic values to translation strings
 */
export function InterpolationExample({
  name = 'Developer',
  count = 5,
  years = 6,
  technology = 'TypeScript',
}: InterpolationExampleProps) {
  const t = useTranslations('interpolation')

  return (
    <div className="space-y-2 p-4 bg-white/5 rounded-lg">
      <p className="text-sm text-muted-foreground">{t('welcome', { name })}</p>
      <p className="text-sm text-muted-foreground">
        {t('projectCount', { count })}
      </p>
      <p className="text-sm text-muted-foreground">
        {t('greeting', { name, count })}
      </p>
      <p className="text-sm text-muted-foreground">
        {t('experience', { years, technology })}
      </p>
    </div>
  )
}
