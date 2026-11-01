import {
  CITIES,
  CITIZEN_STATUSES,
  GENDERS,
  type CitizenFilters,
} from '@/entities/citizen'

export const filterConfigs = [
  {
    key: 'city',
    allLabel: 'Все города',
    options: CITIES,
  },
  {
    key: 'status',
    allLabel: 'Все статусы',
    options: CITIZEN_STATUSES,
  },
  {
    key: 'gender',
    allLabel: 'Любой пол',
    options: GENDERS,
  },
] satisfies {
  key: keyof CitizenFilters
  allLabel: string
  options: readonly string[]
}[]