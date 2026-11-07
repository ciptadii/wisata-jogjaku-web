import type { Testimonial } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { localize } = useLanguage()

  return (
    <figure className="relative flex h-full flex-col justify-between rounded-[1.75rem] border border-sand bg-white p-8 shadow-soft">
      <div>
        <p className="mb-6 text-4xl leading-none text-sand">“</p>
        <blockquote className="text-lg leading-relaxed text-forest">{localize(testimonial.quote)}</blockquote>
      </div>
      <figcaption className="mt-8 text-sm text-muted">
        <p>Wisata Jogjaku</p>
      </figcaption>
    </figure>
  )
}
