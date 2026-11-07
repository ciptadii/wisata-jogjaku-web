import { useLanguage } from '../i18n/LanguageContext'
import { ButtonLink } from '../components/ui/Button'
import { routePath } from '../data/navigation'
import { contactLink } from '../utils/whatsapp'
import { SEO } from '../components/ui/SEO'

export function NotFoundPage() {
  const { language, t } = useLanguage()

  return (
    <div className="grid min-h-screen place-items-center bg-ivory px-6 text-center">
      <SEO title={`${t.notFound.title} | Wisata Jogjaku`} description={t.notFound.description} />
      <div>
        <p className="mb-4 text-xs font-bold tracking-[0.24em] text-clay uppercase">404</p>
        <h1 className="display-title text-[clamp(3rem,8vw,6rem)] text-forest">{t.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{t.notFound.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to={routePath('home', language)}>{t.notFound.backHome}</ButtonLink>
          <ButtonLink href={contactLink(language)} variant="secondary">{t.notFound.contact}</ButtonLink>
        </div>
      </div>
    </div>
  )
}
