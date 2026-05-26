import { useCallback, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'

interface UseSwipeGestureOptions {
  onSwipe?: (direction: SwipeDirection) => void
  onSwipeDown?: () => void
  onSwipeUp?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
  axis?: 'both' | 'horizontal' | 'vertical'
  disabled?: boolean
  trackVerticalDrag?: boolean
  dragDownOnly?: boolean
}

const LOCK_THRESHOLD = 12

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false
  }

  return target.closest('button, a, input, textarea, select, [role="button"]') !== null
}

export function useSwipeGesture({
  onSwipe,
  onSwipeDown,
  onSwipeUp,
  onSwipeLeft,
  onSwipeRight,
  threshold = 56,
  axis = 'both',
  disabled = false,
  trackVerticalDrag = false,
  dragDownOnly = false,
}: UseSwipeGestureOptions) {
  const startRef = useRef<{ x: number; y: number } | null>(null)
  const directionRef = useRef<'horizontal' | 'vertical' | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const targetRef = useRef<Element | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const releaseCapture = useCallback((event?: ReactPointerEvent) => {
    const target = targetRef.current
    const pointerId = pointerIdRef.current

    if (target && pointerId !== null && target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId)
    }

    if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    pointerIdRef.current = null
    targetRef.current = null
  }, [])

  const reset = useCallback(
    (event?: ReactPointerEvent) => {
      releaseCapture(event)
      startRef.current = null
      directionRef.current = null
      setDragOffset({ x: 0, y: 0 })
      setIsDragging(false)
    },
    [releaseCapture],
  )

  const emitSwipe = useCallback(
    (direction: SwipeDirection) => {
      onSwipe?.(direction)

      if (direction === 'down') {
        onSwipeDown?.()
      } else if (direction === 'up') {
        onSwipeUp?.()
      } else if (direction === 'left') {
        onSwipeLeft?.()
      } else if (direction === 'right') {
        onSwipeRight?.()
      }
    },
    [onSwipe, onSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp],
  )

  const resolveDirection = useCallback(
    (dx: number, dy: number): SwipeDirection | null => {
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      if (absX < threshold && absY < threshold) {
        return null
      }

      if (axis !== 'horizontal' && absY >= absX) {
        return dy > 0 ? 'down' : 'up'
      }

      if (axis !== 'vertical' && absX > absY) {
        return dx > 0 ? 'right' : 'left'
      }

      return null
    },
    [axis, threshold],
  )

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (disabled || isInteractiveTarget(event.target)) {
        return
      }

      startRef.current = { x: event.clientX, y: event.clientY }
      directionRef.current = null
      pointerIdRef.current = event.pointerId
      targetRef.current = event.currentTarget
      setIsDragging(true)
      setDragOffset({ x: 0, y: 0 })
    },
    [disabled],
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      if (!startRef.current || disabled) {
        return
      }

      const dx = event.clientX - startRef.current.x
      const dy = event.clientY - startRef.current.y

      if (!directionRef.current && (Math.abs(dx) > LOCK_THRESHOLD || Math.abs(dy) > LOCK_THRESHOLD)) {
        directionRef.current =
          Math.abs(dy) >= Math.abs(dx) ? 'vertical' : 'horizontal'

        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.setPointerCapture(event.pointerId)
        }
      }

      if (!trackVerticalDrag || directionRef.current !== 'vertical') {
        return
      }

      const nextY = dragDownOnly ? Math.max(0, dy) : dy
      setDragOffset({ x: 0, y: nextY })

      if (dragDownOnly && nextY > 0) {
        event.preventDefault()
      }
    },
    [disabled, dragDownOnly, trackVerticalDrag],
  )

  const onPointerUp = useCallback(
    (event: ReactPointerEvent) => {
      if (!startRef.current || disabled) {
        reset(event)
        return
      }

      const dx = event.clientX - startRef.current.x
      const dy = event.clientY - startRef.current.y
      const direction = resolveDirection(dx, dy)

      if (
        trackVerticalDrag &&
        dragDownOnly &&
        directionRef.current === 'vertical' &&
        dy >= threshold
      ) {
        emitSwipe('down')
      } else if (direction) {
        emitSwipe(direction)
      }

      reset(event)
    },
    [disabled, dragDownOnly, emitSwipe, reset, resolveDirection, threshold, trackVerticalDrag],
  )

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent) => {
      reset(event)
    },
    [reset],
  )

  return {
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
    dragOffset,
    isDragging,
    reset,
  }
}
