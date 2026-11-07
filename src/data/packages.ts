import type {
  LocalizedText,
  PackageCategory,
  PackageCategorySlug,
  PackageDays,
  TourPackage,
} from '../types'
import { packageImage } from '../utils/media'

const categorySlugs: Record<PackageDays, PackageCategorySlug> = {
  1: 'one-day',
  2: 'two-day',
  3: 'three-day',
}

const categoryNames: Record<PackageDays, LocalizedText> = {
  1: { id: 'Paket wisata 1 hari', en: '1-day tour package' },
  2: { id: 'Paket wisata 2 hari', en: '2-day tour package' },
  3: { id: 'Paket wisata 3 hari', en: '3-day tour package' },
}

const categoryCounts: Record<PackageDays, number> = {
  1: 9,
  2: 3,
  3: 2,
}

const prices: Record<PackageDays, number> = {
  1: 550000,
  2: 1100000,
  3: 1650000,
}

const createCategory = (days: PackageDays): PackageCategory => {
  const slug = categorySlugs[days]

  return {
    days,
    slug,
    name: categoryNames[days],
    count: categoryCounts[days],
    priceFrom: prices[days],
    currency: 'IDR',
    priceBasis: 'car',
    image: packageImage(slug, {
      id: `Brosur kategori paket wisata ${days} hari`,
      en: `${days}-day tour package category brochure`,
    }),
  }
}

export const packageCategories: PackageCategory[] = [
  createCategory(1),
  createCategory(2),
  createCategory(3),
]

const createItinerary = (names: string[], englishNames: Record<string, string>): LocalizedText[] => {
  return names.map((name) => ({
    id: name,
    en: englishNames[name] ?? name,
  }))
}

const ENGLISH_DESTINATIONS: Record<string, string> = {
  'Candi Borobudur': 'Borobudur Temple',
  'Merapi Lava Tour': 'Merapi Lava Tour',
  'Candi Prambanan': 'Prambanan Temple',
  'Tebing Breksi': 'Tebing Breksi',
  'Svargabumi Borobudur': 'Svargabumi Borobudur',
  'Bukit Rhema': 'Bukit Rhema',
  'Kalibiru/Pulepayung': 'Kalibiru/Pulepayung',
  'Keraton': 'Sultan Palace',
  'Taman Sari': 'Taman Sari',
  'Gumuk Pasir': 'Sand dunes',
  'Pantai Parangtritis': 'Parangtritis Beach',
  'Hutan Pinus Mangunan': 'Mangunan Pine Forest',
  'Seribu Batu Rumah Hobit': 'Seribu Batu Hobbit Houses',
  'Goa Pindul': 'Goa Pindul Cave',
  'Pantai Timang/Pantai Gunungkidul Area': 'Timang Beach / Gunungkidul coastal area',
  'Heha Sky View': 'Heha Sky View',
  'Teras Kaca': 'Glass terrace',
  'Heha Ocean View': 'Heha Ocean View',
  'Sunrise Bukit Panguk/Mangunan': 'Sunrise at Bukit Panguk/Mangunan',
  'Goa Pindul Sungai Oyo': 'Goa Pindul and Sungai Oyo',
  'Pantai Wonosari Area': 'Wonosari coastal area',
  'Sunrise Merapi Lava Tour': 'Sunrise Merapi Lava Tour',
  'Sikunir': 'Sikunir',
  'Candi Arjuna': 'Arjuna Temple',
  'Telaga Warna': 'Telaga Warna',
  'Batu Pandang Ratapan Angin': 'Batu Pandang Ratapan Angin',
  'Kawah Sikidang': 'Kawah Sikidang',
  'Bukit Rhema (Gereja Ayam)': 'Bukit Rhema (Chicken Church)',
  'Pulepayung / Kalibiru': 'Pulepayung / Kalibiru',
  'Lavatour': 'Lava Tour',
  'Area Pantai Gunungkidul': 'Gunungkidul coastal area',
  'Hutan Pinus': 'Pine Forest',
}

const packageDefinitions: Array<{ code: string; days: PackageDays; itinerary: string[] }> = [
  { code: 'A-01', days: 1, itinerary: ['Candi Borobudur', 'Merapi Lava Tour', 'Candi Prambanan', 'Tebing Breksi'] },
  { code: 'A-02', days: 1, itinerary: ['Candi Borobudur', 'Svargabumi Borobudur', 'Bukit Rhema', 'Kalibiru/Pulepayung'] },
  { code: 'A-03', days: 1, itinerary: ['Merapi Lava Tour', 'Candi Prambanan', 'Tebing Breksi', 'Obelix Hills'] },
  { code: 'A-04', days: 1, itinerary: ['Keraton', 'Taman Sari', 'Gumuk Pasir', 'Pantai Parangtritis'] },
  { code: 'A-05', days: 1, itinerary: ['Hutan Pinus Mangunan', 'Seribu Batu Rumah Hobit', 'Goa Pindul', 'Pantai Timang/Pantai Gunungkidul Area', 'Heha Sky View'] },
  { code: 'A-06', days: 1, itinerary: ['Hutan Pinus Mangunan', 'Teras Kaca', 'Heha Ocean View'] },
  { code: 'A-07', days: 1, itinerary: ['Sunrise Bukit Panguk/Mangunan', 'Goa Pindul Sungai Oyo', 'Pantai Wonosari Area'] },
  { code: 'A-08', days: 1, itinerary: ['Sunrise Merapi Lava Tour', 'Candi Borobudur', 'Candi Prambanan'] },
  { code: 'A-09', days: 1, itinerary: ['Sikunir', 'Candi Arjuna', 'Telaga Warna', 'Batu Pandang Ratapan Angin', 'Kawah Sikidang'] },
  { code: 'B-01', days: 2, itinerary: ['Candi Borobudur', 'Svarga Bumi', 'Bukit Rhema', 'Kalibiru/Pulepayung', 'Merapi Lava Tour', 'Candi Prambanan', 'Tebing Breksi', 'Obelix Hills'] },
  { code: 'B-02', days: 2, itinerary: ['Candi Borobudur', 'Merapi Lava Tour', 'Candi Prambanan', 'Hutan Pinus', 'Goa Pindul', 'Pantai Timang/Pantai Gunungkidul Area', 'Heha Sky View'] },
  { code: 'B-03', days: 2, itinerary: ['Kebun Buah Mangunan (Sunrise)', 'Hutan Pinus Mangunan', 'Teras Kaca', 'Heha Ocean View', 'Goa Pindul', 'Pantai Gunungkidul Area', 'Heha Sky View'] },
  { code: 'C-01', days: 3, itinerary: ['Candi Borobudur', 'Svargabumi', 'Bukit Rhema (Gereja Ayam)', 'Pulepayung / Kalibiru', 'Lavatour', 'Candi Prambanan', 'Tebing Breksi', 'Obelix Hills', 'Hutan Pinus Mangunan', 'Goa Pindul', 'Area Pantai Gunungkidul', 'Heha Sky view'] },
  { code: 'C-02', days: 3, itinerary: ['Candi Borobudur & Prambanan', 'Merapi Lavatour', 'Tebing Breksi', 'Hutan Pinus Mangunan', 'Seribu Batu Rumah Hobbit', 'Goa Pindul Oyo & Pantai GunungKidul', 'Heha Sky View', 'Keraton & Taman Sari', 'Kalibiru/Pulepayung', 'Pantai Parangtritis'] },
]

const createPackage = (definition: { code: string; days: PackageDays; itinerary: string[] }): TourPackage => {
  const slug = definition.code.toLowerCase()

  return {
    code: definition.code,
    slug,
    name: {
      id: `Paket wisata ${definition.code}`,
      en: `Tour package ${definition.code}`,
    },
    days: definition.days,
    category: categorySlugs[definition.days],
    priceFrom: prices[definition.days],
    currency: 'IDR',
    priceBasis: 'car',
    image: packageImage(slug, {
      id: `Brosur paket wisata ${definition.code}`,
      en: `Tour package ${definition.code} brochure`,
    }),
    itinerary: createItinerary(definition.itinerary, ENGLISH_DESTINATIONS),
    includes: null,
  }
}

export const tourPackages: TourPackage[] = packageDefinitions.map(createPackage)

export const packageExclusions: LocalizedText[] = [
  {
    id: 'Tiket masuk objek wisata',
    en: 'Attraction admission tickets',
  },
  {
    id: 'Biaya parkir',
    en: 'Parking fees',
  },
]

export const packagePriceNote: LocalizedText = {
  id: 'Harga dapat berubah pada akhir pekan, long weekend, dan hari libur.',
  en: 'Prices may change on weekends, long weekends, and public holidays.',
}
