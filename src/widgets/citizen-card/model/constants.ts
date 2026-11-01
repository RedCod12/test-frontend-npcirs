import type { FamilyMember } from '@/entities/citizen'
import { formatDate } from '@/shared/lib'

export const FAMILY_COLUMNS = [
  {
    key: 'fullName',
    title: 'ФИО',
    render: (member: FamilyMember) => member.fullName,
    className: 'font-medium',
  },
  {
    key: 'relation',
    title: 'Степень родства',
    render: (member: FamilyMember) => member.relation,
    className: '',
  },
  {
    key: 'birthDate',
    title: 'Дата рожд.',
    render: (member: FamilyMember) => formatDate(member.birthDate),
    className: 'whitespace-nowrap',
  },
]