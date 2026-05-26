import type { Sticker } from '../types'

export function getStickerVisualClasses(sticker: Sticker, options?: { focused?: boolean }) {
  const isOwned = sticker.quantity > 0
  const isDuplicate = sticker.quantity > 1

  let classes = 'relative border transition active:scale-[0.97] select-none touch-manipulation'

  if (options?.focused) {
    classes += ' z-10 scale-105 border-gruvbox-yellow ring-2 ring-gruvbox-yellow'
  } else if (isDuplicate) {
    classes += ' border-gruvbox-orange bg-gruvbox-orange/80 text-gruvbox-bg'
  } else if (isOwned) {
    classes += ' border-gruvbox-green bg-gruvbox-green/80 text-gruvbox-bg'
  } else {
    classes +=
      ' border-dashed border-gruvbox-bg2 bg-gruvbox-bg1 text-gruvbox-fgMuted'
  }

  return { classes, isOwned, isDuplicate }
}
