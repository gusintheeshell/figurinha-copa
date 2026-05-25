import type { Team } from '../types'
import { allTeamDefinitions } from './teams'

function createStickers(
  teamId: string,
  prefix: string,
  count: number,
): Team['stickers'] {
  return Array.from({ length: count }, (_, index) => {
    const number = `${prefix}${index + 1}`

    return {
      id: `${teamId}-${number}`,
      number,
      quantity: 0,
    }
  })
}

function buildTeam(definition: (typeof allTeamDefinitions)[number]): Team {
  return {
    id: definition.id,
    groupKey: definition.groupKey,
    stickers: createStickers(definition.id, definition.prefix, definition.count),
  }
}

export function buildAlbum(): Team[] {
  return allTeamDefinitions.map(buildTeam)
}

export const mockAlbum = buildAlbum()
