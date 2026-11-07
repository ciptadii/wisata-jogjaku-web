import { HelmetProvider } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import { LanguageProvider } from '../../i18n/LanguageContext'
import { ScrollManager } from './ScrollManager'
import { Footer } from './Footer'
import { Header } from './Header'
import { FloatingWhatsApp } from './FloatingWhatsApp'

export function Layout() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ScrollManager />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </LanguageProvider>
    </HelmetProvider>
  )
}
