import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { projects } from '../projects.data'

/**
 * Feature: i18n-implementation, Property 7: Dynamic content uses translation keys
 * Validates: Requirements 3.1, 6.4
 *
 * This property test verifies that all dynamic content (projects, skills, stats)
 * uses translation keys rather than hardcoded strings. Translation keys follow
 * a specific pattern and should not contain actual translated text.
 */

describe('Dynamic Content Translation Property Tests', () => {
  it('property: all project titles use translation keys', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // Translation keys should follow the pattern: namespace.subnamespace.key
        const translationKeyPattern = /^[a-z]+(\.[a-z]+)+$/i

        // Verify titleKey exists and follows pattern
        expect(project.titleKey).toBeDefined()
        expect(project.titleKey).toMatch(translationKeyPattern)

        // Translation keys should not contain spaces (indicating hardcoded text)
        expect(project.titleKey).not.toMatch(/\s/)

        // Translation keys should start with 'projects.items.'
        expect(project.titleKey).toMatch(/^projects\.items\./)

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: all project descriptions use translation keys', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const translationKeyPattern = /^[a-z]+(\.[a-z]+)+$/i

        // Verify descriptionKey exists and follows pattern
        expect(project.descriptionKey).toBeDefined()
        expect(project.descriptionKey).toMatch(translationKeyPattern)

        // Translation keys should not contain spaces
        expect(project.descriptionKey).not.toMatch(/\s/)

        // Translation keys should start with 'projects.items.'
        expect(project.descriptionKey).toMatch(/^projects\.items\./)

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: optional fields use translation keys when present', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const translationKeyPattern = /^[a-z]+(\.[a-z]+)+$/i

        // If categoryKey exists, it should follow the pattern
        if (project.categoryKey) {
          expect(project.categoryKey).toMatch(translationKeyPattern)
          expect(project.categoryKey).not.toMatch(/\s/)
          expect(project.categoryKey).toMatch(/^projects\.items\./)
        }

        // If statKey exists, it should follow the pattern
        if (project.statKey) {
          expect(project.statKey).toMatch(translationKeyPattern)
          expect(project.statKey).not.toMatch(/\s/)
          expect(project.statKey).toMatch(/^projects\.items\./)
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: translation keys are consistent with project structure', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // Extract the project identifier from titleKey
        // e.g., 'projects.items.defi.title' -> 'defi'
        const titleKeyParts = project.titleKey.split('.')
        expect(titleKeyParts.length).toBeGreaterThanOrEqual(4)
        expect(titleKeyParts[0]).toBe('projects')
        expect(titleKeyParts[1]).toBe('items')

        const projectIdentifier = titleKeyParts[2]

        // Description key should use the same identifier
        expect(project.descriptionKey).toContain(
          `projects.items.${projectIdentifier}.description`
        )

        // If categoryKey exists, it should use the same identifier
        if (project.categoryKey) {
          expect(project.categoryKey).toContain(
            `projects.items.${projectIdentifier}.category`
          )
        }

        // If statKey exists, it should use the same identifier
        if (project.statKey) {
          expect(project.statKey).toContain(
            `projects.items.${projectIdentifier}.stat`
          )
        }

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: no project contains hardcoded translated text', () => {
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        // Check that none of the key fields contain actual Spanish or English text
        const spanishWords = [
          'plataforma',
          'infraestructura',
          'kit',
          'rediseño',
        ]
        const englishWords = ['platform', 'infrastructure', 'kit', 'redesign']

        const allKeys = [
          project.titleKey,
          project.descriptionKey,
          project.categoryKey,
          project.statKey,
        ].filter(Boolean)

        allKeys.forEach((key) => {
          const lowerKey = key!.toLowerCase()
          spanishWords.forEach((word) => {
            expect(lowerKey).not.toContain(word)
          })
          englishWords.forEach((word) => {
            expect(lowerKey).not.toContain(word)
          })
        })

        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: all projects have unique identifiers in their translation keys', () => {
    const projectIdentifiers = projects.map((project) => {
      const parts = project.titleKey.split('.')
      return parts[2] // Extract identifier from 'projects.items.{identifier}.title'
    })

    // All identifiers should be unique
    const uniqueIdentifiers = new Set(projectIdentifiers)
    expect(uniqueIdentifiers.size).toBe(projects.length)

    // Verify each identifier is used consistently
    fc.assert(
      fc.property(fc.constantFrom(...projects), (project) => {
        const identifier = project.titleKey.split('.')[2]

        // All keys for this project should use the same identifier
        expect(project.descriptionKey).toContain(identifier)
        if (project.categoryKey) {
          expect(project.categoryKey).toContain(identifier)
        }
        if (project.statKey) {
          expect(project.statKey).toContain(identifier)
        }

        return true
      }),
      { numRuns: 100 }
    )
  })
})
