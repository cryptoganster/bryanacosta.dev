export interface Project {
  id: number
  title: string
  description: string
  tags?: string[]
  type: 'featured' | 'small' | 'icon' | 'wide'
  image?: string
  category?: string
  stat?: string
}

export interface ProjectTag {
  label: string
  color?: string
}
