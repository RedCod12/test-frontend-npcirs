import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import type { CitizenFilters } from '../model/types'
import {
  fetchCitizens,
  fetchCitizenStats,
  fetchFamilyMembers,
  updateCitizen,
  addFamilyMember,
  removeFamilyMember
} from './citizenApi'
import { fetchCitizenById } from './citizenApi'

const PAGE_SIZE = 100

export function useCitizens(filters: CitizenFilters) {
  const query = useInfiniteQuery({
    queryKey: ['citizens', 'list', filters],
    queryFn: ({ pageParam }) => fetchCitizens({ filters, offset: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((sum, page) => sum + page.items.length, 0)
      return loadedCount < lastPage.matchedTotal ? loadedCount : undefined
    },
    placeholderData: keepPreviousData,
  })

  const pages = query.data?.pages
  return {
    citizens: pages?.flatMap(page => page.items) ?? [],
    matchedTotal: pages?.[0].matchedTotal ?? 0,
    overallTotal: pages?.[0].overallTotal ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  }
}

export const useCitizenStats = () =>
  useQuery({ queryKey: ['citizens', 'stats'], queryFn: fetchCitizenStats, staleTime: Infinity })

export const useFamilyMembers = (citizenId: number, enabled: boolean) =>
  useQuery({ queryKey: ['citizens', citizenId, 'family'], queryFn: () => fetchFamilyMembers(citizenId), enabled })

export const useUpdateCitizen = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number
      values: Record<string, unknown>
    }) => updateCitizen(id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['citizens'],
      })
    },
  })
}

export const useAddFamilyMember = (citizenId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      relativeId,
      relation,
    }: {
      relativeId: number
      relation: string
    }) => addFamilyMember(citizenId, relativeId, relation),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['citizens', citizenId, 'family'],
      }),
  })
}

export const useRemoveFamilyMember = (citizenId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (relativeId: number) =>
      removeFamilyMember(citizenId, relativeId),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['citizens', citizenId, 'family'],
      }),
  })
}

export const useCitizenById = (id: number | null) =>
  useQuery({
    queryKey: ['citizens', 'detail', id],
    queryFn: () => fetchCitizenById(id!),
    enabled: id !== null,
  })

export const useSearchCitizens = (search: string) => {
  return useQuery({
    queryKey: ['citizens', 'search', search],
    queryFn: () =>
      fetchCitizens({
        filters: {
          search,
          city: '',
          gender: '',
          status: '',
        },
        offset: 0,
        limit: 20,
      }),
    enabled: search.length >= 2,
  })
}