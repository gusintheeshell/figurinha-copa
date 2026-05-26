import { useTranslation } from '@/lib/i18n'
import { StickerEditor } from '../StickerEditor'
import { useStickerInteractions } from '../../hooks/useStickerInteractions'
import type { Sticker } from '../../types'

interface StickerCarouselSlideProps {
  teamId: string
  sticker: Sticker
}

export function StickerCarouselSlide({ teamId, sticker }: StickerCarouselSlideProps) {
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
      <div className="flex h-full w-full shrink-0 snap-center snap-always items-center justify-center px-4">
        <button
          type="button"
          aria-pressed={isOwned}
          aria-label={t('sticker.ariaLabel', { number: sticker.number })}
          className={`flex aspect-[4/5] w-full max-w-sm flex-col items-center justify-center rounded-3xl px-6 py-8 text-center shadow-lg ${classes}`}
          {...longPressHandlers}
        >
          <span className="text-4xl font-bold tracking-tight sm:text-5xl">
            {sticker.number}
          </span>
          <span className="mt-4 text-sm font-medium opacity-90">
            {isDuplicate
              ? t('carousel.duplicate', { count: sticker.quantity })
              : isOwned
                ? t('carousel.owned')
                : t('carousel.missing')}
          </span>
          {isDuplicate ? (
            <span className="absolute right-4 top-4 rounded-lg bg-gruvbox-bg/80 px-2 py-1 text-sm font-bold">
              x{sticker.quantity}
            </span>
          ) : null}
        </button>
      </div>

      <StickerEditor
        teamId={teamId}
        sticker={sticker}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </>
  )
}
