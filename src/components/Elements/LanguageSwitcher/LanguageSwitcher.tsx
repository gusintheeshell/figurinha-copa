import { Toggle } from '@/components/Elements'
import {
  localeFlags,
  localeLabels,
  supportedLocales,
  useTranslation,
} from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

const localeOptions = supportedLocales.map((locale) => ({
  value: locale,
  label: localeLabels[locale],
  icon: localeFlags[locale],
}))

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <Toggle
      ariaLabel={t('language.ariaLabel')}
      value={locale}
      options={localeOptions}
      onChange={(value: Locale) => setLocale(value)}
    />
  )
}
