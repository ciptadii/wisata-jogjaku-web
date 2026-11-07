export function PageLoader({ label }: { label: string }) {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-ivory" role="status">
      <div className="flex items-center gap-3 text-sm font-semibold text-forest">
        <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-terracotta" />
        {label}
      </div>
    </div>
  )
}
