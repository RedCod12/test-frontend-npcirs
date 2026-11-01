import type { Citizen } from '@/entities/citizen'
import { formatDate } from '@/shared/lib'
import { StatusBadge } from '@/entities/citizen'

export const columns = [
  {
    key: 'fullName',
    title: 'ФИО',
    render: (citizen: Citizen) => citizen.fullName,
  },
  {
    key: 'birthDate',
    title: 'Дата рожд.',
    render: (citizen: Citizen) => formatDate(citizen.birthDate),
  },
  {
    key: 'city',
    title: 'Город',
    render: (citizen: Citizen) => citizen.city,
  },
  {
    key: 'status',
    title: 'Статус',
    render: (citizen: Citizen) => (
      <StatusBadge status={citizen.status} />
    ),
  },
]