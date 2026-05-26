import { useEffect } from 'react'
import { Button, QuantityStepper } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { useStickersStore } from '../../stores'
import type { Sticker } from '../../types'

interface StickerEditorProps {
  teamId: string
  sticker: Sticker
  isOpen: boolean
  onClose: () => void
}

export function StickerEditor({
  teamId,
  sticker,
  isOpen,
  onClose,
}: StickerEditorProps) {
  const { t } = useTranslation()
  const increment = useStickersStore((state) => state.increment)
  const decrement = useStickersStore((state) => state.decrement)
  const setQuantity = useStickersStore((state) => state.setQuantity)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('sticker.editAriaLabel', { number: sticker.number })}
        className="w-full max-w-sm rounded-2xl border border-gruvbox-bg2 bg-gruvbox-bg1 p-4 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 text-center">
          <p className="text-sm text-gruvbox-fgMuted">{t('sticker.label')}</p>
          <p className="text-xl font-bold text-gruvbox-fg">{sticker.number}</p>
        </div>

        <QuantityStepper
          value={sticker.quantity}
          onIncrement={() => increment(teamId, sticker.id)}
          onDecrement={() => decrement(teamId, sticker.id)}
        />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="ghost" onClick={onClose}>
            {t('sticker.close')}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setQuantity(teamId, sticker.id, 0)
              onClose()
            }}
          >
            {t('sticker.remove')}
          </Button>
        </div>
      </div>
    </div>
  )
}
