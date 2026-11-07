import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  inverse?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <Reveal className={`${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <p className={`mb-4 text-xs font-bold tracking-[0.22em] uppercase ${inverse ? 'text-sand' : 'text-clay'}`}>
        {eyebrow}
      </p>
      <h2 className={`display-title text-balance text-[clamp(2.5rem,5vw,4.75rem)] ${inverse ? 'text-ivory' : 'text-forest'}`}>
        {title}
      </h2>
      {description && (
        <p className={`editorial-copy mt-6 text-[0.98rem] ${align === 'center' ? 'mx-auto' : ''} ${inverse ? 'text-ivory/70' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
