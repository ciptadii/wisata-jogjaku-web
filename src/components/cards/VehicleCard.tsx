import { Armchair } from 'lucide-react'
import { vehicleBookingLink } from '../../utils/whatsapp'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Vehicle } from '../../types'
import { formatIDR } from '../../utils/format'
import { ButtonLink } from '../ui/Button'
import { ResponsiveImage } from '../ui/ResponsiveImage'

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { language, t } = useLanguage()

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-sand bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-light">
        <ResponsiveImage
          className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.02]"
          image={vehicle.image}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-5 p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="display-title text-[clamp(1.9rem,3vw,2.8rem)] text-forest">{vehicle.name}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <Armchair aria-hidden="true" size={16} />
              {t.rental.card.capacityPending}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{t.rental.card.priceLabel}</p>
            <p className="mt-2 text-2xl font-semibold text-forest">{formatIDR(vehicle.price, language)}</p>
            <p className="mt-1 text-sm text-muted">{t.rental.card.per12Hours}</p>
          </div>
        </div>
        <p className="text-sm text-muted">{t.rental.card.includedShort}</p>
        <ButtonLink href={vehicleBookingLink(vehicle, language)} variant="whatsapp">{t.rental.card.bookingCta}</ButtonLink>
      </div>
    </article>
  )
}
