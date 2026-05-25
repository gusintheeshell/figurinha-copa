import type { TranslationDictionary } from '../types'
import { teamNames } from './teams/es'

export const es: TranslationDictionary = {
  app: {
    albumSubtitle: 'Álbum Copa',
    title: 'Cromos',
    pageTitle: 'Cromos Copa',
  },
  seo: {
    title: 'Cromos Copa 2026 — Controla tu álbum',
    description:
      'Organiza y controla tu álbum de cromos del Mundial 2026. Marca conseguidos, faltantes y repetidos por selección, con progreso guardado en tu dispositivo.',
    keywords:
      'cromos, copa del mundo, copa 2026, álbum, panini, colección, repetidos, faltantes, selecciones',
    ogTitle: 'Cromos Copa 2026 — Tu álbum digital',
  },
  stats: {
    collected: 'Conseguidos',
    missing: 'Faltan',
    duplicates: 'Repetidos',
  },
  progress: {
    complete: '{{percent}}% completo',
  },
  filters: {
    all: 'Todos',
    missing: 'Faltantes',
    duplicates: 'Repetidos',
    ariaLabel: 'Filtrar cromos',
  },
  team: {
    progress: '{{owned}}/{{total}} conseguidos',
  },
  sticker: {
    label: 'Cromo',
    ariaLabel: 'Cromo {{number}}',
    editAriaLabel: 'Editar cromo {{number}}',
    close: 'Cerrar',
    remove: 'Eliminar',
  },
  grid: {
    empty: 'Ningún cromo coincide con este filtro.',
  },
  quantity: {
    decrease: 'Disminuir cantidad',
    increase: 'Aumentar cantidad',
  },
  language: {
    ariaLabel: 'Seleccionar idioma',
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
