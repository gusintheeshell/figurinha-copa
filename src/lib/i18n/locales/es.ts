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
  header: {
    showTools: 'Mostrar búsqueda y filtros',
    hideTools: 'Ocultar búsqueda y filtros',
    summary: '{{filter}} · {{sort}}',
    summaryTrade: 'Modo intercambio activo',
  },
  search: {
    label: 'Buscar cromo',
    placeholder: 'Ej: BRA7, FWC1, ARG12',
    action: 'Ir',
    hint: 'Ideal para intercambios: escribe el código y ve directo al cromo.',
    notFound: 'Cromo no encontrado. Usa el código completo (ej: BRA7).',
    recent: 'Búsquedas recientes',
  },
  trade: {
    inactive: 'Modo intercambio',
    active: 'Modo intercambio activo',
    hintInactive: 'Muestra solo faltantes y repetidos para revisar intercambios.',
    hintActive: 'Mostrando cromos que faltan o están repetidos.',
    summary: '{{count}} selecciones con cromos para intercambiar',
    emptyAlbum: 'No hay cromos faltantes ni repetidos en tu álbum.',
  },
  sort: {
    album: 'Álbum',
    number: 'Número',
    ariaLabel: 'Ordenar cromos',
  },
  team: {
    progress: '{{owned}}/{{total}} conseguidos',
  },
  accordion: {
    expandAll: 'Abrir todas las selecciones',
    collapseAll: 'Cerrar todas las selecciones',
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
    emptyTrade: 'Ningún cromo para intercambiar en esta selección.',
  },
  carousel: {
    close: 'Cerrar',
    counter: '{{current}} de {{total}}',
    owned: 'Conseguido',
    missing: 'Falta',
    duplicate: '{{count}} repetidos',
    prevTeam: 'Selección anterior',
    nextTeam: 'Siguiente selección',
    prevSticker: 'Cromo anterior',
    nextSticker: 'Siguiente cromo',
    goToSticker: 'Ir al cromo {{number}}',
    stickerNav: 'Navegación de cromos',
    swipeHint: 'Desliza ↔ entre cromos',
    desktopHint: '← → teclado · botones laterales · rueda del mouse · clic en los puntos',
    gestureHint: '↓ cerrar · ↑ editar · ↔ arriba cambia selección · en bordes cambia selección',
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
