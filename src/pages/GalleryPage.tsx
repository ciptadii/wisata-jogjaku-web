import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { galleryItems } from '../data/gallery'
import type { GalleryCategory } from '../types'
import { PageHero } from '../components/ui/PageHero'
import { Lightbox } from '../components/ui/Lightbox'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

const filters = [
  { value: 'all', label: 'all' },
  { value: 'destination', label: 'destination' },
  { value: 'journey', label: 'journey' },
] as const

export function GalleryPage() {
  const { t, localize } = useLanguage()
  const [category, setCategory] = useState<'all' | GalleryCategory>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = useMemo(() => {
    return category === 'all' ? galleryItems : galleryItems.filter((item) => item.category === category)
  }, [category])

  return (
    <>
      <SEO
        title={`${t.gallery.meta.title} | Wisata Jogjaku`}
        description={t.gallery.meta.description}
        image="/images/photography/journey-01-1280.webp"
      />
      <PageHero
        eyebrow={t.gallery.index.eyebrow}
        title={t.gallery.index.title}
        description={t.gallery.index.description}
        image="/images/photography/journey-10-1280.webp"
      />
      <section className="section-space bg-ivory">
        <div className="site-container">
          <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.gallery.filters.label}>
              {filters.map((filter) => (
                <button
                  aria-pressed={category === filter.value}
                  className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${category === filter.value ? 'bg-forest text-ivory' : 'border border-sand bg-white text-muted hover:text-forest'}`}
                  key={filter.value}
                  onClick={() => setCategory(filter.value)}
                  type="button"
                >
                  {t.gallery.filters[filter.label]}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted">{t.gallery.index.resultCount.replace('{count}', String(filtered.length))}</p>
          </Reveal>
          {filtered.length ? (
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
              {filtered.map((item, index) => (
                <Reveal className="mb-3 break-inside-avoid" delay={index * 0.02} key={item.id}>
                  <button
                    aria-label={`${t.gallery.lightbox.open}: ${localize(item.image.alt)}`}
                    className="group relative block w-full overflow-hidden rounded-[1.75rem] text-left"
                    onClick={() => setLightboxIndex(index)}
                    type="button"
                  >
                    <img
                      alt={localize(item.image.alt)}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      src={`/images/photography/${item.id}-768.webp`}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-sand bg-white p-10 text-center">
              <h2 className="display-title text-4xl text-forest">{t.gallery.empty.title}</h2>
              <p className="mt-3 text-muted">{t.gallery.empty.description}</p>
            </div>
          )}
        </div>
      </section>
      <Lightbox
        index={lightboxIndex}
        items={filtered}
        labels={{ close: t.gallery.lightbox.close, previous: t.gallery.lightbox.previous, next: t.gallery.lightbox.next, dialog: t.gallery.lightbox.imageLabel }}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  )
}
