import { Toggle } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { useStickersStore } from '../../stores'
import type { StickerSort } from '../../types'

export function StickerSortToggle() {
  const { t } = useTranslation()
  const sort = useStickersStore((state) => state.sort)
  const setSort = useStickersStore((state) => state.setSort)

  const options: { value: StickerSort; label: string }[] = [
    { value: 'album', label: t('sort.album') },
    { value: 'number', label: t('sort.number') },
  ]

  return (
    <Toggle
      ariaLabel={t('sort.ariaLabel')}
      value={sort}
      options={options}
      onChange={setSort}
      columns={2}
    />
  )
}
