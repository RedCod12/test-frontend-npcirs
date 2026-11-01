import { getJson } from '@/shared/api'
import type { CitizenFilters, CitizenStats, CitizensPage, FamilyMember } from '../model/types'
import type { Citizen } from '../model/types'

interface FetchCitizensParams { filters: CitizenFilters; offset: number; limit: number }

export const fetchCitizens = ({ filters, offset, limit }: FetchCitizensParams) =>
  getJson<CitizensPage>('/citizens', { ...filters, offset, limit })

export const fetchFamilyMembers = (citizenId: number) =>
  getJson<FamilyMember[]>(`/citizens/${citizenId}/family`)

export const fetchCitizenById = (id: number) =>
  getJson<Citizen>(`/citizens/${id}`)

export const fetchCitizenStats = () => getJson<CitizenStats>('/citizens/stats')

export const updateCitizen = async (
  id: number,
  values: Record<string, unknown>,
) => {
  const response = await fetch(`/api/citizens/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error('Не удалось сохранить изменения');
  }

  return response.json();
}

export const addFamilyMember = async (
  citizenId: number,
  relativeId: number,
  relation: string,
) => {
  const response = await fetch(`/api/citizens/${citizenId}/family`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ relativeId, relation }),
  })

  if (!response.ok) {
    throw new Error('Не удалось добавить родственника')
  }
}

export const removeFamilyMember = async (
  citizenId: number,
  relativeId: number,
) => {
  const response = await fetch(
    `/api/citizens/${citizenId}/family/${relativeId}`,
    { method: 'DELETE' },
  )

  if (!response.ok) {
    throw new Error('Не удалось удалить родственника')
  }
}
