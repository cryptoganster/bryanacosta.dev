export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
}

export const socialLinks: SocialLink[] = [
  { id: 'email', name: 'Email', url: '#', icon: 'at-sign' },
  { id: 'github', name: 'GitHub', url: '#', icon: 'terminal' },
]
