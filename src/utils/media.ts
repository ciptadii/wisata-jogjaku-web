import type { ImageAsset, LocalizedText } from '../types'

export const photographyImage = (name: string, alt: LocalizedText): ImageAsset => ({
  src: `/images/photography/${name}-1280.webp`,
  srcSet: `/images/photography/${name}-768.webp 768w, /images/photography/${name}-1280.webp 1280w, /images/photography/${name}-1920.webp 1920w`,
  alt,
})

export const packageImage = (name: string, alt: LocalizedText): ImageAsset => ({
  src: `/images/packages/${name}-1024.webp`,
  srcSet: `/images/packages/${name}-640.webp 640w, /images/packages/${name}-1024.webp 1024w`,
  alt,
})

export const vehicleImage = (name: string, alt: LocalizedText): ImageAsset => ({
  src: `/images/vehicles/${name}-900.webp`,
  srcSet: `/images/vehicles/${name}-480.webp 480w, /images/vehicles/${name}-900.webp 900w`,
  alt,
})

export const logoImage = (primary: boolean): ImageAsset => {
  const name = primary ? 'logo-primary' : 'logo-secondary'

  return {
    src: `/images/brand/${name}-1024.webp`,
    srcSet: `/images/brand/${name}-512.webp 512w, /images/brand/${name}-1024.webp 1024w`,
    alt: {
      id: 'Logo Wisata Jogjaku',
      en: 'Wisata Jogjaku logo',
    },
  }
}
