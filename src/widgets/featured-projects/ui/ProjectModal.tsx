'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect } from 'react'
import type { Project } from '@/entities/project/types'
import { getTechStackIcons } from '@/entities/project/lib'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const t = useTranslations()
  const techIcons = project.techStackKeys
    ? getTechStackIcons(project.techStackKeys)
    : []

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Close button - Outside modal, fixed position */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] size-12 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-white/40 flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <X className="size-6 text-white" />
      </button>

      {/* Modal */}
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-background-dark border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full aspect-[3/2]">
          <Image
            src={project.image || '/defi-dashboard-crypto-finance-dark-ui.png'}
            alt={t(project.titleKey as any)}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={95}
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Title and Tech Icons */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight">
              {t(project.titleKey as any)}
            </h2>
            <div className="flex flex-wrap gap-3">
              {techIcons.map((tech) => (
                <div
                  key={tech.altKey}
                  className="size-8 hover:scale-110 transition-transform"
                >
                  <Image
                    src={tech.logo}
                    alt={t(tech.altKey as any)}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    style={
                      tech.altKey === 'nextjs'
                        ? { filter: 'invert(1)' }
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            {t(project.descriptionKey as any)}
          </p>

          {/* Case Study */}
          {project.caseStudyKey && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-2xl">
                  description
                </span>
                <h3 className="text-xl font-bold font-display">
                  {t(`${project.caseStudyKey}.title` as any)}
                </h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed pl-8">
                {t(`${project.caseStudyKey}.problem` as any)}
              </p>
            </div>
          )}

          {/* Problem Section */}
          {project.caseStudyKey && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-2xl">
                  error
                </span>
                <h3 className="text-xl font-bold font-display">
                  {t(`${project.caseStudyKey}.problemSection.title` as any)}
                </h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed pl-8">
                {t(`${project.caseStudyKey}.problemSection.description` as any)}
              </p>
              <ul className="space-y-2 pl-8">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <li
                    key={index}
                    className="text-gray-400 text-base leading-relaxed list-disc ml-4"
                  >
                    {t(
                      `${project.caseStudyKey}.problemSection.items.${index}` as any
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Solution Section */}
          {project.caseStudyKey && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-2xl">
                  lightbulb
                </span>
                <h3 className="text-xl font-bold font-display">
                  {t(`${project.caseStudyKey}.solutionSection.title` as any)}
                </h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed pl-8">
                {t(
                  `${project.caseStudyKey}.solutionSection.description` as any
                )}
              </p>
              <ul className="space-y-2 pl-8">
                {[0, 1, 2, 3].map((index) => (
                  <li
                    key={index}
                    className="text-gray-400 text-base leading-relaxed list-disc ml-4"
                  >
                    {t(
                      `${project.caseStudyKey}.solutionSection.items.${index}` as any
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Capabilities Section */}
          {project.caseStudyKey && (
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-2xl">
                  stars
                </span>
                <h3 className="text-xl font-bold font-display">
                  {t(
                    `${project.caseStudyKey}.capabilitiesSection.title` as any
                  )}
                </h3>
              </div>
              <div className="space-y-3 pl-8">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-white text-xl mt-0.5 flex-shrink-0">
                      {t(
                        `${project.caseStudyKey}.capabilitiesSection.items.${index}.icon` as any
                      )}
                    </span>
                    <p className="text-gray-400 text-base leading-relaxed">
                      {t(
                        `${project.caseStudyKey}.capabilitiesSection.items.${index}.text` as any
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {project.statKey && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                {t(project.statKey as any)}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-lg text-gray-300 font-medium">
              {t('projects.cta.buildSomething' as any)}
            </p>
            <a
              href="#contact"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 hover:scale-105 whitespace-nowrap"
            >
              {t('projects.cta.letsTalk' as any)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
