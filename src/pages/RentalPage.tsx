import { Check, Clock, Info, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { vehicles } from '../data/vehicles'
import { vehicleBookingLink } from '../utils/whatsapp'
import { formatIDR } from '../utils/format'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'
import { PriceNote } from '../components/ui/PriceNote'

export function RentalPage() {
  const { language, t } = useLanguage()
  const [selected, setSelected] = useState<string[]>([])

  const comparison = useMemo(() => vehicles.filter((vehicle) => selected.includes(vehicle.slug)), [selected])

  const toggle = (slug: string) => {
    setSelected((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug)
      return current.length >= 4 ? current : [...current, slug]
    })
  }

  return (
    <>
      <SEO title={`${t.rental.meta.title} | Wisata Jogjaku`} description={t.rental.meta.description} />
      <PageHero eyebrow={t.rental.index.eyebrow} title={t.rental.index.title} description={t.rental.index.description} image="/images/vehicles/calya-900.webp" />
      <section className="section-space bg-ivory">
        <div className="site-container">
          <p className="mb-6 text-sm text-muted">{t.rental.index.resultCount.replace('{count}', String(vehicles.length))}</p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((vehicle, index) => (
              <Reveal delay={index * 0.03} key={vehicle.slug}>
                <article className="group relative overflow-hidden rounded-[1.75rem] border border-sand bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-light p-8">
                    <img
                      alt={vehicle.name}
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      decoding="async"
                      loading="lazy"
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      src={`/images/vehicles/${vehicle.slug}-480.webp`}
                      srcSet={`/images/vehicles/${vehicle.slug}-480.webp 480w, /images/vehicles/${vehicle.slug}-900.webp 900w`}
                    />
                  </div>
                  <div className="flex flex-col gap-5 p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="display-title text-4xl text-forest">{vehicle.name}</h2>
                        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                          <Users aria-hidden="true" size={16} />
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
                    <div className="flex flex-col gap-2.5">
                      <ButtonLink href={vehicleBookingLink(vehicle, language)} variant="whatsapp">{t.rental.card.bookingCta}</ButtonLink>
                      <button
                        aria-pressed={selected.includes(vehicle.slug)}
                        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${selected.includes(vehicle.slug) ? 'border-forest bg-forest text-ivory' : 'border-forest/25 text-forest hover:bg-sand-light'}`}
                        onClick={() => toggle(vehicle.slug)}
                        type="button"
                      >
                        <Check aria-hidden="true" size={17} />
                        {selected.includes(vehicle.slug) ? t.rental.compare.remove : t.rental.compare.add}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <PriceNote>{t.rental.terms.capacityUnconfirmed}</PriceNote>
          </div>
        </div>
      </section>
      <section className="section-space bg-ivory">
        <div className="site-container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="display-title text-4xl text-forest">{t.rental.compare.title}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t.rental.compare.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">{t.rental.compare.selectedCount.replace('{count}', String(comparison.length))}</span>
              {comparison.length > 0 && (
                <button className="rounded-full border border-sand px-5 py-3 text-sm font-semibold text-forest" onClick={() => setSelected([])} type="button">{t.rental.compare.clear}</button>
              )}
            </div>
          </div>
          {comparison.length === 0 ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-sand bg-white p-10 text-center">
              <h3 className="display-title text-4xl text-forest">{t.rental.compare.emptyTitle}</h3>
              <p className="mt-3 text-muted">{t.rental.compare.emptyDescription}</p>
            </div>
          ) : (
            <div className="mt-10 overflow-x-auto rounded-[2rem] border border-sand bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-sand bg-sand-light">
                    <th className="p-5 font-semibold text-forest">{t.rental.compare.vehicleColumn}</th>
                    <th className="p-5 font-semibold text-forest">{t.rental.compare.priceColumn}</th>
                    <th className="p-5 font-semibold text-forest">{t.rental.compare.durationColumn}</th>
                    <th className="p-5 font-semibold text-forest">{t.rental.compare.capacityColumn}</th>
                    <th className="p-5 font-semibold text-forest">{t.rental.compare.inclusionsColumn}</th>
                    <th className="p-5 font-semibold text-forest" />
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((vehicle) => (
                    <tr className="border-b border-sand last:border-0" key={vehicle.slug}>
                      <td className="p-5 font-semibold text-forest">{vehicle.name}</td>
                      <td className="p-5">{formatIDR(vehicle.price, language)}</td>
                      <td className="p-5">{t.rental.card.duration}</td>
                      <td className="p-5">{t.rental.card.capacityPending}</td>
                      <td className="p-5">{t.rental.card.includedShort}</td>
                      <td className="p-5">
                        <ButtonLink href={vehicleBookingLink(vehicle, language)} variant="whatsapp">{t.rental.compare.bookingCta}</ButtonLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="display-title text-4xl text-forest">{t.rental.terms.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{t.rental.terms.description}</p>
            <div className="mt-8 space-y-7">
              <div className="flex gap-4">
                <Clock aria-hidden="true" className="mt-1 text-terracotta" size={24} />
                <div>
                  <h3 className="font-semibold text-forest">{t.rental.terms.durationTitle}</h3>
                  <p className="mt-2 text-muted">{t.rental.terms.durationDescription}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Info aria-hidden="true" className="mt-1 text-terracotta" size={24} />
                <div>
                  <h3 className="font-semibold text-forest">{t.rental.terms.includedTitle}</h3>
                  <p className="mt-2 text-muted">{t.rental.card.includedShort}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Users aria-hidden="true" className="mt-1 text-terracotta" size={24} />
                <div>
                  <h3 className="font-semibold text-forest">{t.rental.terms.capacityTitle}</h3>
                  <p className="mt-2 text-muted">{t.rental.terms.capacityUnconfirmed}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-forest p-8 text-ivory sm:p-10">
            <h3 className="display-title text-4xl">{t.rental.terms.confirmationTitle}</h3>
            <p className="mt-4 leading-relaxed text-ivory/75">{t.rental.terms.confirmationDescription}</p>
            <ButtonLink href={vehicleBookingLink(vehicles[0], language)} variant="light" className="mt-8">{t.rental.detail.bookingCta}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
