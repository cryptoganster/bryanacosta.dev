export interface Project {
  id: number
  titleKey: string
  descriptionKey: string
  tags?: string[]
  techStackKeys?: string[] // Keys que coinciden con altKey en techStack
  type: 'featured' | 'small' | 'icon' | 'wide'
  image?: string
  categoryKey?: string
  statKey?: string
  caseStudyKey?: string // Key para el caso de estudio
}

export interface ProjectTag {
  label: string
  color?: string
}
