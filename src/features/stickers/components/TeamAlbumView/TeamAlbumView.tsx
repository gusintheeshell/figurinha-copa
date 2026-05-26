import { useMemo } from 'react'
import {
  AccordionControls,
  TeamAccordion,
  TeamGridOverview,
  TeamStickerCarousel,
  useStickersStore,
} from '@/features/stickers'
import type { Team } from '@/features/stickers/types'
import { areAllTeamsCollapsed } from '@/features/stickers/utils/groupTeams'

interface TeamAlbumViewProps {
  teams: Team[]
}

export function TeamAlbumView({ teams }: TeamAlbumViewProps) {
  const expandedTeams = useStickersStore((state) => state.expandedTeams)
  const teamIds = useMemo(() => teams.map((team) => team.id), [teams])
  const allCollapsed = areAllTeamsCollapsed(teamIds, expandedTeams)

  return (
    <>
      <AccordionControls teamIds={teamIds} />

      <div className="transition-opacity duration-300">
        {allCollapsed ? (
          <TeamGridOverview teams={teams} />
        ) : (
          <div className="space-y-3 animate-fade-in">
            {teams.map((team) => (
              <TeamAccordion key={team.id} team={team} />
            ))}
          </div>
        )}
      </div>

      <TeamStickerCarousel teams={teams} />
    </>
  )
}
