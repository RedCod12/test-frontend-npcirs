import { z } from 'zod'
import {
    CITIES,
    CITIZEN_CATEGORIES,
    CITIZEN_STATUSES,
    EDUCATION_LEVELS,
    GENDERS,
} from '@/entities/citizen'

const optionalText = z.string().trim()

const requiredText = (label: string) =>
    z.string().trim().min(1, `Укажите ${label}`)

const optionalPattern = (pattern: RegExp, message: string) =>
    z.string().trim().refine(
        value => !value || pattern.test(value),
        message,
    )

const requiredDate = z.iso.date()

const optionalDate = z.union([
    z.literal(''),
    z.iso.date(),
])

const optionalYear = z.string().refine(value => {
    if (!value) return true

    const year = Number(value)
    const currentYear = new Date().getFullYear()

    return /^\d{4}$/.test(value) && year >= 1900 && year <= currentYear
}, 'Укажите корректный год')

export const citizenFormSchema = z.object({
    fullName: requiredText('ФИО'),
    birthDate: requiredDate,
    gender: z.enum(GENDERS),
    city: z.enum(CITIES),
    phone: optionalPattern(
        /^\+?[\d\s()-]{10,20}$/,
        'Укажите корректный телефон',
    ),
    email: z.union([
        z.literal(''),
        z.email('Укажите корректный email'),
    ]),
    status: z.enum(CITIZEN_STATUSES),
    category: z.enum(CITIZEN_CATEGORIES),
    note: optionalText,
    hasConsent: z.boolean(),
    passportSeries: optionalPattern(
        /^\d{2}\s?\d{2}$/,
        'Серия паспорта должна содержать 4 цифры',
    ),
    passportNumber: optionalPattern(
        /^\d{6}$/,
        'Номер паспорта должен содержать 6 цифр',
    ),
    passportIssuedAt: optionalDate,
    passportIssuer: optionalText,
    snils: optionalPattern(
        /^\d{3}-?\d{3}-?\d{3}\s?\d{2}$/,
        'Укажите СНИЛС в формате 000-000-000 00',
    ),
    inn: optionalPattern(
        /^\d{12}$/,
        'ИНН должен содержать 12 цифр',
    ),
    region: optionalText,
    street: optionalText,
    house: optionalText,
    apartment: optionalPattern(
        /^\d+$/,
        'Номер квартиры должен быть целым положительным числом',
    ),
    postalCode: optionalPattern(
        /^\d{6}$/,
        'Почтовый индекс должен содержать 6 цифр',
    ),

    educationLevel: z.union([
        z.literal(''),
        z.enum(EDUCATION_LEVELS),
    ]),
    institution: optionalText,
    graduationYear: optionalYear,
    specialty: optionalText,
})

export type CitizenFormValues = z.infer<typeof citizenFormSchema>