import type { CountedItem } from '@/shared/lib'
import type { CITIZEN_STATUSES, GENDERS } from '../config/constants'

export type Gender = (typeof GENDERS)[number]
export type CitizenStatus = (typeof CITIZEN_STATUSES)[number]

export interface Citizen {
  id: number
  fullName: string
  gender: Gender
  birthDate: string
  city: string
  status: CitizenStatus
  category: string
  educationLevel: string
  phone: string
  email: string
  registeredAt: string
}

export interface CitizenFilters {
  search: string
  city: string
  status: string
  gender: string
}

export interface CitizensPage {
  items: Citizen[]
  matchedTotal: number
  overallTotal: number
}

export interface CitizenStats {
  total: number
  byCity: CountedItem[]
  byStatus: CountedItem[]
  byCategory: CountedItem[]
  byRegistrationYear: CountedItem[]
}

export interface FamilyMember {
  id: number
  fullName: string
  relation: string
  birthDate: string
}