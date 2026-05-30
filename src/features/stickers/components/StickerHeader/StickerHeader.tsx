import { LanguageSwitcher, ProgressBar } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { useStickerStats } from '../../hooks'
import { useStickersStore } from '../../stores'
import type { StickerFilter, StickerSort } from '../../types'
import { StickerFilters } from '../StickerFilters'
import { StickerSearch } from '../StickerSearch'
import { StickerSortToggle } from '../StickerSortToggle'
import { TradeModeToggle } from '../TradeModeToggle'

function StatChip({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'green' | 'red' | 'orange'
}) {
  const toneClasses = {
    green: 'text-gruvbox-greenBright',
    red: 'text-gruvbox-red',
    orange: 'text-gruvbox-orange',
  }[tone]

  return (
    <div className="rounded-xl bg-gruvbox-bg2 px-3 py-2 text-center">
      <p className="text-[11px] uppercase tracking-wide text-gruvbox-fgMuted">
        {label}
      </p>
      <p className={`text-lg font-bold tabular-nums ${toneClasses}`}>{value}</p>
    </div>
  )
}

function filterLabel(filter: StickerFilter, t: (key: string) => string) {
  return t(`filters.${filter}`)
}

function sortLabel(sort: StickerSort, t: (key: string) => string) {
  return t(`sort.${sort}`)
}

interface StickerHeaderProps {
  tradeTeamsCount: number
}

export function StickerHeader({ tradeTeamsCount }: StickerHeaderProps) {
  const { t } = useTranslation()
  const teams = useStickersStore((state) => state.teams)
  const filter = useStickersStore((state) => state.filter)
  const sort = useStickersStore((state) => state.sort)
  const tradeMode = useStickersStore((state) => state.tradeMode)
  const headerToolsExpanded = useStickersStore((state) => state.headerToolsExpanded)
  const toggleHeaderTools = useStickersStore((state) => state.toggleHeaderTools)
  const { global } = useStickerStats(teams)

  const toolsSummary = tradeMode
    ? t('header.summaryTrade')
    : t('header.summary', {
        filter: filterLabel(filter, t),
        sort: sortLabel(sort, t),
      })

  return (
    <header className="sticky top-0 z-20 border-b border-gruvbox-bg2 bg-gruvbox-bg/95 px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur">
      <div className="mx-auto max-w-3xl space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gruvbox-fgMuted">
              {t('app.albumSubtitle')}
            </p>
            <h1 className="text-2xl font-bold text-gruvbox-fg">{t('app.title')}</h1>
          </div>
          <div className="w-36 shrink-0 sm:w-40">
            <LanguageSwitcher />
          </div>
        </div>

        <ProgressBar
          value={global.percent}
          label={t('progress.complete', { percent: global.percent })}
        />

        <div className="grid grid-cols-3 gap-2">
          <StatChip label={t('stats.collected')} value={global.owned} tone="green" />
          <StatChip label={t('stats.missing')} value={global.missing} tone="red" />
          <StatChip
            label={t('stats.duplicates')}
            value={global.duplicates}
            tone="orange"
          />
        </div>

        <button
          type="button"
          onClick={toggleHeaderTools}
          aria-expanded={headerToolsExpanded}
          aria-controls="header-tools-panel"
          className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-gruvbox-bg2 bg-gruvbox-bg1 px-3 py-2 text-left transition active:scale-[0.99]"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gruvbox-fg">
              {headerToolsExpanded ? t('header.hideTools') : t('header.showTools')}
            </p>
            {!headerToolsExpanded ? (
              <p className="truncate text-xs text-gruvbox-fgMuted">{toolsSummary}</p>
            ) : null}
          </div>
          <span
            aria-hidden
            className={`shrink-0 text-gruvbox-yellow transition-transform duration-300 ease-out ${
              headerToolsExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            ▾
          </span>
        </button>

        <div
          id="header-tools-panel"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            headerToolsExpanded
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-0">
              <StickerSearch />

              <TradeModeToggle />

              {tradeMode ? (
                <p className="rounded-xl bg-gruvbox-orange/15 px-3 py-2 text-xs text-gruvbox-orange">
                  {t('trade.summary', { count: tradeTeamsCount })}
                </p>
              ) : null}

              <StickerSortToggle />

              {!tradeMode ? <StickerFilters /> : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
