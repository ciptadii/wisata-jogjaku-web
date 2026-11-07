import { useMemo, useState } from 'react'
import { ArrowDownWideNarrow } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { packageCategories, tourPackages } from '../data/packages'
import { packagePath } from '../data/navigation'
import { formatIDR } from '../utils/format'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { PackageCard } from '../components/cards/PackageCard'
import { Reveal } from '../components/ui/Reveal'
import { PriceNote } from '../components/ui/PriceNote'
import { SEO } from '../components/ui/SEO'
import { Lightbox } from '../components/ui/Lightbox'
import type { GalleryItem } from '../types'

const filters = [
  { value: 'all', label: 'all' },
  { value: '1', label: 'oneDay' },
  { value: '2', label: 'twoDays' },
  { value: '3', label: 'threeDays' },
] as const

export function PackagesPage() {
  const { language, t, localize } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<'all' | '1' | '2' | '3'>('all')
  const [sort, setSort] = useState<'featured' | 'priceLowHigh' | 'priceHighLow'>('featured')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredPackages = useMemo(() => {
    const filtered = activeFilter === 'all' ? [...tourPackages] : tourPackages.filter((pkg) => pkg.days === Number(activeFilter))
    if (sort === 'priceLowHigh') filtered.sort((a, b) => a.priceFrom - b.priceFrom)
    if (sort === 'priceHighLow') filtered.sort((a, b) => b.priceFrom - a.priceFrom)
    return filtered
  }, [activeFilter, sort])

  const lightboxItems = useMemo<GalleryItem[]>(
    () =>
      filteredPackages.map((pkg) => ({
        id: pkg.slug,
        category: 'destination',
        image: pkg.image,
      })),
    [filteredPackages],
  )

  return (
    <>
      <SEO
        title={`${t.packages.meta.indexTitle} | Wisata Jogjaku`}
        description={t.packages.meta.indexDescription}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: filteredPackages.map((pkg, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://wisatajogjaku.com${packagePath(pkg.slug, language)}`,
          })),
        }}
      />
      <PageHero eyebrow={t.packages.index.eyebrow} title={t.packages.index.title} description={t.packages.index.description} image="/images/packages/one-day-1024.webp" />
      <section className="section-space bg-ivory">
        <div className="site-container">
          <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.packages.filters.label}>
              {filters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter.value}
                  className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${activeFilter === filter.value ? 'bg-forest text-ivory' : 'border border-sand bg-white text-muted hover:text-forest'}`}
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  type="button"
                >
                  {t.packages.filters[filter.label]}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm text-muted">
              <ArrowDownWideNarrow aria-hidden="true" size={16} />
              <span>{t.packages.filters.sortLabel}</span>
              <select aria-label={t.packages.filters.sortLabel} className="min-h-11 rounded-full border border-sand bg-white px-4 text-sm font-semibold text-forest" onChange={(event) => setSort(event.target.value as typeof sort)} value={sort}>
                <option value="featured">{t.packages.filters.featured}</option>
                <option value="priceLowHigh">{t.packages.filters.priceLowHigh}</option>
                <option value="priceHighLow">{t.packages.filters.priceHighLow}</option>
              </select>
            </label>
          </Reveal>
          <p className="mb-6 text-sm text-muted">{t.packages.index.resultCount.replace('{count}', String(filteredPackages.length))}</p>
          {filteredPackages.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPackages.map((pkg, index) => (
                <Reveal delay={index * 0.03} key={pkg.slug}>
                  <PackageCard index={index} pkg={pkg} setLightboxIndex={setLightboxIndex} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-sand bg-white p-10 text-center">
              <h2 className="display-title text-4xl text-forest">{t.packages.index.emptyTitle}</h2>
              <p className="mt-3 text-muted">{t.packages.index.emptyDescription}</p>
              <button className="mt-5 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory" onClick={() => setActiveFilter('all')} type="button">{t.packages.filters.reset}</button>
            </div>
          )}
          <div className="mt-10">
            <PriceNote>{t.packages.detail.priceNote}</PriceNote>
          </div>
        </div>
      </section>
      <section className="section-space bg-sand-light">
        <div className="site-container">
          <h2 className="display-title text-4xl text-forest">{t.packages.index.catalogTitle}</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packageCategories.map((category) => (
              <Reveal className="flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft" key={category.slug}>
                <div className="overflow-hidden bg-sand-light">
                  <img
                    alt={localize(category.image.alt)}
                    className="aspect-square w-full object-cover object-center"
                    decoding="async"
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src={`/images/packages/${category.slug}-640.webp`}
                    srcSet={`/images/packages/${category.slug}-640.webp 640w, /images/packages/${category.slug}-1024.webp 1024w`}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <h3 className="display-title text-3xl text-forest">{localize(category.name)}</h3>
                  <p className="text-muted">{formatIDR(category.priceFrom, language)} {t.common.perCar}</p>
                  <ButtonLink to={`/paket-wisata-${category.days}-hari/`} variant="primary">{t.common.viewDetails}</ButtonLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Lightbox
        index={lightboxIndex}
        items={lightboxItems}
        labels={{
          close: t.gallery.lightbox.close,
          previous: t.gallery.lightbox.previous,
          next: t.gallery.lightbox.next,
          dialog: t.gallery.lightbox.imageLabel,
        }}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  )
}
