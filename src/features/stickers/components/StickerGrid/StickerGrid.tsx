import { filterStickers } from '../../hooks'
import { useTranslation } from '@/lib/i18n'
import { useStickersStore } from '../../stores'
import type { Team } from '../../types'
import { sortStickers } from '../../utils/sortStickers'
import { StickerTile } from '../StickerTile'

interface StickerGridProps {
  team: Team
}

export function StickerGrid({ team }: StickerGridProps) {
  const { t } = useTranslation()
  const filter = useStickersStore((state) => state.filter)
  const sort = useStickersStore((state) => state.sort)
  const tradeMode = useStickersStore((state) => state.tradeMode)
  const focusedSticker = useStickersStore((state) => state.focusedSticker)
  const effectiveFilter = tradeMode ? 'trade' : filter

  let visibleStickers = filterStickers(team.stickers, effectiveFilter)

  if (focusedSticker?.teamId === team.id) {
    const focused = team.stickers.find((sticker) => sticker.id === focusedSticker.stickerId)

    if (focused && !visibleStickers.some((sticker) => sticker.id === focused.id)) {
      visibleStickers = [...visibleStickers, focused]
    }
  }

  visibleStickers = sortStickers(visibleStickers, sort)

  if (visibleStickers.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gruvbox-fgMuted">
        {tradeMode ? t('grid.emptyTrade') : t('grid.empty')}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
      {visibleStickers.map((sticker) => (
        <StickerTile key={sticker.id} teamId={team.id} sticker={sticker} />
      ))}
    </div>
  )
}
