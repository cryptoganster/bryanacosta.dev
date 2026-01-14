import { useTranslations } from 'next-intl'
import { Card } from '@/shared/ui/card'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const t = useTranslations()

  return (
    <Card className="glass-card rounded-3xl p-8">
      <h3 className="text-3xl font-bold font-display mb-3">
        {t(project.titleKey as any)}
      </h3>
      <p className="text-muted-foreground mt-2">
        {t(project.descriptionKey as any)}
      </p>
    </Card>
  )
}
