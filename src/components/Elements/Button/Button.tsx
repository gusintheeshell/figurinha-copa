import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gruvbox-green text-gruvbox-bg hover:bg-gruvbox-greenBright active:scale-[0.98]',
  ghost:
    'bg-gruvbox-bg1 text-gruvbox-fg hover:bg-gruvbox-bg2 active:scale-[0.98]',
  danger:
    'bg-gruvbox-red text-gruvbox-fg hover:bg-gruvbox-orange active:scale-[0.98]',
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition select-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
