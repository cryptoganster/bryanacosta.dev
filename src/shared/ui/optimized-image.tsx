import Image, { type ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
  priority?: boolean
}

/**
 * Optimized Image component with best practices:
 * - Explicit width/height to prevent CLS
 * - Lazy loading by default
 * - Priority loading for above-the-fold images
 * - Optimized quality settings
 */
export function OptimizedImage({
  src,
  alt,
  priority = false,
  loading,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      loading={priority ? undefined : loading || 'lazy'}
      quality={quality}
      {...props}
    />
  )
}
