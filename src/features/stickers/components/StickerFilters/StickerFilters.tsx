import { Toggle } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { useStickersStore } from '../../stores'
import type { StickerFilter } from '../../types'

export function StickerFilters() {
  const { t } = useTranslation()
  const filter = useStickersStore((state) => state.filter)
  const setFilter = useStickersStore((state) => state.setFilter)

  const filterOptions: { value: StickerFilter; label: string }[] = [
    { value: 'all', label: t('filters.all') },
    { value: 'missing', label: t('filters.missing') },
    { value: 'duplicates', label: t('filters.duplicates') },
  ]

  return (
    <Toggle
      ariaLabel={t('filters.ariaLabel')}
      value={filter}
      options={filterOptions}
      onChange={setFilter}
    />
  )
}
