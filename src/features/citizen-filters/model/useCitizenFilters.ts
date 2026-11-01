import { useMemo, useState } from 'react'
import { EMPTY_CITIZEN_FILTERS, type CitizenFilters } from '@/entities/citizen'
import { useDebouncedValue } from '@/shared/lib'

const SEARCH_DEBOUNCE_MS = 300

export function useCitizenFilters() {
  const [filters, setFilters] = useState<CitizenFilters>(EMPTY_CITIZEN_FILTERS)
  const debouncedSearch = useDebouncedValue(filters.search, SEARCH_DEBOUNCE_MS)

  const queryFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [debouncedSearch, filters.city, filters.status, filters.gender],
  )
  
  const updateFilter = <K extends keyof CitizenFilters>(key: K, value: CitizenFilters[K]) =>
    setFilters(previous => ({ ...previous, [key]: value }))

  return { filters, queryFilters, updateFilter }
}