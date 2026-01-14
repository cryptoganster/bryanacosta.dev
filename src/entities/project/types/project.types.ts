export interface Project {
  id: number
  titleKey: string
  descriptionKey: string
  tags?: string[]
  type: 'featured' | 'small' | 'icon' | 'wide'
  image?: string
  categoryKey?: string
  statKey?: string
}

export interface ProjectTag {
  label: string
  color?: string
}
