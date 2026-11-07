import type { LocalizedText } from '../types'

export const siteTagline: LocalizedText = {
  id: 'Membatik Kenangan di Jogja bersama Wisata Jogjaku',
  en: 'Weaving memories in Jogja with Wisata Jogjaku',
}

export const getCurrentYear = (): number => new Date().getFullYear()

export const siteConfig = {
  name: 'Wisata Jogjaku',
  siteUrl: 'https://wisatajogjaku.com',
  tagline: siteTagline,
  whatsapp: '6285156600546',
  whatsappDisplay: '085156600546',
  address:
    'Jl. Pramuka, Besi, Sidoarum, Kec. Godean, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55264',
  mapsUrl:
    'https://www.google.com/maps/place/Sewa+Mobil+Dengan+Driver+%7C+Wisatajogjaku/@-7.770171,110.3262427,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7af7c26fbfd9d7:0xdc71e4047de05aaf!8m2!3d-7.770171!4d110.3262427!16s/g/11v60snjlj?entry=ttu',
  social: {
    instagram: 'https://instagram.com/wisatajogjaku_',
    tiktok: 'https://www.tiktok.com/@wisatajogjaku',
  },
  get currentYear(): number {
    return getCurrentYear()
  },
}
