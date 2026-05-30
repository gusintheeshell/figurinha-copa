import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { buildAlbum } from '../data/mockAlbum'
import { normalizeStickerQuery } from '../utils/findSticker'
import type { StickerFilter, StickerSort, Team } from '../types'

interface StickersState {
  teams: Team[]
  filter: StickerFilter
  sort: StickerSort
  tradeMode: boolean
  searchHistory: string[]
  focusedSticker: { teamId: string; stickerId: string } | null
  expandedTeams: Record<string, boolean>
  carouselTeamId: string | null
  carouselStickerId: string | null
  headerToolsExpanded: boolean
}

interface StickersActions {
  toggleOwned: (teamId: string, stickerId: string) => void
  setQuantity: (teamId: string, stickerId: string, quantity: number) => void
  increment: (teamId: string, stickerId: string) => void
  decrement: (teamId: string, stickerId: string) => void
  setFilter: (filter: StickerFilter) => void
  setSort: (sort: StickerSort) => void
  setTradeMode: (enabled: boolean) => void
  addSearchHistory: (code: string) => void
  focusSticker: (teamId: string, stickerId: string) => void
  clearFocusedSticker: () => void
  toggleTeamAccordion: (teamId: string) => void
  expandAllTeams: (teamIds: string[]) => void
  collapseAllTeams: (teamIds: string[]) => void
  openTeamCarousel: (teamId: string, stickerId?: string) => void
  closeTeamCarousel: () => void
  toggleHeaderTools: () => void
  resetAlbum: () => void
}

type PersistedStickersState = Pick<
  StickersState,
  'teams' | 'filter' | 'sort' | 'headerToolsExpanded'
>

export function isTeamExpanded(
  expandedTeams: Record<string, boolean>,
  teamId: string,
) {
  return expandedTeams[teamId] ?? true
}

function setTeamsExpansion(teamIds: string[], expanded: boolean) {
  return Object.fromEntries(teamIds.map((teamId) => [teamId, expanded]))
}

function updateStickerQuantity(
  teams: Team[],
  teamId: string,
  stickerId: string,
  updater: (quantity: number) => number,
): Team[] {
  return teams.map((team) => {
    if (team.id !== teamId) {
      return team
    }

    return {
      ...team,
      stickers: team.stickers.map((sticker) => {
        if (sticker.id !== stickerId) {
          return sticker
        }

        return {
          ...sticker,
          quantity: Math.max(0, updater(sticker.quantity)),
        }
      }),
    }
  })
}

function mergeAlbumWithSavedQuantities(savedTeams: Team[] | undefined): Team[] {
  const savedQuantities = new Map<string, number>()

  for (const team of savedTeams ?? []) {
    for (const sticker of team.stickers) {
      savedQuantities.set(sticker.id, sticker.quantity)
    }
  }

  return buildAlbum().map((team) => ({
    ...team,
    stickers: team.stickers.map((sticker) => ({
      ...sticker,
      quantity: savedQuantities.get(sticker.id) ?? 0,
    })),
  }))
}

export const useStickersStore = create<StickersState & StickersActions>()(
  persist(
    (set) => ({
      teams: buildAlbum(),
      filter: 'all',
      sort: 'album',
      tradeMode: false,
      searchHistory: [],
      focusedSticker: null,
      expandedTeams: {},
      carouselTeamId: null,
      carouselStickerId: null,
      headerToolsExpanded: true,

      toggleOwned: (teamId, stickerId) =>
        set((state) => ({
          teams: updateStickerQuantity(state.teams, teamId, stickerId, (quantity) =>
            quantity > 0 ? 0 : 1,
          ),
        })),

      setQuantity: (teamId, stickerId, quantity) =>
        set((state) => ({
          teams: updateStickerQuantity(
            state.teams,
            teamId,
            stickerId,
            () => quantity,
          ),
        })),

      increment: (teamId, stickerId) =>
        set((state) => ({
          teams: updateStickerQuantity(
            state.teams,
            teamId,
            stickerId,
            (quantity) => quantity + 1,
          ),
        })),

      decrement: (teamId, stickerId) =>
        set((state) => ({
          teams: updateStickerQuantity(
            state.teams,
            teamId,
            stickerId,
            (quantity) => quantity - 1,
          ),
        })),

      setFilter: (filter) => set({ filter }),

      setSort: (sort) => set({ sort }),

      setTradeMode: (enabled) => set({ tradeMode: enabled }),

      addSearchHistory: (code) =>
        set((state) => {
          const normalized = normalizeStickerQuery(code)

          if (!normalized) {
            return state
          }

          return {
            searchHistory: [
              normalized,
              ...state.searchHistory.filter((item) => item !== normalized),
            ].slice(0, 8),
          }
        }),

      focusSticker: (teamId, stickerId) =>
        set((state) => ({
          focusedSticker: { teamId, stickerId },
          expandedTeams: { ...state.expandedTeams, [teamId]: true },
        })),

      clearFocusedSticker: () => set({ focusedSticker: null }),

      toggleTeamAccordion: (teamId) =>
        set((state) => ({
          expandedTeams: {
            ...state.expandedTeams,
            [teamId]: !isTeamExpanded(state.expandedTeams, teamId),
          },
        })),

      expandAllTeams: (teamIds) =>
        set((state) => ({
          expandedTeams: {
            ...state.expandedTeams,
            ...setTeamsExpansion(teamIds, true),
          },
          carouselTeamId: null,
          carouselStickerId: null,
        })),

      collapseAllTeams: (teamIds) =>
        set((state) => ({
          expandedTeams: {
            ...state.expandedTeams,
            ...setTeamsExpansion(teamIds, false),
          },
          carouselTeamId: null,
          carouselStickerId: null,
        })),

      openTeamCarousel: (teamId, stickerId) =>
        set({
          carouselTeamId: teamId,
          carouselStickerId: stickerId ?? null,
        }),

      closeTeamCarousel: () =>
        set({
          carouselTeamId: null,
          carouselStickerId: null,
          focusedSticker: null,
        }),

      toggleHeaderTools: () =>
        set((state) => ({
          headerToolsExpanded: !state.headerToolsExpanded,
        })),

      resetAlbum: () =>
        set({
          teams: buildAlbum(),
          filter: 'all',
          sort: 'album',
          tradeMode: false,
          searchHistory: [],
          focusedSticker: null,
          expandedTeams: {},
          carouselTeamId: null,
          carouselStickerId: null,
        }),
    }),
    {
      name: 'figurinhas-copa-v1',
      version: 5,
      partialize: (state): PersistedStickersState => ({
        teams: state.teams,
        filter: state.filter,
        sort: state.sort,
        headerToolsExpanded: state.headerToolsExpanded,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as PersistedStickersState),
        tradeMode: currentState.tradeMode,
        searchHistory: currentState.searchHistory,
        focusedSticker: currentState.focusedSticker,
        expandedTeams: currentState.expandedTeams,
        carouselTeamId: currentState.carouselTeamId,
        carouselStickerId: currentState.carouselStickerId,
      }),
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<StickersState> | undefined

        if (!state) {
          return persistedState
        }

        const teams =
          version < 3
            ? mergeAlbumWithSavedQuantities(state.teams)
            : (state.teams ?? buildAlbum())

        return {
          ...state,
          teams,
          filter: state.filter ?? 'all',
          sort: state.sort ?? 'album',
          headerToolsExpanded: state.headerToolsExpanded ?? true,
        }
      },
    },
  ),
)

export const selectTeams = (state: StickersState) => state.teams
export const selectFilter = (state: StickersState) => state.filter
