import { useTranslation } from '@/lib/i18n'
import { getTeamFlag } from '../../data/teamFlags'
import { useStickerStats } from '../../hooks'
import { useStickersStore } from '../../stores'
import type { Team } from '../../types'
import { groupTeamsByGroup } from '../../utils/groupTeams'

interface TeamGridOverviewProps {
  teams: Team[]
}

export function TeamGridOverview({ teams }: TeamGridOverviewProps) {
  const { t } = useTranslation()
  const openTeamCarousel = useStickersStore((state) => state.openTeamCarousel)
  const groupedTeams = groupTeamsByGroup(teams)

  return (
    <div className="animate-fade-in space-y-5">
      {groupedTeams.map(({ groupKey, teams: groupTeams }) => (
        <section key={groupKey}>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gruvbox-fgMuted">
            {t(`groups.${groupKey}`)}
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {groupTeams.map((team) => (
              <TeamGridCard
                key={team.id}
                team={team}
                onOpen={() => openTeamCarousel(team.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function TeamGridCard({ team, onOpen }: { team: Team; onOpen: () => void }) {
  const { t } = useTranslation()
  const { byTeam } = useStickerStats([team])
  const stats = byTeam[team.id]
  const flag = getTeamFlag(team.id)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex min-h-[92px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-gruvbox-bg2 bg-gruvbox-bg1 px-2 py-3 transition active:scale-[0.97] hover:border-gruvbox-green/40"
    >
      <span aria-hidden className="text-2xl leading-none">
        {flag}
      </span>
      <span className="line-clamp-2 text-center text-[11px] font-semibold leading-tight">
        {t(`teams.${team.id}`)}
      </span>
      <span className="text-[10px] tabular-nums text-gruvbox-fgMuted">
        {stats.owned}/{stats.total}
      </span>
    </button>
  )
}
