import type { GalleryItem, LocalizedText } from '../types'
import { photographyImage } from '../utils/media'

const destinationAlt: LocalizedText = {
  id: 'Dokumentasi destinasi wisata bersama Wisata Jogjaku',
  en: 'Documentation of a travel destination with Wisata Jogjaku',
}

const journeyAlt: LocalizedText = {
  id: 'Dokumentasi perjalanan wisata bersama Wisata Jogjaku',
  en: 'Documentation of a tour journey with Wisata Jogjaku',
}

const destinationNames = ['jogja-landscape', 'destination-01', 'destination-02', 'destination-03']
const journeyNames = Array.from(
  { length: 16 },
  (_, index) => `journey-${String(index + 1).padStart(2, '0')}`,
)

export const galleryItems: GalleryItem[] = [
  ...destinationNames.map((name) => ({
    id: name,
    category: 'destination' as const,
    image: photographyImage(name, destinationAlt),
  })),
  ...journeyNames.map((name) => ({
    id: name,
    category: 'journey' as const,
    image: photographyImage(name, journeyAlt),
  })),
]
