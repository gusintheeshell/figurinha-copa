import { useCallback, useRef } from 'react'

interface UseLongPressOptions {
  onClick?: () => void
  onLongPress?: () => void
  delay?: number
}

export function useLongPress({
  onClick,
  onLongPress,
  delay = 500,
}: UseLongPressOptions) {
  const timerRef = useRef<number | null>(null)
  const longPressTriggeredRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    longPressTriggeredRef.current = false
    clearTimer()

    timerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true
      onLongPress?.()
    }, delay)
  }, [clearTimer, delay, onLongPress])

  const cancel = useCallback(() => {
    clearTimer()
  }, [clearTimer])

  const end = useCallback(() => {
    clearTimer()

    if (!longPressTriggeredRef.current) {
      onClick?.()
    }
  }, [clearTimer, onClick])

  return {
    onPointerDown: start,
    onPointerUp: end,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
  }
}
