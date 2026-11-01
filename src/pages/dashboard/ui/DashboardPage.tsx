import { useCitizenStats } from '@/entities/citizen'
import { BarChart, ColumnChart, ErrorMessage, KpiCard, Loader } from '@/shared/ui'
import { CHART_CONFIG, KPI_CONFIG } from '../model/constants'

export function DashboardPage() {
  const { data: stats, isLoading, isError } = useCitizenStats()

  if (isLoading) {
    return <Loader className="py-12" />
  }


  if (isError || !stats) {
    return (
      <ErrorMessage
        text="Не удалось загрузить статистику"
        className="py-12"
      />
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Главная
      </h2>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {KPI_CONFIG.map(({ key, label, getValue }) => (
          <KpiCard
            key={key}
            label={label}
            value={getValue(stats)}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {CHART_CONFIG.map(({ key, title, type, getData }) => {
          const data = getData(stats)

          return type === 'column' ? (
            <ColumnChart key={key} title={title} data={data} />
          ) : (
            <BarChart key={key} title={title} data={data} />
          )
        })}
      </div>
    </div>
  )
}