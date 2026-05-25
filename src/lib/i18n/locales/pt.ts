import type { TranslationDictionary } from '../types'
import { teamNames } from './teams/pt'

export const pt: TranslationDictionary = {
  app: {
    albumSubtitle: 'Álbum Copa',
    title: 'Figurinhas',
    pageTitle: 'Figurinhas Copa',
  },
  seo: {
    title: 'Figurinhas Copa 2026 — Controle seu álbum',
    description:
      'Organize e acompanhe seu álbum de figurinhas da Copa do Mundo 2026. Marque coletadas, faltantes e repetidas por seleção, com progresso salvo no dispositivo.',
    keywords:
      'figurinhas, copa do mundo, copa 2026, álbum, panini, coleção, repetidas, faltantes, brasil, seleções',
    ogTitle: 'Figurinhas Copa 2026 — Seu álbum digital',
  },
  stats: {
    collected: 'Coletadas',
    missing: 'Faltam',
    duplicates: 'Repetidas',
  },
  progress: {
    complete: '{{percent}}% completo',
  },
  filters: {
    all: 'Todas',
    missing: 'Faltando',
    duplicates: 'Repetidas',
    ariaLabel: 'Filtrar figurinhas',
  },
  team: {
    progress: '{{owned}}/{{total}} coletadas',
  },
  sticker: {
    label: 'Figurinha',
    ariaLabel: 'Figurinha {{number}}',
    editAriaLabel: 'Editar figurinha {{number}}',
    close: 'Fechar',
    remove: 'Remover',
  },
  grid: {
    empty: 'Nenhuma figurinha neste filtro.',
  },
  quantity: {
    decrease: 'Diminuir quantidade',
    increase: 'Aumentar quantidade',
  },
  language: {
    ariaLabel: 'Selecionar idioma',
  },
  groups: {
    special: 'Especial',
    A: 'Grupo A',
    B: 'Grupo B',
    C: 'Grupo C',
    D: 'Grupo D',
    E: 'Grupo E',
    F: 'Grupo F',
    G: 'Grupo G',
    H: 'Grupo H',
    I: 'Grupo I',
    J: 'Grupo J',
    K: 'Grupo K',
    L: 'Grupo L',
  },
  teams: teamNames,
}
