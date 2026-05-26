import { useMemo } from 'react'
import type { Sticker, StickerStats, Team } from '../types'

function computeStats(stickers: Sticker[]): StickerStats {
  const total = stickers.length
  const owned = stickers.filter((sticker) => sticker.quantity > 0).length
  const missing = total - owned
  const duplicates = stickers.reduce(
    (sum, sticker) => sum + Math.max(0, sticker.quantity - 1),
    0,
  )
  const percent = total === 0 ? 0 : Math.round((owned / total) * 100)

  return { total, owned, missing, duplicates, percent }
}

export function useStickerStats(teams: Team[]) {
  return useMemo(() => {
    const allStickers = teams.flatMap((team) => team.stickers)
    const global = computeStats(allStickers)
    const byTeam = Object.fromEntries(
      teams.map((team) => [team.id, computeStats(team.stickers)]),
    ) as Record<string, StickerStats>

    return { global, byTeam }
  }, [teams])
}

export function filterStickers(
  stickers: Sticker[],
  filter: 'all' | 'missing' | 'duplicates' | 'trade',
): Sticker[] {
  switch (filter) {
    case 'missing':
      return stickers.filter((sticker) => sticker.quantity === 0)
    case 'duplicates':
      return stickers.filter((sticker) => sticker.quantity > 1)
    case 'trade':
      return stickers.filter(
        (sticker) => sticker.quantity === 0 || sticker.quantity > 1,
      )
    default:
      return stickers
  }
}
