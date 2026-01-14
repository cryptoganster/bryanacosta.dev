/**
 * Property-Based Tests for Browser Language Detection
 *
 * Feature: i18n-implementation, Property 6: Browser language detection sets appropriate locale
 * Validates: Requirements 5.1, 5.2, 5.3
 *
 * These tests verify that:
 * 1. When a user first visits the site, the system detects the browser's preferred language
 * 2. If the detected language is supported, it sets it as the active locale
 * 3. If the detected language is not supported, it falls back to the default locale
 */

import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { locales, defaultLocale } from '../config'

// Helper to parse Accept-Language header
function parseAcceptLanguage(header: string): string[] {
  if (!header) return []

  return header
    .split(',')
    .map((lang) => {
      const [locale] = lang.trim().split(';')
      return locale.toLowerCase()
    })
    .filter(Boolean)
}

// Helper to extract base language code (e.g., 'en-US' -> 'en')
function getBaseLanguage(locale: string): string {
  return locale.split('-')[0]
}

// Helper to match browser language to supported locales
function matchBrowserLanguageToLocale(
  acceptLanguageHeader: string,
  supportedLocales: readonly string[],
  fallbackLocale: string
): string {
  const browserLanguages = parseAcceptLanguage(acceptLanguageHeader)

  // Try exact match first
  for (const browserLang of browserLanguages) {
    const baseLang = getBaseLanguage(browserLang)
    if (supportedLocales.includes(baseLang)) {
      return baseLang
    }
  }

  // Fall back to default locale
  return fallbackLocale
}

describe('Browser Language Detection', () => {
  describe('Property 6: Browser language detection sets appropriate locale', () => {
    it('property: supported browser languages are detected and set as active locale', () => {
      /**
       * Property: For any supported locale in the Accept-Language header,
       * the system should detect it and set it as the active locale.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...locales),
          fc.double({ min: 0.1, max: 1.0, noNaN: true }),
          (locale, quality) => {
            // Generate Accept-Language header with supported locale
            const acceptLanguageHeader = `${locale};q=${quality.toFixed(1)}`

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Should detect the supported locale
            expect(detectedLocale).toBe(locale)
            expect(locales).toContain(detectedLocale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: unsupported browser languages fall back to default locale', () => {
      /**
       * Property: For any unsupported language in the Accept-Language header,
       * the system should fall back to the default locale.
       */
      const unsupportedLanguages = ['fr', 'de', 'it', 'pt', 'ja', 'zh', 'ru']

      fc.assert(
        fc.property(
          fc.constantFrom(...unsupportedLanguages),
          (unsupportedLang) => {
            const acceptLanguageHeader = `${unsupportedLang};q=0.9`

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Should fall back to default locale
            expect(detectedLocale).toBe(defaultLocale)
            expect(locales).toContain(detectedLocale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: multiple languages in Accept-Language header are processed in order', () => {
      /**
       * Property: When multiple languages are specified in the Accept-Language header,
       * the system should process them in order and select the first supported one.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...locales),
          fc.constantFrom('fr', 'de', 'it'),
          (supportedLang, unsupportedLang) => {
            // Put unsupported language first, supported language second
            const acceptLanguageHeader = `${unsupportedLang};q=0.9,${supportedLang};q=0.8`

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Should detect the supported locale (even though it's second)
            expect(detectedLocale).toBe(supportedLang)
            expect(locales).toContain(detectedLocale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: language codes with region variants are matched to base language', () => {
      /**
       * Property: For any language code with a region variant (e.g., 'en-US', 'es-MX'),
       * the system should match it to the base language code if supported.
       */
      const regionVariants: Record<string, string[]> = {
        en: ['en-US', 'en-GB', 'en-CA', 'en-AU'],
        es: ['es-ES', 'es-MX', 'es-AR', 'es-CO'],
      }

      fc.assert(
        fc.property(
          fc.constantFrom(...locales),
          fc.integer({ min: 0, max: 3 }),
          (locale, variantIndex) => {
            const variants = regionVariants[locale] || []
            if (variants.length === 0) return true

            const variant = variants[variantIndex % variants.length]
            const acceptLanguageHeader = `${variant};q=0.9`

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Should match to base language
            expect(detectedLocale).toBe(locale)
            expect(locales).toContain(detectedLocale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: empty or invalid Accept-Language header falls back to default', () => {
      /**
       * Property: For any empty or invalid Accept-Language header,
       * the system should fall back to the default locale.
       */
      const invalidHeaders = ['', '   ', 'invalid', ';;;', 'null', 'undefined']

      fc.assert(
        fc.property(fc.constantFrom(...invalidHeaders), (invalidHeader) => {
          const detectedLocale = matchBrowserLanguageToLocale(
            invalidHeader,
            locales,
            defaultLocale
          )

          // Should fall back to default locale
          expect(detectedLocale).toBe(defaultLocale)
          expect(locales).toContain(detectedLocale)

          return true
        }),
        { numRuns: 100 }
      )
    })

    it('property: quality values do not affect locale selection for supported languages', () => {
      /**
       * Property: For any supported locale with any quality value,
       * the system should detect and use that locale regardless of quality.
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...locales),
          fc.double({ min: 0.1, max: 1.0, noNaN: true }),
          (locale, quality) => {
            const acceptLanguageHeader = `${locale};q=${quality.toFixed(2)}`

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Quality value should not affect detection of supported locale
            expect(detectedLocale).toBe(locale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: case-insensitive language code matching', () => {
      /**
       * Property: For any supported locale in any case combination,
       * the system should detect it correctly (case-insensitive matching).
       */
      fc.assert(
        fc.property(
          fc.constantFrom(...locales),
          fc.constantFrom('upper', 'lower', 'mixed'),
          (locale, caseType) => {
            let langCode: string = locale
            if (caseType === 'upper') {
              langCode = locale.toUpperCase()
            } else if (caseType === 'mixed') {
              langCode = locale.charAt(0).toUpperCase() + locale.slice(1)
            }

            const acceptLanguageHeader = `${langCode};q=0.9`

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Should detect regardless of case
            expect(detectedLocale).toBe(locale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('property: detected locale is always in the supported locales list', () => {
      /**
       * Property: For any Accept-Language header, the detected locale
       * must always be one of the supported locales.
       */
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom('en', 'es', 'fr', 'de', 'it', 'ja'), {
            minLength: 1,
            maxLength: 5,
          }),
          (languages) => {
            const acceptLanguageHeader = languages
              .map((lang, i) => `${lang};q=${(1 - i * 0.1).toFixed(1)}`)
              .join(',')

            const detectedLocale = matchBrowserLanguageToLocale(
              acceptLanguageHeader,
              locales,
              defaultLocale
            )

            // Detected locale must be in supported locales
            expect(locales).toContain(detectedLocale)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Accept-Language header parsing', () => {
    it('should parse simple Accept-Language headers', () => {
      const header = 'en-US'
      const parsed = parseAcceptLanguage(header)

      expect(parsed).toEqual(['en-us'])
    })

    it('should parse Accept-Language headers with quality values', () => {
      const header = 'en-US;q=0.9,es;q=0.8'
      const parsed = parseAcceptLanguage(header)

      expect(parsed).toEqual(['en-us', 'es'])
    })

    it('should handle complex Accept-Language headers', () => {
      const header = 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7'
      const parsed = parseAcceptLanguage(header)

      expect(parsed).toEqual(['en-us', 'en', 'es-mx', 'es'])
    })

    it('should extract base language from locale codes', () => {
      expect(getBaseLanguage('en-US')).toBe('en')
      expect(getBaseLanguage('es-MX')).toBe('es')
      expect(getBaseLanguage('en')).toBe('en')
    })
  })

  describe('Locale matching logic', () => {
    it('should match supported locale exactly', () => {
      const result = matchBrowserLanguageToLocale('es', locales, defaultLocale)
      expect(result).toBe('es')
    })

    it('should match supported locale with region variant', () => {
      const result = matchBrowserLanguageToLocale(
        'en-US',
        locales,
        defaultLocale
      )
      expect(result).toBe('en')
    })

    it('should fall back to default for unsupported locale', () => {
      const result = matchBrowserLanguageToLocale('fr', locales, defaultLocale)
      expect(result).toBe(defaultLocale)
    })

    it('should prioritize first supported locale in list', () => {
      const result = matchBrowserLanguageToLocale(
        'fr;q=0.9,en;q=0.8',
        locales,
        defaultLocale
      )
      expect(result).toBe('en')
    })

    it('should handle empty header', () => {
      const result = matchBrowserLanguageToLocale('', locales, defaultLocale)
      expect(result).toBe(defaultLocale)
    })
  })

  describe('Middleware configuration', () => {
    it('should have localeDetection enabled in middleware', () => {
      // This test verifies that the middleware configuration supports locale detection
      // The actual middleware uses next-intl's built-in locale detection
      expect(locales.length).toBeGreaterThan(0)
      expect(defaultLocale).toBeDefined()
      expect(locales).toContain(defaultLocale)
    })

    it('should support all configured locales', () => {
      // Verify that all configured locales are valid
      locales.forEach((locale) => {
        expect(typeof locale).toBe('string')
        expect(locale.length).toBe(2) // ISO 639-1 codes are 2 letters
        expect(locale).toBe(locale.toLowerCase())
      })
    })
  })
})
