import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { GalleryItem } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'
import { ResponsiveImage } from './ResponsiveImage'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
  labels: {
    close: string
    previous: string
    next: string
    dialog: string
  }
}

export function Lightbox({ items, index, onChange, onClose, labels }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { localize } = useLanguage()
  const isOpen = index !== null
  const currentIndex = index ?? 0

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onChange((currentIndex - 1 + items.length) % items.length)
      if (event.key === 'ArrowRight') onChange((currentIndex + 1) % items.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex, isOpen, items.length, onChange])

  const item = index === null ? null : items[index]

  return (
    <dialog
      aria-label={labels.dialog}
      className="h-screen max-h-none w-screen max-w-none bg-forest-deep/95 p-0 text-ivory backdrop:bg-forest-deep/85"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      {item && (
        <div className="relative flex h-full flex-col items-center justify-center p-4 pt-20 pb-16 sm:p-16 sm:pt-20">
          <button
            aria-label={labels.close}
            className="absolute top-4 right-4 inline-grid size-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-forest sm:top-6 sm:right-6"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={22} />
          </button>
          <ResponsiveImage
            className="max-h-[75vh] w-auto max-w-full object-contain"
            image={item.image}
            sizes="100vw"
            eager
          />
          <p className="mt-4 text-center text-sm text-ivory/70">{localize(item.image.alt)}</p>
          <div className="absolute bottom-4 flex items-center gap-3 sm:bottom-6">
            <button
              aria-label={labels.previous}
              className="inline-grid size-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-forest"
              onClick={() => onChange((currentIndex - 1 + items.length) % items.length)}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={22} />
            </button>
            <span aria-live="polite" className="min-w-16 text-center text-sm text-ivory/65">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              aria-label={labels.next}
              className="inline-grid size-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-forest"
              onClick={() => onChange((currentIndex + 1) % items.length)}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={22} />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
