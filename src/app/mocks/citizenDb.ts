import {
  CITIES,
  CITIZEN_CATEGORIES,
  CITIZEN_STATUSES,
  EDUCATION_LEVELS,
  type Citizen,
  type CitizenFilters,
  type CitizenStats,
  type Gender,
} from '@/entities/citizen'
import { createSeededRandom, pickRandom, type Random } from '@/shared/lib'

export const CITIZENS_TOTAL = 100_000

const SURNAMES = ['Иванов', 'Петров', 'Смирнов', 'Кузнецов', 'Попов', 'Соколов', 'Лебедев', 'Козлов', 'Новиков', 'Морозов']
const MALE_NAMES = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей']
const FEMALE_NAMES = ['Анна', 'Мария', 'Елена', 'Ольга', 'Наталья', 'Виктория']
const MALE_PATRONYMICS = ['Иванович', 'Петрович', 'Сергеевич', 'Андреевич']
const FEMALE_PATRONYMICS = ['Ивановна', 'Петровна', 'Сергеевна', 'Андреевна']
const WEIGHTED_STATUSES = [...CITIZEN_STATUSES, 'Активен', 'Активен'] as const

const padTwoDigits = (value: number) => String(value).padStart(2, '0')

function createIsoDate(random: Random, fromYear: number, toYear: number): string {
  const year = fromYear + Math.floor(random() * (toYear - fromYear))
  const month = 1 + Math.floor(random() * 12)
  const day = 1 + Math.floor(random() * 28)
  return `${year}-${padTwoDigits(month)}-${padTwoDigits(day)}`
}

function createFullName(random: Random, gender: Gender, maleSurname = pickRandom(random, SURNAMES)): string {
  const isFemale = gender === 'Ж'
  const surname = isFemale ? `${maleSurname}а` : maleSurname
  const name = pickRandom(random, isFemale ? FEMALE_NAMES : MALE_NAMES)
  const patronymic = pickRandom(random, isFemale ? FEMALE_PATRONYMICS : MALE_PATRONYMICS)
  return `${surname} ${name} ${patronymic}`
}

function createPhone(random: Random): string {
  const digits = String(Math.floor(random() * 1e8)).padStart(8, '0')
  return `+7 9${digits.slice(0, 2)} ${digits.slice(2, 5)}-${digits.slice(5)}`
}

export function createCitizen(id: number): Citizen {
  const random = createSeededRandom(id + 1)
  const gender: Gender = random() > 0.5 ? 'Ж' : 'М'
  return {
    id,
    gender,
    fullName: createFullName(random, gender),
    birthDate: createIsoDate(random, 1940, 2008),
    city: pickRandom(random, CITIES),
    status: pickRandom(random, WEIGHTED_STATUSES),
    category: pickRandom(random, CITIZEN_CATEGORIES),
    educationLevel: pickRandom(random, EDUCATION_LEVELS),
    phone: createPhone(random),
    email: `user${id}@mail.ru`,
    registeredAt: createIsoDate(random, 2022, 2026),
  }
}

export function getCitizenById(id: number): Citizen | undefined {
  if (!Number.isInteger(id) || id < 0 || id >= CITIZENS_TOTAL) return undefined
  return createCitizen(id)
}

function matchesFilters(citizen: Citizen, filters: CitizenFilters): boolean {
  const search = filters.search.trim().toLowerCase()
  return (
    (!search || citizen.fullName.toLowerCase().includes(search)) &&
    (!filters.city || citizen.city === filters.city) &&
    (!filters.status || citizen.status === filters.status) &&
    (!filters.gender || citizen.gender === filters.gender)
  )
}

export function getUpdatedCitizen(
  id: number,
  updates: ReadonlyMap<number, Partial<Citizen>>,
): Citizen | undefined {
  const citizen = getCitizenById(id)

  if (!citizen) return undefined

  return {
    ...citizen,
    ...updates.get(id),
  }
}

export function queryCitizens(
  filters: CitizenFilters,
  offset: number,
  limit: number,
  updates: ReadonlyMap<number, Partial<Citizen>>,
) {
  const items: Citizen[] = []
  let matchedTotal = 0

  for (let id = 0; id < CITIZENS_TOTAL; id++) {
    const citizen = getUpdatedCitizen(id, updates)

    if (!citizen || !matchesFilters(citizen, filters)) continue

    if (matchedTotal >= offset && items.length < limit) {
      items.push(citizen)
    }

    matchedTotal++
  }

  return {
    items,
    matchedTotal,
    overallTotal: CITIZENS_TOTAL,
  }
}

function increment(counts: Map<string, number>, label: string) {
  counts.set(label, (counts.get(label) ?? 0) + 1)
}

function toCountedItems(counts: Map<string, number>, sortByLabel = false) {
  const items = [...counts.entries()]
  return sortByLabel
    ? items.sort(([labelA], [labelB]) => labelA.localeCompare(labelB))
    : items.sort((a, b) => b[1] - a[1])
}

export function getCitizenStats(
  updates: ReadonlyMap<number, Partial<Citizen>>,
): CitizenStats {
  const byCity = new Map<string, number>()
  const byStatus = new Map<string, number>()
  const byCategory = new Map<string, number>()
  const byRegistrationYear = new Map<string, number>()

  for (let id = 0; id < CITIZENS_TOTAL; id++) {
    const citizen = getUpdatedCitizen(id, updates)

    if (!citizen) continue

    increment(byCity, citizen.city)
    increment(byStatus, citizen.status)
    increment(byCategory, citizen.category)
    increment(byRegistrationYear, citizen.registeredAt.slice(0, 4))
  }

  return {
    total: CITIZENS_TOTAL,
    byCity: toCountedItems(byCity),
    byStatus: toCountedItems(byStatus),
    byCategory: toCountedItems(byCategory),
    byRegistrationYear: toCountedItems(byRegistrationYear, true),
  }
}