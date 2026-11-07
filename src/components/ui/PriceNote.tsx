import { Info } from 'lucide-react'

export function PriceNote({ children, inverse = false }: { children: string; inverse?: boolean }) {
  return (
    <p className={`flex max-w-3xl items-start gap-2.5 text-xs leading-relaxed ${inverse ? 'text-ivory/60' : 'text-muted'}`}>
      <Info aria-hidden="true" className="mt-0.5 shrink-0" size={15} />
      <span>{children}</span>
    </p>
  )
}
