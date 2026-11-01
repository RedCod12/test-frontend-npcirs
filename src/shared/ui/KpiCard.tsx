import { formatNumber } from '@/shared/lib'

interface KpiCardProps { label: string; value: number }

export function KpiCard({ label, value }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <strong className="mt-3 block text-3xl font-semibold tracking-tight text-slate-900">{formatNumber(value)}</strong>
    </div>
  )
}
