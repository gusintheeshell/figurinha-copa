import type { Sticker, StickerSort } from '../types'

function parseStickerNumber(number: string) {
  const match = number.match(/(\d+)$/)
  return match ? Number.parseInt(match[1], 10) : 0
}

export function sortStickers(stickers: Sticker[], sort: StickerSort): Sticker[] {
  if (sort === 'album') {
    return stickers
  }

  return [...stickers].sort(
    (left, right) => parseStickerNumber(left.number) - parseStickerNumber(right.number),
  )
}

export function teamHasTradeStickers(stickers: Sticker[]) {
  return stickers.some((sticker) => sticker.quantity === 0 || sticker.quantity > 1)
}
