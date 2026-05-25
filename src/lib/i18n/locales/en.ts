import type { TranslationDictionary } from '../types'
import { teamNames } from './teams/en'

export const en: TranslationDictionary = {
  app: {
    albumSubtitle: 'World Cup Album',
    title: 'Stickers',
    pageTitle: 'World Cup Stickers',
  },
  seo: {
    title: 'World Cup Stickers 2026 — Track your album',
    description:
      'Organize and track your 2026 World Cup sticker album. Mark collected, missing and duplicate stickers by team, with progress saved on your device.',
    keywords:
      'stickers, world cup, world cup 2026, album, panini, collection, duplicates, missing, teams',
    ogTitle: 'World Cup Stickers 2026 — Your digital album',
  },
  stats: {
    collected: 'Collected',
    missing: 'Missing',
    duplicates: 'Duplicates',
  },
  progress: {
    complete: '{{percent}}% complete',
  },
  filters: {
    all: 'All',
    missing: 'Missing',
    duplicates: 'Duplicates',
    ariaLabel: 'Filter stickers',
  },
  team: {
    progress: '{{owned}}/{{total}} collected',
  },
  sticker: {
    label: 'Sticker',
    ariaLabel: 'Sticker {{number}}',
    editAriaLabel: 'Edit sticker {{number}}',
    close: 'Close',
    remove: 'Remove',
  },
  grid: {
    empty: 'No stickers match this filter.',
  },
  quantity: {
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
  },
  language: {
    ariaLabel: 'Select language',
  },
  groups: {
    special: 'Special',
    A: 'Group A',
    B: 'Group B',
    C: 'Group C',
    D: 'Group D',
    E: 'Group E',
    F: 'Group F',
    G: 'Group G',
    H: 'Group H',
    I: 'Group I',
    J: 'Group J',
    K: 'Group K',
    L: 'Group L',
  },
  teams: teamNames,
}
