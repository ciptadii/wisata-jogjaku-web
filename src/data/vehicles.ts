import type { Vehicle } from '../types'
import { vehicleImage } from '../utils/media'

const createVehicle = (slug: string, name: string, price: number): Vehicle => ({
  slug,
  name,
  price,
  currency: 'IDR',
  durationHours: 12,
  priceBasis: '12-hours',
  includes: ['car', 'driver', 'fuel'],
  capacity: null,
  image: vehicleImage(slug, {
    id: `Kendaraan ${name} untuk rental bersama Wisata Jogjaku`,
    en: `${name} rental vehicle from Wisata Jogjaku`,
  }),
})

export const vehicles: Vehicle[] = [
  createVehicle('calya', 'Calya', 500000),
  createVehicle('avanza-facelift', 'Avanza Facelift', 550000),
  createVehicle('all-new-avanza', 'All New Avanza', 600000),
  createVehicle('innova-reborn', 'Innova Reborn', 800000),
  createVehicle('hiace-commuter', 'Hiace Commuter', 1300000),
  createVehicle('hiace-premio', 'Hiace Premio', 1400000),
  createVehicle('elf-giga', 'Elf GIGA', 1400000),
  createVehicle('fortuner', 'Fortuner', 1750000),
  createVehicle('alphard', 'Alphard', 3000000),
]
