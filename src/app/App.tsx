import {
  StickerHeader,
  TeamAccordion,
  useStickersStore,
} from '@/features/stickers'
import { AppProviders } from './providers'

export function App() {
  const teams = useStickersStore((state) => state.teams)

  return (
    <AppProviders>
      <div className="flex min-h-screen min-h-dvh flex-col bg-gruvbox-bg text-gruvbox-fg">
        <StickerHeader />

        <main
          id="main-content"
          className="mx-auto w-full max-w-3xl flex-1 space-y-3 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
        >
          {teams.map((team) => (
            <TeamAccordion key={team.id} team={team} />
          ))}
        </main>
      </div>
    </AppProviders>
  )
}
