import { MapPin, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navigationLabels, routePath, type RouteKey } from '../../data/navigation'
import { getCurrentYear, siteConfig } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'
import { contactLink } from '../../utils/whatsapp'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { logoImage } from '../../utils/media'

const navKeys: RouteKey[] = ['home', 'about', 'packages', 'rental', 'gallery', 'blog', 'contact']

export function Footer() {
  const { language, t, localize } = useLanguage()
  const year = getCurrentYear()
  const logo = logoImage(false)

  return (
    <footer className="bg-forest-deep text-ivory">
      <div className="site-container section-space">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <ResponsiveImage className="mb-6 h-10 w-auto" image={logo} sizes="180px" />
            <p className="mb-4 max-w-md text-ivory/75">{t.footer.description}</p>
            <p className="text-sm text-ivory/60">{t.footer.tagline}</p>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold tracking-[0.2em] uppercase text-sand">{t.footer.navigationTitle}</p>
            <ul className="flex flex-col gap-3">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link className="text-ivory/80 transition-colors hover:text-ivory" to={routePath(key, language)}>
                    {localize(navigationLabels[key])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold tracking-[0.2em] uppercase text-sand">{t.footer.servicesTitle}</p>
            <ul className="flex flex-col gap-3 text-ivory/80">
              <li><Link className="transition-colors hover:text-ivory" to={routePath('packages', language)}>{t.nav.packages}</Link></li>
              <li><Link className="transition-colors hover:text-ivory" to={routePath('rental', language)}>{t.nav.rental}</Link></li>
              <li><Link className="transition-colors hover:text-ivory" to={routePath('gallery', language)}>{t.nav.gallery}</Link></li>
              <li><Link className="transition-colors hover:text-ivory" to={routePath('blog', language)}>{t.nav.blog}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold tracking-[0.2em] uppercase text-sand">{t.footer.contactTitle}</p>
            <ul className="flex flex-col gap-4 text-sm text-ivory/80">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5" size={18} />
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-ivory/50">{t.footer.addressLabel}</p>
                  <p className="max-w-xs leading-relaxed">{siteConfig.address}</p>
                  <a className="mt-2 inline-flex items-center gap-2 text-ivory transition-colors hover:text-sand" href={siteConfig.mapsUrl} rel="noreferrer" target="_blank">
                    {t.footer.mapsCta}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle aria-hidden="true" className="mt-0.5" size={18} />
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.16em] text-ivory/50">{t.footer.whatsappLabel}</p>
                  <a className="transition-colors hover:text-ivory" href={contactLink(language)} rel="noreferrer" target="_blank">{siteConfig.whatsappDisplay}</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.88 1.75a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" fill="currentColor"/></svg>
                <a className="transition-colors hover:text-ivory" href={siteConfig.social.instagram} rel="noreferrer" target="_blank">@wisatajogjaku_</a>
              </li>
              <li className="flex items-center gap-3">
                <svg aria-hidden="true" height="18" viewBox="0 0 24 24" width="18">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor" />
                </svg>
                <a className="transition-colors hover:text-ivory" href={siteConfig.social.tiktok} rel="noreferrer" target="_blank">@wisatajogjaku</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/10 pt-6 text-sm text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright.replace('{year}', String(year))}</p>
        </div>
      </div>
    </footer>
  )
}
