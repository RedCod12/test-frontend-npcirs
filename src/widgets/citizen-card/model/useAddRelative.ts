import { useEffect, useState } from 'react'
import {
  FAMILY_RELATIONS,
  useAddFamilyMember,
  useSearchCitizens,
} from '@/entities/citizen'

interface UseAddRelativeParams {
  citizenId: number
  existingIds: readonly number[]
}

export function useAddRelative({
  citizenId,
  existingIds,
}: UseAddRelativeParams) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [relation, setRelation] = useState<string>(FAMILY_RELATIONS[0])

  const addMutation = useAddFamilyMember(citizenId)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim())
    }, 300)

    return () => clearTimeout(timeout)
  }, [search])

  const canSearch =
    search.trim().length >= 2 &&
    search.trim() === debouncedSearch

  const searchQuery = useSearchCitizens(debouncedSearch)

  const excludedIds = new Set([citizenId, ...existingIds])

  const candidates = canSearch
    ? (searchQuery.data?.items ?? []).filter(
        citizen => !excludedIds.has(citizen.id),
      )
    : []

  const updateSearch = (value: string) => {
    setSearch(value)
    setSelectedId(null)
  }

  const toggleCitizen = (id: number) => {
    setSelectedId(previous => previous === id ? null : id)
  }

  const save = async (): Promise<boolean> => {
    if (selectedId === null || addMutation.isPending) {
      return false
    }

    try {
      await addMutation.mutateAsync({
        relativeId: selectedId,
        relation,
      })

      return true
    } catch {
      return false
    }
  }

  return {
    search,
    updateSearch,
    canSearch,
    candidates,
    selectedId,
    toggleCitizen,
    relation,
    setRelation,
    save,
    isSearching: canSearch && searchQuery.isFetching,
    isSearchError: canSearch && searchQuery.isError,
    isSaving: addMutation.isPending,
    isSaveError: addMutation.isError,
  }
}