import { useState } from 'react'
import { useLongPress } from './useLongPress'
import { useStickersStore } from '../stores'
import type { Sticker } from '../types'
import { getStickerVisualClasses } from '../utils/stickerStyles'

interface UseStickerInteractionsOptions {
  teamId: string
  sticker: Sticker
}

export function useStickerInteractions({ teamId, sticker }: UseStickerInteractionsOptions) {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const toggleOwned = useStickersStore((state) => state.toggleOwned)
  const focusedSticker = useStickersStore((state) => state.focusedSticker)
  const isFocused = focusedSticker?.stickerId === sticker.id
  const { classes, isOwned, isDuplicate } = getStickerVisualClasses(sticker, {
    focused: isFocused,
  })

  const longPressHandlers = useLongPress({
    onClick: () => toggleOwned(teamId, sticker.id),
    onLongPress: () => setIsEditorOpen(true),
    onSwipeUp: () => setIsEditorOpen(true),
  })

  return {
    isEditorOpen,
    setIsEditorOpen,
    isOwned,
    isDuplicate,
    classes,
    longPressHandlers,
  }
}
