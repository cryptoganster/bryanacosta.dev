import { useTranslations } from 'next-intl'
import { cn } from '@/shared/lib'
import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services.cards')

  const cardClasses = cn(
    'card-hover-effect group relative flex flex-col rounded bg-card border',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1 hover:border-primary hover:shadow-glow',
    service.variant === 'ai' && 'ai-card',
    service.colSpan === 2 && 'lg:col-span-2',
    service.colSpan === 1 && 'lg:col-span-1',
    service.rowSpan === 2 && 'lg:row-span-2',
    service.rowSpan === 1 && 'lg:row-span-1',
    service.size === 'large' && 'min-h-[380px] justify-between p-8',
    service.size === 'medium' && 'min-h-[320px] justify-between p-6',
    service.size === 'small' && 'min-h-[180px] justify-center p-6'
  )

  return (
    <div
      className={cardClasses}
      role="article"
      aria-label={t(`${service.id}.title`)}
    >
      {/* Background image for large cards */}
      {service.backgroundImage && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url(${service.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header with icon and badges */}
        <div className="flex justify-between items-start mb-4">
          <span
            className="material-symbols-outlined text-3xl text-muted-foreground group-hover:text-primary transition-colors icon-glow"
            aria-label={`${t(`${service.id}.title`)} icon`}
          >
            {service.icon}
          </span>
          {service.badges && service.badges.length > 0 && (
            <div className="flex gap-2">
              {service.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/5 rounded-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {t(`${service.id}.title`)}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(`${service.id}.description`)}
          </p>
        </div>

        {/* Footer features */}
        {service.features && service.features.length > 0 && (
          <div className="mt-6 border-t border-border pt-4 space-y-2">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-green-500 text-sm"
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer platforms */}
        {service.platforms && service.platforms.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {service.platforms.map((platform) => (
              <span
                key={platform}
                className="bg-muted text-muted-foreground text-[10px] px-2 py-1 rounded-sm uppercase"
              >
                {platform}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
