import { Clock, MapPin } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { packageBookingLink } from '../../utils/whatsapp'
import { packagePath } from '../../data/navigation'
import type { TourPackage } from '../../types'
import { formatIDR } from '../../utils/format'
import { ButtonLink } from '../ui/Button'

export function PackageCard({ pkg }: { pkg: TourPackage }) {
  const { language, t, localize } = useLanguage()

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-sand bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-deep">
        <img
          alt={localize(pkg.image.alt)}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          decoding="async"
          loading="lazy"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={`/images/packages/${pkg.slug}-640.webp`}
          srcSet={`/images/packages/${pkg.slug}-640.webp 640w, /images/packages/${pkg.slug}-1024.webp 1024w`}
        />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ivory/90 px-4 py-2 text-xs font-semibold text-forest">
          <Clock aria-hidden="true" size={15} />
          {pkg.days} {pkg.days === 1 ? t.common.day : t.common.days}
        </div>
      </div>
      <div className="flex flex-col gap-5 p-7 sm:p-8">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-clay uppercase">{pkg.code}</p>
          <h3 className="display-title text-[clamp(1.9rem,3vw,2.8rem)] text-forest">{localize(pkg.name)}</h3>
        </div>
        <ul aria-label={t.packages.detail.itineraryTitle} className="flex flex-col gap-1.5">
          {pkg.itinerary.slice(0, 3).map((destination) => (
            <li className="flex items-start gap-2 text-sm text-muted" key={localize(destination)}>
              <MapPin aria-hidden="true" className="mt-0.5 shrink-0" size={15} />
              <span>{localize(destination)}</span>
            </li>
          ))}
          {pkg.itinerary.length > 3 && <li className="text-sm text-muted">+{pkg.itinerary.length - 3}</li>}
        </ul>
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-sand pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{t.common.priceFrom}</p>
            <p className="mt-2 text-2xl font-semibold text-forest">{formatIDR(pkg.priceFrom, language)}</p>
            <p className="mt-1 text-sm text-muted">{t.common.perCar}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <ButtonLink href={packageBookingLink(pkg, language)} variant="whatsapp" className="sm:flex-1">{t.common.bookViaWhatsApp}</ButtonLink>
          <ButtonLink to={packagePath(pkg.slug, language)} variant="secondary" className="sm:flex-1" showArrow>{t.packages.card.detailsCta}</ButtonLink>
        </div>
      </div>
    </article>
  )
}
