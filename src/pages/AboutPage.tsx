import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { routePath } from '../data/navigation'
import { contactLink } from '../utils/whatsapp'
import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SEO } from '../components/ui/SEO'

export function AboutPage() {
  const { language, t } = useLanguage()

  return (
    <>
      <SEO title={`${t.about.meta.title} | Wisata Jogjaku`} description={t.about.meta.description} />
      <PageHero
        eyebrow={t.about.hero.eyebrow}
        title={t.about.hero.title}
        description={t.about.hero.description}
        image="/images/photography/jogja-landscape-1280.webp"
      />
      <section className="section-space bg-ivory" id="tentang-kami">
        <div className="site-container">
          <Reveal>
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-sand bg-white p-8 shadow-soft sm:p-10 lg:p-12">
              <p className="mb-5 text-xs font-bold tracking-[0.24em] text-clay uppercase">{t.about.content.sectionLabel}</p>
              <h2 className="display-title text-[clamp(2.25rem,4vw,3.75rem)] text-forest">{t.about.content.title}</h2>
              <p className="mt-6 editorial-copy text-base text-muted sm:text-lg">{t.about.content.intro}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.about.content.points.map((point) => (
                  <li className="flex items-start gap-3 rounded-[1.25rem] bg-sand-light p-4" key={point}>
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-terracotta" size={20} />
                    <span className="leading-relaxed text-charcoal">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 editorial-copy text-base text-muted sm:text-lg">{t.about.content.closing}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={contactLink(language)} variant="whatsapp">
                  {t.about.values.cta}
                </ButtonLink>
                <ButtonLink to={routePath('packages', language)} variant="secondary">
                  {t.nav.packages}
                </ButtonLink>
                <ButtonLink to={routePath('rental', language)} variant="secondary">
                  {t.nav.rental}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
