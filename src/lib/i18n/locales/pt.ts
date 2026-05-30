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
  header: {
    showTools: 'Mostrar busca e filtros',
    hideTools: 'Ocultar busca e filtros',
    summary: '{{filter}} · {{sort}}',
    summaryTrade: 'Modo troca ativo',
  },
  search: {
    label: 'Buscar figurinha',
    placeholder: 'Ex: BRA7, FWC1, ARG12',
    action: 'Ir',
    hint: 'Ideal para trocas: digite o código da figurinha e vá direto até ela.',
    notFound: 'Figurinha não encontrada. Use o código completo (ex: BRA7).',
    recent: 'Buscas recentes',
  },
  trade: {
    inactive: 'Modo troca',
    active: 'Modo troca ativo',
    hintInactive: 'Mostra só faltantes e repetidas para conferir trocas.',
    hintActive: 'Exibindo figurinhas que faltam ou estão repetidas.',
    summary: '{{count}} seleções com figurinhas para trocar',
    emptyAlbum: 'Nenhuma figurinha faltando ou repetida no álbum.',
  },
  sort: {
    album: 'Álbum',
    number: 'Número',
    ariaLabel: 'Ordenar figurinhas',
  },
  team: {
    progress: '{{owned}}/{{total}} coletadas',
  },
  accordion: {
    expandAll: 'Abrir todas as seleções',
    collapseAll: 'Fechar todas as seleções',
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
    emptyTrade: 'Nenhuma figurinha para trocar nesta seleção.',
  },
  carousel: {
    close: 'Fechar',
    counter: '{{current}} de {{total}}',
    owned: 'Coletada',
    missing: 'Faltando',
    duplicate: '{{count}} repetidas',
    prevTeam: 'Seleção anterior',
    nextTeam: 'Próxima seleção',
    prevSticker: 'Figurinha anterior',
    nextSticker: 'Próxima figurinha',
    goToSticker: 'Ir para figurinha {{number}}',
    stickerNav: 'Navegação de figurinhas',
    swipeHint: 'Deslize ↔ entre figurinhas',
    desktopHint: '← → no teclado · botões laterais · roda do mouse · clique nos pontos',
    gestureHint: '↓ fechar · ↑ editar · ↔ no topo troca seleção · nas bordas muda seleção',
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
