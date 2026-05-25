const isoToFlag = (isoCode: string) =>
  isoCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    )

export const teamFlags: Record<string, string> = {
  FWC: '🏆',
  CC: '🔴',
  MEX: isoToFlag('MX'),
  RSA: isoToFlag('ZA'),
  KOR: isoToFlag('KR'),
  CZE: isoToFlag('CZ'),
  CAN: isoToFlag('CA'),
  BIH: isoToFlag('BA'),
  QAT: isoToFlag('QA'),
  SUI: isoToFlag('CH'),
  BRA: isoToFlag('BR'),
  MAR: isoToFlag('MA'),
  HAI: isoToFlag('HT'),
  SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  USA: isoToFlag('US'),
  PAR: isoToFlag('PY'),
  AUS: isoToFlag('AU'),
  TUR: isoToFlag('TR'),
  GER: isoToFlag('DE'),
  CUW: isoToFlag('CW'),
  CIV: isoToFlag('CI'),
  ECU: isoToFlag('EC'),
  NED: isoToFlag('NL'),
  JPN: isoToFlag('JP'),
  SWE: isoToFlag('SE'),
  TUN: isoToFlag('TN'),
  BEL: isoToFlag('BE'),
  EGY: isoToFlag('EG'),
  IRN: isoToFlag('IR'),
  NZL: isoToFlag('NZ'),
  ESP: isoToFlag('ES'),
  CPV: isoToFlag('CV'),
  KSA: isoToFlag('SA'),
  URU: isoToFlag('UY'),
  FRA: isoToFlag('FR'),
  SEN: isoToFlag('SN'),
  IRQ: isoToFlag('IQ'),
  NOR: isoToFlag('NO'),
  ARG: isoToFlag('AR'),
  ALG: isoToFlag('DZ'),
  AUT: isoToFlag('AT'),
  JOR: isoToFlag('JO'),
  POR: isoToFlag('PT'),
  COD: isoToFlag('CD'),
  UZB: isoToFlag('UZ'),
  COL: isoToFlag('CO'),
  ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  CRO: isoToFlag('HR'),
  GHA: isoToFlag('GH'),
  PAN: isoToFlag('PA'),
}

export function getTeamFlag(teamId: string): string {
  return teamFlags[teamId] ?? '🏳️'
}
