export type Language = 'id' | 'en'

export interface LocalizedText {
  id: string
  en: string
}

export interface ImageAsset {
  src: string
  srcSet: string
  alt: LocalizedText
}

export type PackageDays = 1 | 2 | 3
export type PackageCategorySlug = 'one-day' | 'two-day' | 'three-day'

export interface PackageCategory {
  days: PackageDays
  slug: PackageCategorySlug
  name: LocalizedText
  count: number
  priceFrom: number
  currency: 'IDR'
  priceBasis: 'car'
  image: ImageAsset
}

export interface TourPackage {
  code: string
  slug: string
  name: LocalizedText
  days: PackageDays
  category: PackageCategorySlug
  priceFrom: number
  currency: 'IDR'
  priceBasis: 'car'
  image: ImageAsset
  itinerary: LocalizedText[]
  includes: null
}

export type VehicleInclusion = 'car' | 'driver' | 'fuel'

export interface Vehicle {
  slug: string
  name: string
  price: number
  currency: 'IDR'
  durationHours: 12
  priceBasis: '12-hours'
  includes: VehicleInclusion[]
  capacity: null
  image: ImageAsset
}

export interface Testimonial {
  id: string
  quote: LocalizedText
  author: null
}

export type GalleryCategory = 'destination' | 'journey'

export interface GalleryItem {
  id: string
  category: GalleryCategory
  image: ImageAsset
}
