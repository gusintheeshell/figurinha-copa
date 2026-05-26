import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { getTeamFlag } from '../../data/teamFlags'
import { filterStickers, useSwipeGesture } from '../../hooks'
import { useStickersStore } from '../../stores'
import type { Team } from '../../types'
import { sortStickers } from '../../utils/sortStickers'
import { StickerCarouselSlide } from '../StickerCarouselSlide'

interface TeamStickerCarouselProps {
  teams: Team[]
}

const DISMISS_THRESHOLD = 120
const EDGE_SWIPE_THRESHOLD = 72

export function TeamStickerCarousel({ teams }: TeamStickerCarouselProps) {
  const { t } = useTranslation()
  const carouselTeamId = useStickersStore((state) => state.carouselTeamId)
  const carouselStickerId = useStickersStore((state) => state.carouselStickerId)
  const closeTeamCarousel = useStickersStore((state) => state.closeTeamCarousel)
  const openTeamCarousel = useStickersStore((state) => state.openTeamCarousel)
  const filter = useStickersStore((state) => state.filter)
  const sort = useStickersStore((state) => state.sort)
  const tradeMode = useStickersStore((state) => state.tradeMode)
  const scrollRef = useRef<HTMLDivElement>(null)
  const edgeSwipeStartRef = useRef<{ x: number; y: number } | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const team = teams.find((item) => item.id === carouselTeamId)
  const teamIndex = teams.findIndex((item) => item.id === carouselTeamId)

  const stickers = useMemo(() => {
    if (!team) {
      return []
    }

    const effectiveFilter = tradeMode ? 'trade' : filter
    return sortStickers(filterStickers(team.stickers, effectiveFilter), sort)
  }, [filter, sort, team, tradeMode])

  const scrollToStickerIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const container = scrollRef.current
      if (!container || stickers.length === 0) {
        return
      }

      const nextIndex = Math.max(0, Math.min(index, stickers.length - 1))
      container.scrollTo({
        left: nextIndex * container.clientWidth,
        behavior,
      })
      setActiveIndex(nextIndex)
    },
    [stickers.length],
  )

  const goToSticker = useCallback(
    (offset: number) => {
      scrollToStickerIndex(activeIndex + offset)
    },
    [activeIndex, scrollToStickerIndex],
  )

  const goToTeam = useCallback(
    (offset: number) => {
      const nextTeam = teams[teamIndex + offset]
      if (nextTeam) {
        openTeamCarousel(nextTeam.id)
      }
    },
    [openTeamCarousel, teamIndex, teams],
  )

  const { handlers: dismissHandlers, dragOffset, isDragging } = useSwipeGesture({
    axis: 'vertical',
    trackVerticalDrag: true,
    dragDownOnly: true,
    threshold: DISMISS_THRESHOLD,
    onSwipeDown: closeTeamCarousel,
  })

  const { handlers: headerSwipeHandlers } = useSwipeGesture({
    axis: 'horizontal',
    threshold: 56,
    onSwipeLeft: () => goToTeam(1),
    onSwipeRight: () => goToTeam(-1),
  })

  useEffect(() => {
    if (!carouselTeamId) {
      return
    }

    scrollRef.current?.focus({ preventScroll: true })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTeamCarousel()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        if (activeIndex > 0) {
          scrollToStickerIndex(activeIndex - 1)
          return
        }

        goToTeam(-1)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (activeIndex < stickers.length - 1) {
          scrollToStickerIndex(activeIndex + 1)
          return
        }

        goToTeam(1)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    activeIndex,
    carouselTeamId,
    closeTeamCarousel,
    goToTeam,
    scrollToStickerIndex,
    stickers.length,
  ])

  useEffect(() => {
    if (!team || !scrollRef.current) {
      return
    }

    const targetIndex = carouselStickerId
      ? stickers.findIndex((sticker) => sticker.id === carouselStickerId)
      : 0

    const index = targetIndex >= 0 ? targetIndex : 0
    scrollToStickerIndex(index, 'auto')
  }, [carouselStickerId, carouselTeamId, scrollToStickerIndex, stickers, team])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || stickers.length === 0) {
      return
    }

    function handleWheel(event: WheelEvent) {
      if (!container) {
        return
      }

      const dominantHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      const delta = dominantHorizontal ? event.deltaX : event.deltaY

      if (delta === 0) {
        return
      }

      event.preventDefault()
      container.scrollLeft += delta
    }

    function handleTouchStart(event: TouchEvent) {
      const touch = event.touches[0]
      edgeSwipeStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    function handleTouchEnd(event: TouchEvent) {
      const start = edgeSwipeStartRef.current
      const touch = event.changedTouches[0]

      if (!start || !touch) {
        return
      }

      const dx = touch.clientX - start.x
      const dy = touch.clientY - start.y

      if (
        Math.abs(dx) < EDGE_SWIPE_THRESHOLD ||
        Math.abs(dx) <= Math.abs(dy)
      ) {
        return
      }

      if (dx > 0 && activeIndex === 0 && teamIndex > 0) {
        goToTeam(-1)
      }

      if (dx < 0 && activeIndex === stickers.length - 1 && teamIndex < teams.length - 1) {
        goToTeam(1)
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIndex, goToTeam, stickers.length, teamIndex, teams.length])

  if (!team || !carouselTeamId) {
    return null
  }

  function handleScroll() {
    const container = scrollRef.current
    if (!container || container.clientWidth === 0) {
      return
    }

    const index = Math.round(container.scrollLeft / container.clientWidth)
    setActiveIndex(index)
  }

  const dismissProgress = Math.min(1, dragOffset.y / DISMISS_THRESHOLD)
  const surfaceStyle = {
    transform: dragOffset.y > 0 ? `translateY(${dragOffset.y}px)` : undefined,
    opacity: dragOffset.y > 0 ? 1 - dismissProgress * 0.4 : undefined,
    transition: isDragging ? 'none' : 'transform 0.25s ease-out, opacity 0.25s ease-out',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-gruvbox-bg/98 backdrop-blur-sm animate-fade-in"
      style={surfaceStyle}
    >
      <div className="touch-pan-y" {...dismissHandlers}>
        <div className="flex justify-center pt-2">
          <div
            aria-hidden
            className={`h-1 rounded-full bg-gruvbox-bg2 transition-all duration-200 ${
              isDragging && dragOffset.y > 0 ? 'w-16 opacity-100' : 'w-10 opacity-70'
            }`}
          />
        </div>

        <header
          className="flex items-center justify-between gap-3 border-b border-gruvbox-bg2 px-3 pb-3 pt-1"
          {...headerSwipeHandlers}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span aria-hidden className="text-3xl leading-none">
              {getTeamFlag(team.id)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold">{t(`teams.${team.id}`)}</p>
              <p className="text-xs text-gruvbox-fgMuted">
                {t('carousel.counter', {
                  current: stickers.length === 0 ? 0 : activeIndex + 1,
                  total: stickers.length,
                })}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={closeTeamCarousel}>
            {t('carousel.close')}
          </Button>
        </header>
      </div>

      {stickers.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-gruvbox-fgMuted">
          {tradeMode ? t('grid.emptyTrade') : t('grid.empty')}
        </div>
      ) : (
        <>
          <div className="relative flex min-h-0 flex-1">
            <Button
              variant="ghost"
              className="absolute left-1 top-1/2 z-10 hidden min-w-10 -translate-y-1/2 px-2 sm:inline-flex md:left-2"
              disabled={activeIndex === 0}
              aria-label={t('carousel.prevSticker')}
              onClick={() => goToSticker(-1)}
            >
              ‹
            </Button>

            <div
              ref={scrollRef}
              tabIndex={0}
              role="region"
              aria-label={t('carousel.stickerNav')}
              onScroll={handleScroll}
              onPointerDown={(event) => event.stopPropagation()}
              className="flex min-h-0 flex-1 touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {stickers.map((sticker) => (
                <StickerCarouselSlide
                  key={sticker.id}
                  teamId={team.id}
                  sticker={sticker}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              className="absolute right-1 top-1/2 z-10 hidden min-w-10 -translate-y-1/2 px-2 sm:inline-flex md:right-2"
              disabled={activeIndex >= stickers.length - 1}
              aria-label={t('carousel.nextSticker')}
              onClick={() => goToSticker(1)}
            >
              ›
            </Button>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-3 py-2">
            {stickers.map((sticker, index) => (
              <button
                key={sticker.id}
                type="button"
                aria-label={t('carousel.goToSticker', { number: sticker.number })}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => scrollToStickerIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-5 bg-gruvbox-green'
                    : 'w-1.5 bg-gruvbox-bg2 hover:bg-gruvbox-fgMuted'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 px-3 sm:hidden">
            <Button
              variant="ghost"
              disabled={activeIndex === 0}
              onClick={() => goToSticker(-1)}
            >
              {t('carousel.prevSticker')}
            </Button>
            <Button
              variant="ghost"
              disabled={activeIndex >= stickers.length - 1}
              onClick={() => goToSticker(1)}
            >
              {t('carousel.nextSticker')}
            </Button>
          </div>
        </>
      )}

      <footer className="grid grid-cols-2 gap-2 border-t border-gruvbox-bg2 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button variant="ghost" disabled={teamIndex <= 0} onClick={() => goToTeam(-1)}>
          {t('carousel.prevTeam')}
        </Button>
        <Button
          variant="ghost"
          disabled={teamIndex >= teams.length - 1}
          onClick={() => goToTeam(1)}
        >
          {t('carousel.nextTeam')}
        </Button>
      </footer>

      <div className="space-y-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-center">
        <p className="text-[11px] text-gruvbox-fgMuted">{t('carousel.swipeHint')}</p>
        <p className="hidden text-[10px] text-gruvbox-fgMuted/80 sm:block">
          {t('carousel.desktopHint')}
        </p>
        <p className="text-[10px] text-gruvbox-fgMuted/80 sm:hidden">
          {t('carousel.gestureHint')}
        </p>
      </div>
    </div>
  )
}
