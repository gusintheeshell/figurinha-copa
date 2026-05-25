import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from '@/lib/i18n/types'
import { supportedLocales } from '@/lib/i18n/types'

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

function detectBrowserLocale(): Locale {
  const language = navigator.language.slice(0, 2).toLowerCase()

  if (supportedLocales.includes(language as Locale)) {
    return language as Locale
  }

  return 'pt'
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: detectBrowserLocale(),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'figurinhas-copa-locale-v1',
      version: 1,
    },
  ),
)
