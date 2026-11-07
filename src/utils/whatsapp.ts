import { siteConfig } from '../data/site'
import type { Language, TourPackage, Vehicle } from '../types'
import { formatIDR } from './format'

export const whatsAppLink = (message: string): string =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`

export const packageBookingLink = (pkg: TourPackage, language: Language): string => {
  const message =
    language === 'id'
      ? `Halo Wisata Jogjaku, saya ingin memesan Paket Wisata ${pkg.code} untuk ${pkg.days} hari dengan harga mulai ${formatIDR(pkg.priceFrom, language)} per mobil. Mohon konfirmasi ketersediaan, itinerary, dan rincian paketnya. Terima kasih.`
      : `Hello Wisata Jogjaku, I would like to book Tour Package ${pkg.code} for ${pkg.days} ${pkg.days === 1 ? 'day' : 'days'}, with prices starting at ${formatIDR(pkg.priceFrom, language)} per car. Please confirm availability, the itinerary, and the package details. Thank you.`

  return whatsAppLink(message)
}

export const vehicleBookingLink = (vehicle: Vehicle, language: Language): string => {
  const message =
    language === 'id'
      ? `Halo Wisata Jogjaku, saya ingin menyewa ${vehicle.name} dengan harga ${formatIDR(vehicle.price, language)} per 12 jam, termasuk kendaraan, pengemudi, dan bahan bakar. Mohon konfirmasi ketersediaan dan kapasitas penumpangnya. Terima kasih.`
      : `Hello Wisata Jogjaku, I would like to rent the ${vehicle.name} for ${formatIDR(vehicle.price, language)} per 12 hours, including the vehicle, driver, and fuel. Please confirm availability and passenger capacity. Thank you.`

  return whatsAppLink(message)
}

export const customTripLink = (language: Language): string => {
  const message =
    language === 'id'
      ? 'Halo Wisata Jogjaku, saya ingin merencanakan perjalanan khusus di Yogyakarta. Mohon bantuannya untuk menyusun perjalanan sesuai kebutuhan saya. Terima kasih.'
      : 'Hello Wisata Jogjaku, I would like to plan a custom trip in Yogyakarta. Please help me arrange an itinerary that suits my needs. Thank you.'

  return whatsAppLink(message)
}

export const contactLink = (language: Language): string => {
  const message =
    language === 'id'
      ? 'Halo Wisata Jogjaku, saya ingin bertanya tentang layanan paket wisata dan rental mobil. Terima kasih.'
      : 'Hello Wisata Jogjaku, I would like to ask about your tour packages and car rental services. Thank you.'

  return whatsAppLink(message)
}
