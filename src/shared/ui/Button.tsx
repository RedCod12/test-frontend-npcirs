import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'row' | 'nav'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
  active?: boolean
  children: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-brand-600 bg-brand-600 text-white enabled:hover:bg-brand-700 enabled:hover:border-brand-700 disabled:border-brand-400 disabled:bg-brand-400 disabled:text-white',
  secondary:
    'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300',
  danger:
    'border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700',
  row: 'w-full border-b border-slate-100',
  nav: 'rounded-xl px-4 py-2.5 text-left text-sm font-medium',
}

const activeStyles: Record<ButtonVariant, { active: string; inactive: string }> = {
  primary: { active: '', inactive: '' },
  secondary: { active: '', inactive: '' },
  danger: { active: '', inactive: '' },
  nav: {
    active: 'bg-brand-50 text-brand-700',
    inactive: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  },
  row: {
    active: 'bg-brand-50 text-brand-700',
    inactive: 'bg-white text-slate-700 hover:bg-slate-50',
  },
}

export function Button({
  variant = 'primary',
  loading = false,
  active = false,
  disabled,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClass =
    variant === 'row' || variant === 'nav'
      ? 'flex items-center text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'
      : 'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

  const activeClass = activeStyles[variant][active ? 'active' : 'inactive']

  return (
    <button
      {...props}
      type={type}
      className={`${baseClass} ${variants[variant]} ${activeClass} ${className}transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60`}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? 'Сохранение...' : children}
    </button>
  )
}