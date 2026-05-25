import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { buildAlbum } from '../data/mockAlbum'
import type { StickerFilter, Team } from '../types'

interface StickersState {
  teams: Team[]
  filter: StickerFilter
}

interface StickersActions {
  toggleOwned: (teamId: string, stickerId: string) => void
  setQuantity: (teamId: string, stickerId: string, quantity: number) => void
  increment: (teamId: string, stickerId: string) => void
  decrement: (teamId: string, stickerId: string) => void
  setFilter: (filter: StickerFilter) => void
  resetAlbum: () => void
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

      resetAlbum: () =>
        set({
          teams: buildAlbum(),
          filter: 'all',
        }),
    }),
    {
      name: 'figurinhas-copa-v1',
      version: 3,
      migrate: (persistedState, version) => {
        const state = persistedState as StickersState | undefined

        if (!state) {
          return persistedState as StickersState & StickersActions
        }

        if (version < 2) {
          return {
            ...state,
            teams: mergeAlbumWithSavedQuantities(state.teams),
          }
        }

        if (version < 3) {
          return {
            ...state,
            teams: mergeAlbumWithSavedQuantities(state.teams),
          }
        }

        return state as StickersState & StickersActions
      },
    },
  ),
)

export const selectTeams = (state: StickersState) => state.teams
export const selectFilter = (state: StickersState) => state.filter
