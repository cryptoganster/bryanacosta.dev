import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    titleKey: 'projects.items.defi.title',
    descriptionKey: 'projects.items.defi.description',
    tags: ['Next.js', 'Solidity', 'Tailwind'],
    type: 'featured',
    image: '/defi-dashboard-crypto-finance-dark-ui.jpg',
  },
  {
    id: 2,
    titleKey: 'projects.items.neural.title',
    descriptionKey: 'projects.items.neural.description',
    tags: ['Python', 'PyTorch'],
    categoryKey: 'projects.items.neural.category',
    type: 'small',
  },
  {
    id: 3,
    titleKey: 'projects.items.saas.title',
    descriptionKey: 'projects.items.saas.description',
    type: 'icon',
    statKey: 'projects.items.saas.stat',
  },
  {
    id: 4,
    titleKey: 'projects.items.fintech.title',
    descriptionKey: 'projects.items.fintech.description',
    tags: ['TypeScript', 'PostgreSQL'],
    type: 'wide',
  },
]
