import { useTranslation } from '@/lib/i18n'
import { StickerEditor } from '../StickerEditor'
import { useStickerInteractions } from '../../hooks/useStickerInteractions'
import type { Sticker } from '../../types'

interface StickerTileProps {
  teamId: string
  sticker: Sticker
}

export function StickerTile({ teamId, sticker }: StickerTileProps) {
  const { t } = useTranslation()
  const {
    isEditorOpen,
    setIsEditorOpen,
    isOwned,
    isDuplicate,
    classes,
    longPressHandlers,
  } = useStickerInteractions({ teamId, sticker })

  return (
    <>
      <button
        type="button"
        id={`sticker-${sticker.id}`}
        aria-pressed={isOwned}
        aria-label={t('sticker.ariaLabel', { number: sticker.number })}
        className={`relative flex aspect-square min-h-11 items-center justify-center rounded-xl text-xs font-semibold scroll-mt-28 sm:text-sm ${classes}`}
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

      <StickerEditor
        teamId={teamId}
        sticker={sticker}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  )
}
