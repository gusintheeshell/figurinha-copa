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
  header: {
    showTools: 'Show search and filters',
    hideTools: 'Hide search and filters',
    summary: '{{filter}} · {{sort}}',
    summaryTrade: 'Trade mode active',
  },
  search: {
    label: 'Search sticker',
    placeholder: 'Ex: BRA7, FWC1, ARG12',
    action: 'Go',
    hint: 'Great for trades: enter the sticker code and jump straight to it.',
    notFound: 'Sticker not found. Use the full code (e.g. BRA7).',
    recent: 'Recent searches',
  },
  trade: {
    inactive: 'Trade mode',
    active: 'Trade mode on',
    hintInactive: 'Shows only missing and duplicate stickers for trade checks.',
    hintActive: 'Showing stickers you need or have as duplicates.',
    summary: '{{count}} teams with stickers to trade',
    emptyAlbum: 'No missing or duplicate stickers in your album.',
  },
  sort: {
    album: 'Album',
    number: 'Number',
    ariaLabel: 'Sort stickers',
  },
  team: {
    progress: '{{owned}}/{{total}} collected',
  },
  accordion: {
    expandAll: 'Expand all teams',
    collapseAll: 'Collapse all teams',
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
    emptyTrade: 'No stickers to trade in this team.',
  },
  carousel: {
    close: 'Close',
    counter: '{{current}} of {{total}}',
    owned: 'Collected',
    missing: 'Missing',
    duplicate: '{{count}} duplicates',
    prevTeam: 'Previous team',
    nextTeam: 'Next team',
    prevSticker: 'Previous sticker',
    nextSticker: 'Next sticker',
    goToSticker: 'Go to sticker {{number}}',
    stickerNav: 'Sticker navigation',
    swipeHint: 'Swipe ↔ between stickers',
    desktopHint: '← → keys · side buttons · mouse wheel · click the dots',
    gestureHint: '↓ close · ↑ edit · ↔ on header switches team · at edges switches team',
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
