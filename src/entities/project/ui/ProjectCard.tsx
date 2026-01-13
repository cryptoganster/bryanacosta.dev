import { Card } from '@/shared/ui/card'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="glass-card rounded-3xl p-8">
      <h3 className="text-3xl font-bold font-display mb-3">{project.title}</h3>
      <p className="text-muted-foreground mt-2">{project.description}</p>
    </Card>
  )
}
