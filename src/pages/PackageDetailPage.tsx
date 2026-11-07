import { ArrowLeft, Clock, Wallet } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { packageExclusions, packagePriceNote, tourPackages } from '../data/packages'
import { routePath } from '../data/navigation'
import { customTripLink, packageBookingLink } from '../utils/whatsapp'
import { formatIDR } from '../utils/format'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

export function PackageDetailPage() {
  const { language, t, localize } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const pkg = tourPackages.find((item) => item.slug === slug)

  if (!pkg) {
    return <Navigate replace to={routePath('packages', language)} />
  }

  const related = tourPackages.filter((item) => item.days === pkg.days && item.slug !== pkg.slug).slice(0, 3)

  return (
    <>
      <SEO
        title={t.packages.meta.detailTitle.replace('{code}', pkg.code)}
        description={t.packages.meta.detailDescription.replace('{code}', pkg.code)}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: localize(pkg.name),
          description: t.packages.meta.detailDescription.replace('{code}', pkg.code),
          offers: {
            '@type': 'Offer',
            price: String(pkg.priceFrom),
            priceCurrency: 'IDR',
          },
        }}
      />
      <PageHero eyebrow={pkg.code} title={localize(pkg.name)} description={t.packages.meta.detailDescription.replace('{code}', pkg.code)} image={`/images/packages/${pkg.slug}-768.webp`} />
      <section className="section-space bg-ivory">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <img
              alt={localize(pkg.image.alt)}
              className="h-auto max-h-[72vh] w-full rounded-[2rem] bg-sand-light object-contain p-3 shadow-soft sm:p-4"
              decoding="async"
              fetchPriority="high"
              sizes="(min-width: 1024px) 45vw, 100vw"
              src={`/images/packages/${pkg.slug}-640.webp`}
              srcSet={`/images/packages/${pkg.slug}-640.webp 640w, /images/packages/${pkg.slug}-1024.webp 1024w`}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[2rem] border border-sand bg-white p-7 shadow-soft sm:p-9">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 rounded-full bg-sand-light px-4 py-2 text-forest">
                  <Clock aria-hidden="true" size={16} />
                  <span><strong>{pkg.days}</strong> {pkg.days === 1 ? t.common.day : t.common.days}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-sand-light px-4 py-2 text-forest">
                  <Wallet aria-hidden="true" size={16} />
                  <span>{formatIDR(pkg.priceFrom, language)} {t.common.perCar}</span>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="display-title text-4xl text-forest">{t.packages.detail.itineraryTitle}</h2>
                <ol className="mt-5 flex flex-col gap-3">
                  {pkg.itinerary.map((destination, index) => (
                    <li className="flex items-start gap-3 text-muted" key={index}>
                      <span className="inline-grid size-8 shrink-0 place-items-center rounded-full bg-forest text-xs font-semibold text-ivory">{index + 1}</span>
                      <span className="pt-1.5">{localize(destination)}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-8 border-t border-sand pt-6">
                <h2 className="display-title text-4xl text-forest">{t.packages.detail.exclusionsTitle}</h2>
                <ul className="mt-4 space-y-2">
                  {packageExclusions.map((exclusion) => <li className="text-muted" key={localize(exclusion)}>• {localize(exclusion)}</li>)}
                </ul>
              </div>
              <div className="mt-8 border-t border-sand pt-6">
                <h2 className="display-title text-4xl text-forest">{t.packages.detail.priceNoteTitle}</h2>
                <p className="mt-4 leading-relaxed text-muted">{localize(packagePriceNote)}</p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={packageBookingLink(pkg, language)} variant="whatsapp" className="sm:flex-1">{t.packages.detail.bookingCta}</ButtonLink>
                <ButtonLink href={customTripLink(language)} variant="secondary" className="sm:flex-1">{t.packages.detail.customTripCta}</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="site-container">
          <h2 className="display-title text-4xl text-forest">{t.packages.detail.bookingTitle}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.packages.detail.bookingDescription}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={packageBookingLink(pkg, language)} variant="whatsapp">{t.packages.detail.bookingCta}</ButtonLink>
            <ButtonLink to={routePath('packages', language)} variant="secondary"><ArrowLeft aria-hidden="true" size={17} /> {t.packages.detail.backToPackages}</ButtonLink>
          </div>
          {related.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <Link className="rounded-[1.75rem] border border-sand bg-ivory p-6 transition-colors hover:bg-sand-light" key={item.slug} to={`/paket-wisata/${item.slug}/`}>
                  <p className="text-xs font-bold tracking-[0.18em] text-clay uppercase">{item.code}</p>
                  <h3 className="display-title mt-2 text-3xl text-forest">{localize(item.name)}</h3>
                  <p className="mt-3 text-muted">{formatIDR(item.priceFrom, language)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
