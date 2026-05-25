import { filterStickers } from '../../hooks'
import { useTranslation } from '@/lib/i18n'
import { useStickersStore } from '../../stores'
import type { Team } from '../../types'
import { StickerTile } from '../StickerTile'

interface StickerGridProps {
  team: Team
}

export function StickerGrid({ team }: StickerGridProps) {
  const { t } = useTranslation()
  const filter = useStickersStore((state) => state.filter)
  const visibleStickers = filterStickers(team.stickers, filter)

  if (visibleStickers.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-gruvbox-fgMuted">
        {t('grid.empty')}
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
