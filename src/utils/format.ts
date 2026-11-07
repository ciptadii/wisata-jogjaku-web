export const formatIDR = (value: number, language: 'id' | 'en'): string => {
  const formatted = new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

  return language === 'en' ? formatted.replace('IDR', 'Rp') : formatted
}

export const formatDate = (date: string, language: 'id' | 'en'): string => {
  const parsed = new Date(date)

  return new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

export const readingTime = (content: string): number => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
