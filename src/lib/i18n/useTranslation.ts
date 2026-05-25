import { useEffect, useMemo } from 'react'
import { createTranslator } from '@/lib/i18n/translate'
import type { Locale, TranslationParams } from '@/lib/i18n/types'
import { htmlLangMap } from '@/lib/i18n/types'
import { en } from '@/lib/i18n/locales/en'
import { es } from '@/lib/i18n/locales/es'
import { pt } from '@/lib/i18n/locales/pt'
import { useLocaleStore } from '@/stores/localeStore'

const dictionaries = { pt, en, es } as const

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale)
  const setLocale = useLocaleStore((state) => state.setLocale)
  const translate = useMemo(() => createTranslator(dictionaries[locale]), [locale])

  useEffect(() => {
    document.documentElement.lang = htmlLangMap[locale]
  }, [locale])

  return {
    locale,
    setLocale,
    t: (key: string, params?: TranslationParams) => translate(key, params),
  }
}

export function useTeamTranslation(teamId: string, groupKey?: string) {
  const { t } = useTranslation()

  return {
    name: t(`teams.${teamId}`),
    group: groupKey ? t(`groups.${groupKey}`) : undefined,
    t,
  }
}

export function getLocaleDictionary(locale: Locale) {
  return dictionaries[locale]
}
