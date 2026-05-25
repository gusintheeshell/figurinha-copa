function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector =
    attribute === 'name'
      ? `meta[name="${key}"]`
      : `meta[property="${key}"]`

  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  let element = document.getElementById(id)

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.setAttribute('type', 'application/ld+json')
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

export interface SeoMetaInput {
  title: string
  description: string
  keywords: string
  ogTitle: string
  pageUrl: string
  imageUrl: string
  locale: string
}

export function applySeoMeta({
  title,
  description,
  keywords,
  ogTitle,
  pageUrl,
  imageUrl,
  locale,
}: SeoMetaInput) {
  document.title = title

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'keywords', keywords)
  upsertMeta('name', 'robots', 'index, follow')
  upsertMeta('name', 'author', 'Figurinhas Copa')
  upsertMeta('name', 'application-name', 'Figurinhas Copa')

  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:url', pageUrl)
  upsertMeta('property', 'og:site_name', 'Figurinhas Copa')
  upsertMeta('property', 'og:title', ogTitle)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:image', imageUrl)
  upsertMeta('property', 'og:image:alt', ogTitle)
  upsertMeta('property', 'og:locale', locale)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', ogTitle)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', imageUrl)
  upsertMeta('name', 'twitter:image:alt', ogTitle)

  upsertLink('canonical', pageUrl)

  upsertJsonLd('app-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    url: pageUrl,
    image: imageUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  })
}
