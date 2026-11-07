import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { siteConfig } from '../../data/site'

interface SEOProps {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SEO({ title, description, image = '/images/photography/jogja-landscape-1280.webp', type = 'website', jsonLd }: SEOProps) {
  const { pathname } = useLocation()
  const { language, switchPath } = useLanguage()
  const canonical = `${siteConfig.siteUrl}${pathname === '/en' ? '/en/' : pathname}`
  const currentPath = pathname === '/en' ? '/en/' : pathname
  const alternatePath = switchPath
  const idPath = language === 'id' ? currentPath : alternatePath
  const enPath = language === 'en' ? currentPath : alternatePath
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="id" href={`${siteConfig.siteUrl}${idPath}`} />
      <link rel="alternate" hrefLang="en" href={`${siteConfig.siteUrl}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteConfig.siteUrl}${idPath}`} />
      <meta property="og:locale" content={language === 'id' ? 'id_ID' : 'en_US'} />
      <meta property="og:site_name" content="Wisata Jogjaku" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteConfig.siteUrl}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  )
}
