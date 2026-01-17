'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { projects, getTechStackIcons } from '@/entities/project/lib'
import { ProjectModal } from './ProjectModal'

function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0]
  onClick: () => void
}) {
  const t = useTranslations()
  const tTech = useTranslations('techStack')
  const techIcons = project.techStackKeys
    ? getTechStackIcons(project.techStackKeys)
    : []

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      {/* Image Container */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-surface border border-white/10 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/30"
        style={
          {
            '--hover-shadow-color': '#4A2BFC',
          } as React.CSSProperties
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            '0 25px 50px -12px rgba(74, 43, 252, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = ''
        }}
      >
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={project.image || '/defi-dashboard-crypto-finance-dark-ui.png'}
            alt={t(project.titleKey as any)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3">
            <p className="text-white font-bold text-sm">View Project</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 space-y-2">
        <h3
          className="text-lg font-bold font-display tracking-tight transition-colors"
          style={{
            color: 'inherit',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#4A2BFC'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = ''
          }}
        >
          {t(project.titleKey as any)}
        </h3>
        <div className="flex flex-wrap gap-2">
          {techIcons.map((tech) => (
            <div
              key={tech.altKey}
              className="size-6 hover:scale-110 transition-transform"
            >
              <Image
                src={tech.logo}
                alt={tTech(tech.altKey as any)}
                width={24}
                height={24}
                className="w-full h-full object-contain"
                style={
                  tech.altKey === 'nextjs' ? { filter: 'invert(1)' } : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const t = useTranslations('projects')
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null)

  return (
    <>
      <section id="projects" className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{
                  borderWidth: '1px',
                  borderColor: '#4A2BFC',
                  backgroundColor: '#4A2BFC(74, 144, 226, 0.1)',
                  color: '#ffffffff',
                }}
              >
                <span
                  className="size-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#4A2BFC' }}
                />
                {t('badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-balance">
                {t('title')}{' '}
                <span className="text-white">{t('titleHighlight')}</span>
              </h2>
              <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                {t('description')}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ArrowLeft className="size-5 text-gray-400" />
              </button>
              <button className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ArrowRight className="size-5 text-white" />
              </button>
            </div>
          </div>

          {/* Grid de proyectos estilo Dribbble */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-6">
              {t('callToAction')}
            </p>
            <a href="#" className="inline-flex items-center gap-3 group">
              <span className="text-2xl md:text-3xl font-bold font-display border-b-2 border-primary/40 group-hover:border-primary transition-all">
                {t('cta.viewAll')}
              </span>
              <ArrowRight className="size-6 text-primary group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject || projects[0]}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
