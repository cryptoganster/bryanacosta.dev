'use client'

import { CheckCircle, Award, Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function StatsCards() {
  const t = useTranslations('stats')

  const stats = [
    {
      icon: CheckCircle,
      value: t('achievements.value'),
      label: t('achievements.label'),
      color: 'neon-blue',
      bgClass: 'bg-neon-blue/10',
      textClass: 'text-neon-blue',
      hoverBorderClass: 'hover:border-neon-blue/30',
      gradientClass: 'from-neon-blue/5',
    },
    {
      icon: Award,
      value: t('experience.value'),
      label: t('experience.label'),
      color: 'primary',
      bgClass: 'bg-primary/10',
      textClass: 'text-primary',
      hoverBorderClass: 'hover:border-primary/30',
      gradientClass: 'from-primary/5',
    },
    {
      icon: Rocket,
      value: t('mvps.value'),
      label: t('mvps.label'),
      color: 'neon-purple',
      bgClass: 'bg-neon-purple/10',
      textClass: 'text-neon-purple',
      hoverBorderClass: 'hover:border-neon-purple/30',
      gradientClass: 'from-neon-purple/5',
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12 w-full max-w-5xl px-4 sm:px-0">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`glass-card p-4 sm:p-6 rounded-2xl flex items-center gap-4 sm:gap-5 ${stat.hoverBorderClass} transition-all group relative overflow-hidden`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.gradientClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
          />
          <div
            className={`size-12 sm:size-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${stat.bgClass} ${stat.textClass}`}
          >
            <stat.icon className="size-6 sm:size-7" />
          </div>
          <div className="text-left">
            <h4 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {stat.value}
            </h4>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
