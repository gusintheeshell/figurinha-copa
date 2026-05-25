import type { ReactNode } from 'react'
import { useSeo } from '@/lib/seo'

export function AppProviders({ children }: { children: ReactNode }) {
  useSeo()

  return children
}
