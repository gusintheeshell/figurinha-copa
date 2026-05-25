import { LanguageSwitcher, ProgressBar } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { useStickerStats } from '../../hooks'
import { useStickersStore } from '../../stores'
import { StickerFilters } from '../StickerFilters'

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

export function StickerHeader() {
  const { t } = useTranslation()
  const teams = useStickersStore((state) => state.teams)
  const { global } = useStickerStats(teams)

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

        <StickerFilters />
      </div>
    </header>
  )
}
