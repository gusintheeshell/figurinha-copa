import type { ReactNode } from 'react'

interface AccordionProps {
  title: ReactNode
  subtitle?: ReactNode
  open: boolean
  onToggle: () => void
  children: ReactNode
}

export function Accordion({
  title,
  subtitle,
  open,
  onToggle,
  children,
}: AccordionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gruvbox-bg2 bg-gruvbox-bg1 transition-shadow duration-300">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left select-none"
      >
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-semibold text-gruvbox-fg">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-0.5 text-sm text-gruvbox-fgMuted">{subtitle}</div>
          ) : null}
        </div>
        <span
          aria-hidden
          className={`text-gruvbox-yellow transition-transform duration-300 ease-out ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▾
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gruvbox-bg2 px-3 pb-3 pt-2">{children}</div>
        </div>
      </div>
    </section>
  )
}
