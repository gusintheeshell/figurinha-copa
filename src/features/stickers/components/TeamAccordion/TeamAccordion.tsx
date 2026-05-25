import { useState } from 'react'
import { Accordion, ProgressBar } from '@/components/Elements'
import { useTeamTranslation } from '@/lib/i18n'
import { getTeamFlag } from '../../data/teamFlags'
import { useStickerStats } from '../../hooks'
import type { Team } from '../../types'
import { StickerGrid } from '../StickerGrid'

interface TeamAccordionProps {
  team: Team
}

export function TeamAccordion({ team }: TeamAccordionProps) {
  const [open, setOpen] = useState(true)
  const { byTeam } = useStickerStats([team])
  const stats = byTeam[team.id]
  const { name, group, t } = useTeamTranslation(team.id, team.groupKey)
  const flag = getTeamFlag(team.id)

  return (
    <Accordion
      open={open}
      onToggle={() => setOpen((current) => !current)}
      title={
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl leading-none"
          >
            {flag}
          </span>
          <span className="truncate">{name}</span>
        </div>
      }
      subtitle={
        <div className="space-y-2">
          <p>
            {group ? `${group} · ` : ''}
            {t('team.progress', { owned: stats.owned, total: stats.total })}
          </p>
          <ProgressBar value={stats.percent} size="sm" />
        </div>
      }
    >
      <StickerGrid team={team} />
    </Accordion>
  )
}
