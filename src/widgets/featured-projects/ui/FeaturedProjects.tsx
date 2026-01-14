'use client'

import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ArrowUpRight,
  Activity,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card } from '@/shared/ui/card'
import { projects } from '@/entities/project/lib'

function TechTag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-gray-300 uppercase tracking-wider">
      {label}
    </span>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const t = useTranslations()

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden relative hover:bg-surface/60 hover:border-primary/30 transition-all duration-300">
      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
        <h3 className="text-3xl font-bold font-display mb-3 group-hover:text-neon-blue transition-colors">
          {t(project.titleKey as any)}
        </h3>
        <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
          {t(project.descriptionKey as any)}
        </p>
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
            {t('projects.cta.viewCase' as any)}
            <ExternalLink className="size-4" />
          </button>
        </div>
      </div>
      {project.image && (
        <div
          className="mt-8 md:mt-0 md:absolute md:right-[-50px] md:bottom-[-20px] md:w-[60%]"
          style={{ perspective: '1000px' }}
        >
          <img
            alt={t(project.titleKey as any)}
            src={project.image}
            className="w-full rounded-2xl shadow-2xl border border-white/10 transform rotate-x-[5deg] rotate-y-[-5deg] group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}
    </div>
  )
}

function SmallProjectCard({ project }: { project: (typeof projects)[1] }) {
  const t = useTranslations()

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col overflow-hidden hover:bg-surface/60 hover:border-primary/30 transition-all duration-300">
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags?.map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
      <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-neon-purple transition-colors">
        {t(project.titleKey as any)}
      </h3>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        {t(project.descriptionKey as any)}
      </p>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          {project.categoryKey ? t(project.categoryKey as any) : ''}
        </span>
        <ArrowUpRight className="size-5 text-gray-500 group-hover:text-neon-purple transition-colors" />
      </div>
    </div>
  )
}

function IconProjectCard({ project }: { project: (typeof projects)[2] }) {
  const t = useTranslations()

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col overflow-hidden bg-gradient-to-br from-surface to-surface hover:bg-surface/60 hover:border-primary/30 transition-all duration-300">
      <div className="size-14 rounded-2xl bg-neon-green/10 flex items-center justify-center text-neon-green mb-6 border border-neon-green/20">
        <Activity className="size-7" />
      </div>
      <h3 className="text-2xl font-bold font-display mb-3">
        {t(project.titleKey as any)}
      </h3>
      <p className="text-gray-400 text-sm mb-8 leading-relaxed">
        {t(project.descriptionKey as any)}
      </p>
      <div className="mt-auto">
        <span className="text-[10px] font-bold text-neon-green uppercase">
          {project.statKey ? t(project.statKey as any) : ''}
        </span>
      </div>
    </div>
  )
}

function WideProjectCard({ project }: { project: (typeof projects)[3] }) {
  const t = useTranslations()

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col md:flex-row gap-8 overflow-hidden relative hover:bg-surface/60 hover:border-primary/30 transition-all duration-300">
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags?.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
        <h3 className="text-3xl font-bold font-display group-hover:text-neon-blue transition-colors">
          {t(project.titleKey as any)}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
          {t(project.descriptionKey as any)}
        </p>
        <div className="pt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="border border-white/20 hover:border-white/40 bg-white/5 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all">
            {t('projects.cta.viewDetails' as any)}
          </button>
        </div>
      </div>
      <div
        className="flex-1 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div className="relative w-full aspect-video bg-surface rounded-xl border border-white/10 overflow-hidden shadow-2xl transform rotate-x-[5deg] rotate-y-[-5deg] group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
          <div className="p-4 space-y-2">
            <div className="w-1/2 h-2 bg-white/20 rounded-full" />
            <div className="w-1/3 h-2 bg-white/10 rounded-full" />
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
              <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
              <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const t = useTranslations('projects')

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-[10px] font-bold text-neon-blue uppercase tracking-widest">
              <span className="size-1.5 rounded-full bg-neon-blue animate-pulse" />
              {t('badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-balance">
              {t('title')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                {t('titleHighlight')}
              </span>
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 group">
            <ProjectCard project={projects[0]} />
          </div>

          <div className="md:col-span-4 group">
            <SmallProjectCard project={projects[1]} />
          </div>

          <div className="md:col-span-4 group">
            <IconProjectCard project={projects[2]} />
          </div>

          <div className="md:col-span-8 group">
            <WideProjectCard project={projects[3]} />
          </div>
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
  )
}
