import { useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import { getOgImageUrl, getOgLocale, getPageUrl } from './config'
import { applySeoMeta } from './updateMeta'

export function useSeo() {
  const { t, locale } = useTranslation()

  useEffect(() => {
    applySeoMeta({
      title: t('seo.title'),
      description: t('seo.description'),
      keywords: t('seo.keywords'),
      ogTitle: t('seo.ogTitle'),
      pageUrl: getPageUrl(),
      imageUrl: getOgImageUrl(),
      locale: getOgLocale(locale),
    })
  }, [locale, t])
}
