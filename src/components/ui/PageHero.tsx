import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routePath } from '../../data/navigation'
import { useLanguage } from '../../i18n/LanguageContext'
import { Reveal } from './Reveal'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  image?: string
}

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  const { language, t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-forest pt-32 pb-20 text-ivory sm:pt-40 sm:pb-28">
      {image && (
        <div className="absolute inset-0 opacity-25">
          <img alt="" className="h-full w-full object-cover" src={image} />
          <div className="absolute inset-0 bg-forest/55" />
        </div>
      )}
      <div className="site-container relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-2 text-xs text-ivory/60">
            <Link className="transition-colors hover:text-ivory" to={routePath('home', language)}>{t.nav.home}</Link>
            <ChevronRight aria-hidden="true" size={13} />
            <span aria-current="page" className="text-ivory">{eyebrow}</span>
          </nav>
          <p className="mb-5 text-xs font-bold tracking-[0.24em] text-sand uppercase">{eyebrow}</p>
          <h1 className="display-title max-w-5xl text-[clamp(3.25rem,8vw,7.5rem)]">{title}</h1>
          <p className="editorial-copy mt-7 text-base text-ivory/75 sm:text-lg">{description}</p>
        </Reveal>
      </div>
    </section>
  )
}
