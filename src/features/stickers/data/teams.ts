export type GroupKey =
  | 'special'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'

export interface TeamDefinition {
  id: string
  prefix: string
  count: number
  groupKey: GroupKey
}

export const specialTeams: TeamDefinition[] = [
  { id: 'FWC', prefix: 'FWC', count: 19, groupKey: 'special' },
  { id: 'CC', prefix: 'CC', count: 14, groupKey: 'special' },
]

export const nationalTeams: TeamDefinition[] = [
  { id: 'MEX', prefix: 'MEX', count: 20, groupKey: 'A' },
  { id: 'RSA', prefix: 'RSA', count: 20, groupKey: 'A' },
  { id: 'KOR', prefix: 'KOR', count: 20, groupKey: 'A' },
  { id: 'CZE', prefix: 'CZE', count: 20, groupKey: 'A' },
  { id: 'CAN', prefix: 'CAN', count: 20, groupKey: 'B' },
  { id: 'BIH', prefix: 'BIH', count: 20, groupKey: 'B' },
  { id: 'QAT', prefix: 'QAT', count: 20, groupKey: 'B' },
  { id: 'SUI', prefix: 'SUI', count: 20, groupKey: 'B' },
  { id: 'BRA', prefix: 'BRA', count: 20, groupKey: 'C' },
  { id: 'MAR', prefix: 'MAR', count: 20, groupKey: 'C' },
  { id: 'HAI', prefix: 'HAI', count: 20, groupKey: 'C' },
  { id: 'SCO', prefix: 'SCO', count: 20, groupKey: 'C' },
  { id: 'USA', prefix: 'USA', count: 20, groupKey: 'D' },
  { id: 'PAR', prefix: 'PAR', count: 20, groupKey: 'D' },
  { id: 'AUS', prefix: 'AUS', count: 20, groupKey: 'D' },
  { id: 'TUR', prefix: 'TUR', count: 20, groupKey: 'D' },
  { id: 'GER', prefix: 'GER', count: 20, groupKey: 'E' },
  { id: 'CUW', prefix: 'CUW', count: 20, groupKey: 'E' },
  { id: 'CIV', prefix: 'CIV', count: 20, groupKey: 'E' },
  { id: 'ECU', prefix: 'ECU', count: 20, groupKey: 'E' },
  { id: 'NED', prefix: 'NED', count: 20, groupKey: 'F' },
  { id: 'JPN', prefix: 'JPN', count: 20, groupKey: 'F' },
  { id: 'SWE', prefix: 'SWE', count: 20, groupKey: 'F' },
  { id: 'TUN', prefix: 'TUN', count: 20, groupKey: 'F' },
  { id: 'BEL', prefix: 'BEL', count: 20, groupKey: 'G' },
  { id: 'EGY', prefix: 'EGY', count: 20, groupKey: 'G' },
  { id: 'IRN', prefix: 'IRN', count: 20, groupKey: 'G' },
  { id: 'NZL', prefix: 'NZL', count: 20, groupKey: 'G' },
  { id: 'ESP', prefix: 'ESP', count: 20, groupKey: 'H' },
  { id: 'CPV', prefix: 'CPV', count: 20, groupKey: 'H' },
  { id: 'KSA', prefix: 'KSA', count: 20, groupKey: 'H' },
  { id: 'URU', prefix: 'URU', count: 20, groupKey: 'H' },
  { id: 'FRA', prefix: 'FRA', count: 20, groupKey: 'I' },
  { id: 'SEN', prefix: 'SEN', count: 20, groupKey: 'I' },
  { id: 'IRQ', prefix: 'IRQ', count: 20, groupKey: 'I' },
  { id: 'NOR', prefix: 'NOR', count: 20, groupKey: 'I' },
  { id: 'ARG', prefix: 'ARG', count: 20, groupKey: 'J' },
  { id: 'ALG', prefix: 'ALG', count: 20, groupKey: 'J' },
  { id: 'AUT', prefix: 'AUT', count: 20, groupKey: 'J' },
  { id: 'JOR', prefix: 'JOR', count: 20, groupKey: 'J' },
  { id: 'POR', prefix: 'POR', count: 20, groupKey: 'K' },
  { id: 'COD', prefix: 'COD', count: 20, groupKey: 'K' },
  { id: 'UZB', prefix: 'UZB', count: 20, groupKey: 'K' },
  { id: 'COL', prefix: 'COL', count: 20, groupKey: 'K' },
  { id: 'ENG', prefix: 'ENG', count: 20, groupKey: 'L' },
  { id: 'CRO', prefix: 'CRO', count: 20, groupKey: 'L' },
  { id: 'GHA', prefix: 'GHA', count: 20, groupKey: 'L' },
  { id: 'PAN', prefix: 'PAN', count: 20, groupKey: 'L' },
]

export const allTeamDefinitions: TeamDefinition[] = [
  ...specialTeams,
  ...nationalTeams,
]
