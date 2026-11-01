import { CITIZEN_STATUSES } from '../config/constants'
import type { CitizenStatus } from '../model/types'

const styles = [
  'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'bg-amber-50 text-amber-700 ring-amber-200',
  'bg-slate-100 text-slate-600 ring-slate-200',
  'bg-sky-50 text-sky-700 ring-sky-200',
]

export function StatusBadge({ status }: { status: CitizenStatus }) {
  const index = CITIZEN_STATUSES.indexOf(status)

  return (
    <span
      className={`
      inline-flex w-max shrink-0 items-center justify-center
      whitespace-nowrap rounded-full
      px-4 py-1.5 text-xs font-medium
      ring-1 ring-inset
      ${styles[index] ?? styles[2]}
    `}
    >
      {status}
    </span>
  )
}