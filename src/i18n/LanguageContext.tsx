import { createContext, useCallback, useContext, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getBlogAlternate, getBlogPost } from '../data/blog'
import { blogPath, categoryPath, packagePath, routePath } from '../data/navigation'
import type { RouteKey } from '../data/navigation'
import type { Language, LocalizedText } from '../types'
import { en } from './en'
import { id } from './id'
import type { Dictionary } from './types'

interface LanguageContextValue {
  language: Language
  t: Dictionary
  localize: (text: LocalizedText) => string
  switchPath: string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const routeKeys: RouteKey[] = ['home', 'about', 'packages', 'rental', 'gallery', 'blog', 'contact']

export function getLanguageSwitchPath(pathname: string, from: Language) {
  const to: Language = from === 'id' ? 'en' : 'id'

  for (const key of routeKeys) {
    if (pathname === routePath(key, from)) return routePath(key, to)
  }

  for (const days of [1, 2, 3] as const) {
    if (pathname === categoryPath(days, from)) return categoryPath(days, to)
  }

  const packageMatch = pathname.match(from === 'id' ? /^\/paket-wisata\/([^/]+)\/?$/ : /^\/en\/tour-packages\/([^/]+)\/?$/)
  if (packageMatch) return packagePath(packageMatch[1], to)

  const blogMatch = pathname.match(from === 'id' ? /^\/blog\/([^/]+)\/?$/ : /^\/en\/blog\/([^/]+)\/?$/)
  if (blogMatch) {
    const currentPost = getBlogPost(blogMatch[1], from)
    if (currentPost) {
      const translated = getBlogAlternate(currentPost.translationKey, to)
      if (translated) return blogPath(translated.slug, to)
    }
  }

  return routePath('home', to)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const language: Language = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'id'

  useLayoutEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const localize = useCallback((text: LocalizedText) => text[language], [language])

  const value: LanguageContextValue = {
    language,
    t: language === 'id' ? id : en,
    localize,
    switchPath: getLanguageSwitchPath(pathname, language),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
