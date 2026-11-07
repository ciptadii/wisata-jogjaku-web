import { useLanguage } from '../i18n/LanguageContext'
import { photographyImage } from '../utils/media'
import { routePath } from '../data/navigation'
import { tourPackages } from '../data/packages'
import { vehicles } from '../data/vehicles'
import { contactLink } from '../utils/whatsapp'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

export function AboutPage() {
  const { language, t, localize } = useLanguage()
  const introImage = photographyImage('destination-02', { id: 'Perjalanan wisata bersama Wisata Jogjaku', en: 'Tour journey with Wisata Jogjaku' })

  return (
    <>
      <SEO title={`${t.about.meta.title} | Wisata Jogjaku`} description={t.about.meta.description} />
      <PageHero eyebrow={t.about.hero.eyebrow} title={t.about.hero.title} description={t.about.hero.description} image="/images/photography/destination-01-1280.webp" />
      <section className="section-space bg-ivory">
        <div className="site-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <img alt={localize(introImage.alt)} className="aspect-[4/5] w-full object-cover rounded-[2rem]" src="/images/photography/destination-02-1280.webp" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow={t.about.services.eyebrow} title={t.about.services.title} />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-[1.75rem] border border-sand bg-white p-7">
                <h2 className="display-title text-3xl text-forest">{t.about.services.packagesTitle}</h2>
                <p className="mt-4 leading-relaxed text-muted">{t.about.services.packagesDescription}</p>
                <p className="mt-4 text-sm font-semibold text-forest">{tourPackages.length} {t.home.categories.packageCount.replace('{count}', '')}</p>
                <ButtonLink to={routePath('packages', language)} variant="primary" className="mt-6">{t.nav.packages}</ButtonLink>
              </div>
              <div className="rounded-[1.75rem] border border-sand bg-white p-7">
                <h2 className="display-title text-3xl text-forest">{t.about.services.rentalTitle}</h2>
                <p className="mt-4 leading-relaxed text-muted">{t.about.services.rentalDescription}</p>
                <p className="mt-4 text-sm font-semibold text-forest">{vehicles.length} {t.rental.index.resultCount.replace('{count}', '')}</p>
                <ButtonLink to={routePath('rental', language)} variant="primary" className="mt-6">{t.nav.rental}</ButtonLink>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={contactLink(language)} variant="whatsapp">{t.about.values.cta}</ButtonLink>
              <ButtonLink to={routePath('contact', language)} variant="secondary">{t.common.contactUs}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading align="center" eyebrow={t.about.values.eyebrow} title={t.about.values.title} description={t.about.values.description} />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href={contactLink(language)} variant="whatsapp">{t.about.values.cta}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
