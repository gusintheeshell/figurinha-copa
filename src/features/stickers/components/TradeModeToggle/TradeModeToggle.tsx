import { useTranslation } from '@/lib/i18n'
import { useStickersStore } from '../../stores'

export function TradeModeToggle() {
  const { t } = useTranslation()
  const tradeMode = useStickersStore((state) => state.tradeMode)
  const setTradeMode = useStickersStore((state) => state.setTradeMode)

  return (
    <div className="space-y-1">
      <button
        type="button"
        aria-pressed={tradeMode}
        onClick={() => setTradeMode(!tradeMode)}
        className={`min-h-11 w-full rounded-xl px-4 text-sm font-semibold transition select-none active:scale-[0.98] ${
          tradeMode
            ? 'bg-gruvbox-orange text-gruvbox-bg'
            : 'bg-gruvbox-bg2 text-gruvbox-fg hover:bg-gruvbox-bg1'
        }`}
      >
        {tradeMode ? t('trade.active') : t('trade.inactive')}
      </button>
      <p className="text-xs text-gruvbox-fgMuted">
        {tradeMode ? t('trade.hintActive') : t('trade.hintInactive')}
      </p>
    </div>
  )
}
