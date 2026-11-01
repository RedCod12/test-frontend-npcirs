import { formatNumber, type CountedItem } from '@/shared/lib'

interface BarChartProps { title: string; data: readonly CountedItem[] }

export function BarChart({ title, data }: BarChartProps) {
  const maxCount = Math.max(1, ...data.map(([, count]) => count))
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="mb-5 text-base font-semibold text-slate-900">{title}</h3>
      <div className="space-y-4">
        {data.map(([label, count]) => (
          <div className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)_auto] items-center gap-3 text-sm" key={label}>
            <span className="truncate text-slate-600" title={label}>{label}</span>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-brand-500" style={{ width: `${(count / maxCount) * 100}%` }} />
            </div>
            <span className="min-w-10 text-right font-semibold tabular-nums text-slate-800">{formatNumber(count)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
