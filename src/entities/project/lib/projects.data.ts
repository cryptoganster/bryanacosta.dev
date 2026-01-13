import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'DeFi Protocol Dashboard',
    description:
      'Plataforma institucional para el monitoreo de activos digitales y smart contracts en tiempo real con seguridad de grado bancario.',
    tags: ['Next.js', 'Solidity', 'Tailwind'],
    type: 'featured',
    image: '/defi-dashboard-crypto-finance-dark-ui.jpg',
  },
  {
    id: 2,
    title: 'Neural Engine API',
    description:
      'Infraestructura de microservicios para el procesamiento de lenguaje natural optimizado para baja latencia.',
    tags: ['Python', 'PyTorch'],
    category: 'Backend Architecture',
    type: 'small',
  },
  {
    id: 3,
    title: 'SaaS Analytics SDK',
    description:
      'Kit de desarrollo para integración de métricas avanzadas en aplicaciones empresariales de gran escala.',
    type: 'icon',
    stat: 'Performance +98%',
  },
  {
    id: 4,
    title: 'Fintech Core System',
    description:
      'Rediseño integral de la arquitectura de transacciones para una plataforma financiera líder, reduciendo tiempos de respuesta en un 40%.',
    tags: ['TypeScript', 'PostgreSQL'],
    type: 'wide',
  },
]
