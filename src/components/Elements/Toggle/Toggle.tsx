interface ToggleOption<T extends string> {
  value: T
  label: string
  icon?: string
}

interface ToggleProps<T extends string> {
  value: T
  options: ToggleOption<T>[]
  onChange: (value: T) => void
  ariaLabel: string
}

export function Toggle<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: ToggleProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="grid grid-cols-3 gap-1 rounded-xl bg-gruvbox-bg2 p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={`flex min-h-11 items-center justify-center gap-1 rounded-lg px-1.5 text-xs font-semibold transition select-none sm:px-2 sm:text-sm ${
              isActive
                ? 'bg-gruvbox-green text-gruvbox-bg'
                : 'text-gruvbox-fgMuted hover:text-gruvbox-fg'
            }`}
          >
            <span className="flex items-center gap-1">
              {option.icon ? (
                <span aria-hidden className="text-sm leading-none sm:text-base">
                  {option.icon}
                </span>
              ) : null}
              <span>{option.label}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
