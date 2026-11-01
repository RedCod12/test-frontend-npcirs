import chevronDown from '@/shared/assets/icons/chevron-down.svg'

export interface FilterSelectProps {
  value: string
  allLabel: string
  options: readonly string[]
  onChange: (value: string) => void
}

export function FilterSelect({ value, allLabel, options, onChange }: FilterSelectProps) {
  return (
    <div className="relative min-w-36 flex-1 sm:flex-none">
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        aria-label={allLabel}
        className="w-full cursor-pointer appearance-none rounded-xl border
         border-slate-200 bg-white py-2.5 pr-10 pl-3.5 text-sm text-slate-700
          shadow-sm transition-colors hover:border-slate-300 focus:border-brand-500 
          focus:outline-none focus:ring-2 focus:ring-brand-500/15"
      >
        <option value="">{allLabel}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      <img src={chevronDown} alt="" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-60" />
    </div>
  )
}
