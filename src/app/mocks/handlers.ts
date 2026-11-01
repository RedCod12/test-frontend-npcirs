import {
  delay,
  http,
  HttpResponse
} from 'msw'
import type { Citizen, CitizenFilters, FamilyMember } from '@/entities/citizen'
import {
  getCitizenById,
  getUpdatedCitizen,
  getCitizenStats,
  queryCitizens,
} from './citizenDb'
import { FAMILY_RELATIONS } from '@/entities/citizen/config/constants'

interface FamilyLink {
  relativeId: number
  relation: string
}

const NETWORK_DELAY_MS = 300
const DEFAULT_PAGE_SIZE = 50

const updatedCitizens = new Map<number, Partial<Citizen>>()

const familyLinks = new Map<number, FamilyLink[]>()

function getFamilyLinks(citizenId: number): FamilyLink[] {
  const existing = familyLinks.get(citizenId)
  if (existing) return existing

  const links: FamilyLink[] = [
    {
      relativeId: (citizenId + 1) % 100_000,
      relation: 'Брат',
    },
    {
      relativeId: (citizenId + 2) % 100_000,
      relation: 'Сестра',
    },
  ]

  familyLinks.set(citizenId, links)
  return links
}

export const handlers = [
  http.get('/api/citizens', async ({ request }) => {
    const params = new URL(request.url).searchParams
    const filters: CitizenFilters = {
      search: params.get('search') ?? '',
      city: params.get('city') ?? '',
      status: params.get('status') ?? '',
      gender: params.get('gender') ?? '',
    }

    const offset = Number(params.get('offset') ?? 0)
    const limit = Number(params.get('limit') ?? DEFAULT_PAGE_SIZE)
    const page = queryCitizens(filters, offset, limit, updatedCitizens)

    await delay(NETWORK_DELAY_MS)

    return HttpResponse.json(page)
  }),

  http.get('/api/citizens/stats', async () => {
    await delay(NETWORK_DELAY_MS)

    return HttpResponse.json(getCitizenStats(updatedCitizens))
  }),

  http.get('/api/citizens/:id', async ({ params }) => {
    const citizen = getUpdatedCitizen(Number(params.id), updatedCitizens)

    if (!citizen) {
      return new HttpResponse(null, { status: 404 })
    }

    await delay(NETWORK_DELAY_MS)

    return HttpResponse.json(citizen)
  }),

  http.get('/api/citizens/:id/family', async ({ params }) => {
    const citizenId = Number(params.id)

    if (!getCitizenById(citizenId)) {
      return new HttpResponse(null, { status: 404 })
    }

    const members: FamilyMember[] = getFamilyLinks(citizenId)
      .map(({ relativeId, relation }) => {
        const citizen = getUpdatedCitizen(relativeId, updatedCitizens)
        if (!citizen) return null

        return {
          id: citizen.id,
          fullName: citizen.fullName,
          birthDate: citizen.birthDate,
          relation,
        }
      })
      .filter((member): member is FamilyMember => member !== null)

    await delay(NETWORK_DELAY_MS)

    return HttpResponse.json(members)
  }),
  http.post('/api/citizens/:id/family', async ({ params, request }) => {
    const citizenId = Number(params.id)

    const body = await request.json() as {
      relativeId: number
      relation: string
    }

    if (!getCitizenById(citizenId) || !getCitizenById(body.relativeId)) {
      return HttpResponse.json(
        { message: 'Гражданин не найден' },
        { status: 404 },
      )
    }

    if (
      citizenId === body.relativeId ||
      !FAMILY_RELATIONS.some(relation => relation === body.relation)
    ) {
      return HttpResponse.json(
        { message: 'Некорректные данные' },
        { status: 400 },
      )
    }

    const links = getFamilyLinks(citizenId)

    if (links.some(link => link.relativeId === body.relativeId)) {
      return HttpResponse.json(
        { message: 'Родственник уже добавлен' },
        { status: 409 },
      )
    }

    links.push(body)

    await delay(NETWORK_DELAY_MS)

    return HttpResponse.json({ success: true }, { status: 201 })
  }),

  http.delete('/api/citizens/:id/family/:relativeId', async ({ params }) => {
    const citizenId = Number(params.id)
    const relativeId = Number(params.relativeId)

    if (!getCitizenById(citizenId)) {
      return new HttpResponse(null, { status: 404 })
    }

    const links = getFamilyLinks(citizenId)
    const nextLinks = links.filter(link => link.relativeId !== relativeId)

    if (nextLinks.length === links.length) {
      return new HttpResponse(null, { status: 404 })
    }

    familyLinks.set(citizenId, nextLinks)

    await delay(NETWORK_DELAY_MS)

    return new HttpResponse(null, { status: 204 })
  }),

  http.patch('/api/citizens/:id', async ({ params, request }) => {

    const id = Number(params.id)

    if (!getCitizenById(id)) {
      return new HttpResponse(null, { status: 404 })
    }

    const changes = await request.json() as Partial<Citizen>

    updatedCitizens.set(id, {
      ...updatedCitizens.get(id),
      ...changes,
    })

    return HttpResponse.json({ success: true })
  }),
]