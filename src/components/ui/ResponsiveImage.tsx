import type { ImageAsset } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'

interface ResponsiveImageProps {
  image: ImageAsset
  className?: string
  sizes?: string
  eager?: boolean
}

export function ResponsiveImage({ image, className = '', sizes = '100vw', eager = false }: ResponsiveImageProps) {
  const { localize } = useLanguage()

  return (
    <img
      alt={localize(image.alt)}
      className={className}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      loading={eager ? 'eager' : 'lazy'}
      sizes={sizes}
      src={image.src}
      srcSet={image.srcSet}
    />
  )
}
