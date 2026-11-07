import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigationLabels, routePath, type RouteKey } from '../../data/navigation'
import { useLanguage } from '../../i18n/LanguageContext'
import { contactLink } from '../../utils/whatsapp'
import { ButtonLink } from '../ui/Button'
import { ResponsiveImage } from '../ui/ResponsiveImage'
import { logoImage } from '../../utils/media'

const navKeys: RouteKey[] = ['home', 'about', 'packages', 'rental', 'gallery', 'blog', 'contact']

export function Header() {
  const { language, t, localize } = useLanguage()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const logo = logoImage(true)

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ivory/95 shadow-soft backdrop-blur-md' : 'bg-transparent'}`}>
      <a className="skip-link" href="#main-content">{t.header.skipToContent}</a>
      <div className="site-container flex items-center justify-between gap-6 py-4">
        <Link aria-label="Wisata Jogjaku" to={routePath('home', language)}>
          <ResponsiveImage className="h-9 w-auto" image={logo} sizes="160px" eager />
        </Link>
        <nav aria-label={t.header.navigationLabel} className="hidden items-center gap-8 lg:flex">
          {navKeys.map((key) => (
            <NavLink
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? (scrolled ? 'text-forest' : 'text-ivory') : scrolled ? 'text-muted hover:text-forest' : 'text-ivory/75 hover:text-ivory'}`}
              key={key}
              to={routePath(key, language)}
            >
              {localize(navigationLabels[key])}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            aria-label={language === 'id' ? t.header.switchToEn : t.header.switchToId}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors ${scrolled ? 'border-sand text-forest hover:bg-sand-light' : 'border-ivory/25 text-ivory hover:bg-ivory/10'}`}
            to={useLanguage().switchPath}
          >
            {language === 'id' ? (
              <svg aria-hidden="true" className="overflow-hidden rounded-[2px]" height="14" viewBox="0 0 60 30" width="20">
                <rect fill="#012169" height="30" width="60" />
                <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
                <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="4" />
                <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
                <path d="M30,0v30M0,15h60" stroke="#C8102E" strokeWidth="6" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="overflow-hidden rounded-[2px]" height="14" viewBox="0 0 3 2" width="20">
                <rect fill="#CE1126" height="1" width="3" />
                <rect fill="#FFFFFF" height="1" width="3" y="1" />
              </svg>
            )}
            <span>{language === 'id' ? 'EN' : 'ID'}</span>
          </Link>
          <ButtonLink href={contactLink(language)} showWhatsappIcon variant={scrolled ? 'whatsapp' : 'light'}>
            {t.common.contactUs}
          </ButtonLink>
        </div>
        <button
          aria-expanded={open}
          aria-label={open ? t.header.closeMenu : t.header.openMenu}
          className={`inline-grid size-11 place-items-center rounded-full lg:hidden ${scrolled ? 'text-forest' : 'text-ivory'}`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 bg-forest/40 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <div className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-ivory px-6 pb-10 pt-6 transition-transform duration-500 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="mb-8 flex items-center justify-between">
          <ResponsiveImage className="h-9 w-auto" image={logoImage(true)} sizes="160px" />
          <button aria-label={t.header.closeMenu} className="inline-grid size-11 place-items-center rounded-full text-forest" onClick={() => setOpen(false)} type="button">
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <nav aria-label={t.header.navigationLabel} className="flex flex-col gap-4">
          {navKeys.map((key) => (
            <NavLink className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-forest' : 'text-muted'}`} key={key} to={routePath(key, language)}>
              {localize(navigationLabels[key])}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <Link className="text-sm font-semibold text-forest" to={useLanguage().switchPath}>
            {language === 'id' ? t.header.switchToEn : t.header.switchToId}
          </Link>
          <ButtonLink href={contactLink(language)} variant="whatsapp">{t.common.contactUs}</ButtonLink>
        </div>
      </div>
    </header>
  )
}
