import { useEffect, useState } from 'react'
import { Button, QuantityStepper } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { useLongPress } from '../../hooks'
import { useStickersStore } from '../../stores'
import type { Sticker } from '../../types'

interface StickerTileProps {
  teamId: string
  sticker: Sticker
}

export function StickerTile({ teamId, sticker }: StickerTileProps) {
  const { t } = useTranslation()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const toggleOwned = useStickersStore((state) => state.toggleOwned)
  const increment = useStickersStore((state) => state.increment)
  const decrement = useStickersStore((state) => state.decrement)
  const setQuantity = useStickersStore((state) => state.setQuantity)

  const longPressHandlers = useLongPress({
    onClick: () => toggleOwned(teamId, sticker.id),
    onLongPress: () => setIsEditorOpen(true),
  })

  useEffect(() => {
    if (!isEditorOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditorOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditorOpen])

  const isOwned = sticker.quantity > 0
  const isDuplicate = sticker.quantity > 1

  let tileClasses =
    'relative flex aspect-square min-h-11 items-center justify-center rounded-xl border text-xs font-semibold transition active:scale-[0.97] select-none sm:text-sm'

  if (isDuplicate) {
    tileClasses += ' border-gruvbox-orange bg-gruvbox-orange/80 text-gruvbox-bg'
  } else if (isOwned) {
    tileClasses += ' border-gruvbox-green bg-gruvbox-green/80 text-gruvbox-bg'
  } else {
    tileClasses +=
      ' border-dashed border-gruvbox-bg2 bg-gruvbox-bg1 text-gruvbox-fgMuted'
  }

  return (
    <>
      <button
        type="button"
        aria-pressed={isOwned}
        aria-label={t('sticker.ariaLabel', { number: sticker.number })}
        className={tileClasses}
        {...longPressHandlers}
      >
        <span className="truncate px-0.5 text-[10px] font-bold leading-none sm:text-xs">
          {sticker.number}
        </span>
        {isDuplicate ? (
          <span className="absolute right-1 top-1 rounded-md bg-gruvbox-bg/80 px-1 text-[10px] font-bold text-gruvbox-fg">
            x{sticker.quantity}
          </span>
        ) : null}
      </button>

      {isEditorOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4"
          onClick={() => setIsEditorOpen(false)}
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
              <Button variant="ghost" onClick={() => setIsEditorOpen(false)}>
                {t('sticker.close')}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setQuantity(teamId, sticker.id, 0)
                  setIsEditorOpen(false)
                }}
              >
                {t('sticker.remove')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
