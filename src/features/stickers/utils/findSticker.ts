import type { Sticker, Team } from '../types'

export interface StickerMatch {
  teamId: string
  stickerId: string
  sticker: Sticker
  team: Team
}

export function normalizeStickerQuery(query: string) {
  return query.trim().toUpperCase().replace(/\s+/g, '')
}

export function findSticker(teams: Team[], rawQuery: string): StickerMatch | null {
  const query = normalizeStickerQuery(rawQuery)

  if (!query) {
    return null
  }

  for (const team of teams) {
    for (const sticker of team.stickers) {
      if (sticker.number.toUpperCase() === query) {
        return { teamId: team.id, stickerId: sticker.id, sticker, team }
      }
    }
  }

  return null
}
