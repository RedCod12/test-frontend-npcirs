import type { CitizenFilters } from '@/entities/citizen'
import { FilterSelect, Input } from '@/shared/ui'
import { filterConfigs } from '../model/filterConfigs'

interface CitizenFiltersPanelProps {
  filters: CitizenFilters
  onChange: <K extends keyof CitizenFilters>(key: K, value: CitizenFilters[K]) => void
}

export function CitizenFiltersPanel({ filters, onChange }: CitizenFiltersPanelProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <Input
        type="search"
        placeholder="Поиск по ФИО…"
        aria-label="Поиск по ФИО"
        value={filters.search}
        onChange={event => onChange('search', event.target.value)}
        className="min-w-48 flex-1"
      />
      {filterConfigs.map(({ key, allLabel, options }) => (
        <FilterSelect key={key} value={filters[key]} allLabel={allLabel} options={options} onChange={value => onChange(key, value)} />
      ))}
    </div>
  )
}
