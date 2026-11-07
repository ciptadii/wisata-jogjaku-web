import type { Language, LocalizedText, PackageDays } from '../types'

export type RouteKey = 'home' | 'about' | 'packages' | 'rental' | 'gallery' | 'blog' | 'contact'

export const routePaths: Record<Language, Record<RouteKey, string>> = {
  id: {
    home: '/',
    about: '/tentang-kami/',
    packages: '/paket-wisata/',
    rental: '/rental-mobil/',
    gallery: '/galeri/',
    blog: '/blog/',
    contact: '/kontak-kami/',
  },
  en: {
    home: '/en/',
    about: '/en/about-us/',
    packages: '/en/tour-packages/',
    rental: '/en/car-rental/',
    gallery: '/en/gallery/',
    blog: '/en/blog/',
    contact: '/en/contact/',
  },
}

export const navigationLabels: Record<RouteKey, LocalizedText> = {
  home: { id: 'Beranda', en: 'Home' },
  about: { id: 'Tentang kami', en: 'About us' },
  packages: { id: 'Paket wisata', en: 'Tour packages' },
  rental: { id: 'Rental mobil', en: 'Car rental' },
  gallery: { id: 'Galeri', en: 'Gallery' },
  blog: { id: 'Blog', en: 'Blog' },
  contact: { id: 'Kontak kami', en: 'Contact' },
}

export const routePath = (key: RouteKey, language: Language): string => routePaths[language][key]

export const packagePath = (slug: string, language: Language): string =>
  language === 'id' ? `/paket-wisata/${slug}/` : `/en/tour-packages/${slug}/`

export const blogPath = (slug: string, language: Language): string =>
  language === 'id' ? `/blog/${slug}/` : `/en/blog/${slug}/`

const categoryPaths: Record<Language, Record<PackageDays, string>> = {
  id: {
    1: '/paket-wisata-1-hari/',
    2: '/paket-wisata-2-hari/',
    3: '/paket-wisata-3-hari/',
  },
  en: {
    1: '/en/tour-packages/1-day/',
    2: '/en/tour-packages/2-days/',
    3: '/en/tour-packages/3-days/',
  },
}

export const categoryPath = (days: PackageDays, language: Language): string =>
  categoryPaths[language][days]
