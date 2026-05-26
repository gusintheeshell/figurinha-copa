import { Button } from '@/components/Elements'
import { useTranslation } from '@/lib/i18n'
import { isTeamExpanded, useStickersStore } from '../../stores'

interface AccordionControlsProps {
  teamIds: string[]
}

export function AccordionControls({ teamIds }: AccordionControlsProps) {
  const { t } = useTranslation()
  const expandedTeams = useStickersStore((state) => state.expandedTeams)
  const expandAllTeams = useStickersStore((state) => state.expandAllTeams)
  const collapseAllTeams = useStickersStore((state) => state.collapseAllTeams)

  if (teamIds.length === 0) {
    return null
  }

  const allExpanded = teamIds.every((teamId) =>
    isTeamExpanded(expandedTeams, teamId),
  )

  return (
    <Button
      variant="ghost"
      className="w-full"
      onClick={() =>
        allExpanded ? collapseAllTeams(teamIds) : expandAllTeams(teamIds)
      }
    >
      {allExpanded ? t('accordion.collapseAll') : t('accordion.expandAll')}
    </Button>
  )
}
