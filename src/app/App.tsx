import { useMemo } from 'react'
import { useTranslation } from '@/lib/i18n'
import { TeamAlbumView, StickerHeader, useStickersStore } from '@/features/stickers'
import { teamHasTradeStickers } from '@/features/stickers/utils/sortStickers'
import { AppProviders } from './providers'

export function App() {
  const { t } = useTranslation()
  const teams = useStickersStore((state) => state.teams)
  const tradeMode = useStickersStore((state) => state.tradeMode)

  const visibleTeams = useMemo(() => {
    if (!tradeMode) {
      return teams
    }

    return teams.filter((team) => teamHasTradeStickers(team.stickers))
  }, [teams, tradeMode])

  return (
    <AppProviders>
      <div className="flex min-h-screen min-h-dvh flex-col bg-gruvbox-bg text-gruvbox-fg">
        <StickerHeader tradeTeamsCount={visibleTeams.length} />

        <main
          id="main-content"
          className="mx-auto w-full max-w-3xl flex-1 space-y-3 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
        >
          {visibleTeams.length === 0 ? (
            <p className="py-10 text-center text-sm text-gruvbox-fgMuted">
              {t('trade.emptyAlbum')}
            </p>
          ) : (
            <TeamAlbumView teams={visibleTeams} />
          )}
        </main>
      </div>
    </AppProviders>
  )
}
