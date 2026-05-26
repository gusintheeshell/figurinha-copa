import type { GroupKey } from '../data/teams'
import type { Team } from '../types'
import { isTeamExpanded } from '../stores/stickersStore'

export const GROUP_ORDER: GroupKey[] = [
  'special',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
]

export interface TeamGroup {
  groupKey: GroupKey
  teams: Team[]
}

export function groupTeamsByGroup(teams: Team[]): TeamGroup[] {
  const grouped = new Map<GroupKey, Team[]>()

  for (const team of teams) {
    const current = grouped.get(team.groupKey) ?? []
    current.push(team)
    grouped.set(team.groupKey, current)
  }

  return GROUP_ORDER.filter((groupKey) => grouped.has(groupKey)).map((groupKey) => ({
    groupKey,
    teams: grouped.get(groupKey)!,
  }))
}

export function areAllTeamsCollapsed(
  teamIds: string[],
  expandedTeams: Record<string, boolean>,
) {
  if (teamIds.length === 0) {
    return false
  }

  return teamIds.every((teamId) => !isTeamExpanded(expandedTeams, teamId))
}
