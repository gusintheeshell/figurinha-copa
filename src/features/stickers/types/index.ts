import type { GroupKey } from '../data/teams'

export interface Sticker {
  id: string
  number: string
  quantity: number
}

export interface Team {
  id: string
  groupKey: GroupKey
  stickers: Sticker[]
}

export type StickerFilter = 'all' | 'missing' | 'duplicates' | 'trade'

export type StickerSort = 'album' | 'number'

export interface StickerStats {
  total: number
  owned: number
  missing: number
  duplicates: number
  percent: number
}
