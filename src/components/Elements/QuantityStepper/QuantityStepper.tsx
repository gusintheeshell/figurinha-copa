import { Button } from '../Button'
import { useTranslation } from '@/lib/i18n'

interface QuantityStepperProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        variant="ghost"
        aria-label={t('quantity.decrease')}
        onClick={onDecrement}
        disabled={value <= 0}
      >
        −
      </Button>
      <span className="min-w-10 text-center text-lg font-bold tabular-nums">
        {value}
      </span>
      <Button variant="ghost" aria-label={t('quantity.increase')} onClick={onIncrement}>
        +
      </Button>
    </div>
  )
}
