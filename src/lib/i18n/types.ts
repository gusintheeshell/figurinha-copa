export type Locale = 'pt' | 'en' | 'es'

export type TranslationParams = Record<string, string | number>

export type TranslationDictionary = {
  [key: string]: string | TranslationDictionary
}

export const supportedLocales: Locale[] = ['pt', 'en', 'es']

export const localeLabels: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
}

export const localeFlags: Record<Locale, string> = {
  pt: '🇧🇷',
  en: '🇺🇸',
  es: '🇪🇸',
}

export const htmlLangMap: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
}
