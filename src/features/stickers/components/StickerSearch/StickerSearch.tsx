import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from '@/lib/i18n'
import { findSticker } from '../../utils/findSticker'
import { areAllTeamsCollapsed } from '../../utils/groupTeams'
import { teamHasTradeStickers } from '../../utils/sortStickers'
import { useStickersStore } from '../../stores'

export function StickerSearch() {
  const { t } = useTranslation()
  const teams = useStickersStore((state) => state.teams)
  const tradeMode = useStickersStore((state) => state.tradeMode)
  const expandedTeams = useStickersStore((state) => state.expandedTeams)
  const focusedSticker = useStickersStore((state) => state.focusedSticker)
  const searchHistory = useStickersStore((state) => state.searchHistory)
  const focusSticker = useStickersStore((state) => state.focusSticker)
  const openTeamCarousel = useStickersStore((state) => state.openTeamCarousel)
  const addSearchHistory = useStickersStore((state) => state.addSearchHistory)
  const clearFocusedSticker = useStickersStore((state) => state.clearFocusedSticker)
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)

  const visibleTeamIds = useMemo(() => {
    const filteredTeams = tradeMode
      ? teams.filter((team) => teamHasTradeStickers(team.stickers))
      : teams

    return filteredTeams.map((team) => team.id)
  }, [teams, tradeMode])

  const allCollapsed = areAllTeamsCollapsed(visibleTeamIds, expandedTeams)

  useEffect(() => {
    if (!focusedSticker || allCollapsed) {
      return
    }

    const scrollTimer = window.setTimeout(() => {
      document
        .getElementById(`sticker-${focusedSticker.stickerId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 350)

    const clearTimer = window.setTimeout(() => {
      clearFocusedSticker()
    }, 4000)

    return () => {
      window.clearTimeout(scrollTimer)
      window.clearTimeout(clearTimer)
    }
  }, [allCollapsed, clearFocusedSticker, focusedSticker])

  function jumpTo(rawQuery: string) {
    const match = findSticker(teams, rawQuery)

    if (!match) {
      setError(true)
      clearFocusedSticker()
      return
    }

    setQuery(match.sticker.number)
    setError(false)
    addSearchHistory(match.sticker.number)

    if (allCollapsed) {
      openTeamCarousel(match.teamId, match.stickerId)
      return
    }

    focusSticker(match.teamId, match.stickerId)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    jumpTo(query)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="sticker-search" className="sr-only">
        {t('search.label')}
      </label>
      <div className="flex gap-2">
        <input
          id="sticker-search"
          type="search"
          enterKeyHint="search"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setError(false)
          }}
          placeholder={t('search.placeholder')}
          className="min-h-11 flex-1 rounded-xl border border-gruvbox-bg2 bg-gruvbox-bg1 px-3 text-sm text-gruvbox-fg placeholder:text-gruvbox-fgMuted focus:border-gruvbox-green focus:outline-none"
        />
        <button
          type="submit"
          className="min-h-11 shrink-0 rounded-xl bg-gruvbox-green px-4 text-sm font-semibold text-gruvbox-bg transition active:scale-[0.98]"
        >
          {t('search.action')}
        </button>
      </div>
      <p className="text-xs text-gruvbox-fgMuted">{t('search.hint')}</p>
      {error ? (
        <p className="text-xs text-gruvbox-red" role="alert">
          {t('search.notFound')}
        </p>
      ) : null}
      {searchHistory.length > 0 ? (
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-gruvbox-fgMuted">
            {t('search.recent')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {searchHistory.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => jumpTo(code)}
                className="min-h-9 rounded-lg bg-gruvbox-bg2 px-2.5 text-xs font-semibold text-gruvbox-fg transition active:scale-[0.98]"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </form>
  )
}
