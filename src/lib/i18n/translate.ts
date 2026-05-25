import type { TranslationDictionary, TranslationParams } from './types'

function getNestedValue(
  dictionary: TranslationDictionary,
  key: string,
): string | undefined {
  const value = key.split('.').reduce<string | TranslationDictionary | undefined>(
    (current, part) => {
      if (typeof current === 'string' || current === undefined) {
        return undefined
      }

      return current[part]
    },
    dictionary,
  )

  return typeof value === 'string' ? value : undefined
}

function interpolate(template: string, params?: TranslationParams) {
  if (!params) {
    return template
  }

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    String(params[key] ?? ''),
  )
}

export function createTranslator(dictionary: TranslationDictionary) {
  return (key: string, params?: TranslationParams) => {
    const value = getNestedValue(dictionary, key)

    if (!value) {
      return key
    }

    return interpolate(value, params)
  }
}
