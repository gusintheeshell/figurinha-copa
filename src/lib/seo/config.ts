export function getSiteUrl() {
  const configured = import.meta.env.VITE_SITE_URL as string | undefined

  if (configured) {
    return configured.replace(/\/$/, '')
  }

  if (typeof window !== 'undefined') {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    return `${window.location.origin}${basePath}`
  }

  return ''
}

export function getPageUrl() {
  const siteUrl = getSiteUrl()
  return siteUrl ? `${siteUrl}/` : '/'
}

export function getOgImageUrl() {
  const siteUrl = getSiteUrl()
  const assetPath = `${import.meta.env.BASE_URL}pwa-512.png`.replace(/\/{2,}/g, '/')

  if (!siteUrl) {
    return assetPath
  }

  return `${siteUrl}${assetPath.startsWith('/') ? assetPath : `/${assetPath}`}`
}

export function getOgLocale(locale: string) {
  if (locale === 'pt') return 'pt_BR'
  if (locale === 'es') return 'es_ES'
  return 'en_US'
}
