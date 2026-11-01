import type { ComponentProps } from 'react'
import type { CitizenStats } from '@/entities/citizen'
import { getCount } from '@/shared/lib'
import { BarChart } from '@/shared/ui'

type ChartData = ComponentProps<typeof BarChart>['data']

export const KPI_CONFIG = [
  {
    key: 'total',
    label: 'Всего граждан',
    getValue: (stats: CitizenStats) => stats.total,
  },
  {
    key: 'active',
    label: 'Активных',
    getValue: (stats: CitizenStats) => getCount(stats.byStatus, 'Активен'),
  },
  {
    key: 'pending',
    label: 'На проверке',
    getValue: (stats: CitizenStats) => getCount(stats.byStatus, 'На проверке'),
  },
  {
    key: 'cities',
    label: 'Городов',
    getValue: (stats: CitizenStats) => stats.byCity.length,
  },
] as const

export const CHART_CONFIG: {
  key: string
  title: string
  type: 'bar' | 'column'
  getData: (stats: CitizenStats) => ChartData
}[] = [
  {
    key: 'registration',
    title: 'Регистрации по годам',
    type: 'column',
    getData: stats => stats.byRegistrationYear,
  },
  {
    key: 'statuses',
    title: 'По статусам',
    type: 'bar',
    getData: stats => stats.byStatus,
  },
  {
    key: 'cities',
    title: 'По городам',
    type: 'bar',
    getData: stats => stats.byCity,
  },
  {
    key: 'categories',
    title: 'По категориям',
    type: 'bar',
    getData: stats => stats.byCategory,
  },
]