import { MessageCircle } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { contactLink } from '../../utils/whatsapp'

export function FloatingWhatsApp() {
  const { language, t } = useLanguage()

  return (
    <a
      aria-label={t.common.contactUs}
      className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory shadow-lift transition-transform duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6"
      href={contactLink(language)}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={18} />
      <span className="hidden sm:inline">{t.common.whatsapp}</span>
    </a>
  )
}
