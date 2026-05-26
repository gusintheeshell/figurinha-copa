import { useCallback, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

interface UseLongPressOptions {
  onClick?: () => void
  onLongPress?: () => void
  onSwipeUp?: () => void
  delay?: number
  moveThreshold?: number
  swipeThreshold?: number
}

export function useLongPress({
  onClick,
  onLongPress,
  onSwipeUp,
  delay = 500,
  moveThreshold = 10,
  swipeThreshold = 48,
}: UseLongPressOptions) {
  const timerRef = useRef<number | null>(null)
  const longPressTriggeredRef = useRef(false)
  const startRef = useRef<{ x: number; y: number } | null>(null)
  const movedRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(
    (event: ReactPointerEvent) => {
      longPressTriggeredRef.current = false
      movedRef.current = false
      startRef.current = { x: event.clientX, y: event.clientY }
      clearTimer()

      timerRef.current = window.setTimeout(() => {
        if (!movedRef.current) {
          longPressTriggeredRef.current = true
          onLongPress?.()
        }
      }, delay)
    },
    [clearTimer, delay, onLongPress],
  )

  const move = useCallback(
    (event: ReactPointerEvent) => {
      if (!startRef.current) {
        return
      }

      const dx = event.clientX - startRef.current.x
      const dy = event.clientY - startRef.current.y

      if (Math.abs(dx) > moveThreshold || Math.abs(dy) > moveThreshold) {
        movedRef.current = true
        clearTimer()
      }
    },
    [clearTimer, moveThreshold],
  )

  const cancel = useCallback(() => {
    clearTimer()
    startRef.current = null
  }, [clearTimer])

  const end = useCallback(
    (event: ReactPointerEvent) => {
      clearTimer()

      if (longPressTriggeredRef.current) {
        startRef.current = null
        return
      }

      if (startRef.current) {
        const dx = event.clientX - startRef.current.x
        const dy = event.clientY - startRef.current.y
        const absX = Math.abs(dx)
        const absY = Math.abs(dy)

        if (
          onSwipeUp &&
          dy <= -swipeThreshold &&
          absY > absX &&
          absY >= swipeThreshold
        ) {
          onSwipeUp()
          startRef.current = null
          return
        }
      }

      if (!movedRef.current) {
        onClick?.()
      }

      startRef.current = null
    },
    [clearTimer, onClick, onSwipeUp, swipeThreshold],
  )

  return {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
  }
}
