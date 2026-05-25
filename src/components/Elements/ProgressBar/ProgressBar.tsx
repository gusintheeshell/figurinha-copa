interface ProgressBarProps {
  value: number
  label?: string
  size?: 'sm' | 'md'
}

export function ProgressBar({
  value,
  label,
  size = 'md',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const trackHeight = size === 'sm' ? 'h-1.5' : 'h-2.5'

  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1 flex items-center justify-between text-xs text-gruvbox-fgMuted">
          <span>{label}</span>
          <span>{clampedValue}%</span>
        </div>
      ) : null}
      <div
        className={`w-full overflow-hidden rounded-full bg-gruvbox-bg2 ${trackHeight}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedValue}
      >
        <div
          className={`${trackHeight} rounded-full bg-gruvbox-green transition-all duration-300`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
