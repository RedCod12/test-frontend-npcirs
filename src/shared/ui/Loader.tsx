interface LoaderProps {
  text?: string
  size?: 'sm' | 'md'
  className?: string
}

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-[3px]',
}

export function Loader({
  text = 'Загрузка…',
  size = 'md',
  className = '',
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-3 text-sm text-slate-500 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`animate-spin rounded-full border-slate-200 border-t-brand-600 ${sizes[size]}`}
      />

      <span>{text}</span>
    </div>
  )
}