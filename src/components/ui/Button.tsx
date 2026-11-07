import { ArrowUpRight, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonLinkProps {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'light' | 'ghost' | 'whatsapp'
  className?: string
  showArrow?: boolean
  showWhatsappIcon?: boolean
  onClick?: () => void
  ariaLabel?: string
}

const variants = {
  primary: 'bg-forest text-ivory hover:bg-forest-deep border border-forest',
  secondary: 'bg-transparent text-forest hover:bg-sand-light border border-forest/25',
  light: 'bg-ivory text-forest hover:bg-white border border-ivory',
  ghost: 'bg-transparent text-current hover:bg-current/5 border border-current/30',
  whatsapp: 'bg-forest text-ivory hover:bg-forest-soft border border-forest',
}

export function ButtonLink({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  showArrow = false,
  showWhatsappIcon,
  onClick,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 ${variants[variant]} ${className}`
  const hasWhatsappIcon = showWhatsappIcon ?? variant === 'whatsapp'
  const content = (
    <>
      {hasWhatsappIcon && <MessageCircle aria-hidden="true" size={18} />}
      <span>{children}</span>
      {showArrow && <ArrowUpRight aria-hidden="true" size={17} />}
    </>
  )

  if (to) {
    return <Link aria-label={ariaLabel} className={classes} onClick={onClick} to={to}>{content}</Link>
  }

  return (
    <a
      aria-label={ariaLabel}
      className={classes}
      href={href}
      onClick={onClick}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
      target={href?.startsWith('http') ? '_blank' : undefined}
    >
      {content}
    </a>
  )
}
