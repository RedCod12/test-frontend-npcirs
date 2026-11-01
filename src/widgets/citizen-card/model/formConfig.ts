import { CITIES, CITIZEN_CATEGORIES, EDUCATION_LEVELS, GENDERS } from '@/entities/citizen'
import type { FieldConfig } from '@/shared/ui'

export const FORM_SECTIONS = {
  'Основное': [
    { key: 'fullName', label: 'ФИО', type: 'text', placeholder: 'Введите ФИО' },
    { key: 'birthDate', label: 'Дата рождения', type: 'date' },
    { key: 'gender', label: 'Пол', type: 'select', options: GENDERS },
    { key: 'city', label: 'Город', type: 'select', options: CITIES },
    { key: 'phone', label: 'Телефон', type: 'text', placeholder: '+7 (999) 999-99-99' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'example@mail.ru' },
    { key: 'category', label: 'Категория', type: 'select', options: CITIZEN_CATEGORIES },
    { key: 'note', label: 'Примечание', type: 'textarea', placeholder: 'Дополнительная информация' },
    { key: 'hasConsent', label: 'Согласие на обработку данных', type: 'checkbox' },
  ],
  'Документы': [
    { key: 'passportSeries', label: 'Серия паспорта', type: 'text', placeholder: '00 00' },
    { key: 'passportNumber', label: 'Номер паспорта', type: 'text', placeholder: '000000' },
    { key: 'passportIssuedAt', label: 'Дата выдачи', type: 'date' },
    { key: 'passportIssuer', label: 'Кем выдан', type: 'text', placeholder: 'Наименование органа' },
    { key: 'snils', label: 'СНИЛС', type: 'text', placeholder: '000-000-000 00' },
    { key: 'inn', label: 'ИНН', type: 'text', placeholder: '12 цифр' },
  ],
  'Адрес': [
    { key: 'region', label: 'Регион', type: 'text', placeholder: 'Например, Московская область' },
    { key: 'street', label: 'Улица', type: 'text', placeholder: 'Название улицы' },
    { key: 'house', label: 'Дом', type: 'text', placeholder: 'Номер дома' },
    { key: 'apartment', label: 'Квартира', type: 'number', placeholder: 'Номер квартиры' },
    { key: 'postalCode', label: 'Индекс', type: 'text', placeholder: '000000' },
  ],
  'Образование': [
    { key: 'educationLevel', label: 'Уровень образования', type: 'select', options: EDUCATION_LEVELS },
    { key: 'institution', label: 'Учебное заведение', type: 'text', placeholder: 'Название учебного заведения' },
    { key: 'graduationYear', label: 'Год окончания', type: 'number', placeholder: 'Например, 2024' },
    { key: 'specialty', label: 'Специальность', type: 'text', placeholder: 'Название специальности' },
  ],
} satisfies Record<string, readonly FieldConfig[]>

export type FormSectionTitle = keyof typeof FORM_SECTIONS

export const FAMILY_TAB = 'Семья'
export const CARD_TABS = [...(Object.keys(FORM_SECTIONS) as FormSectionTitle[]), FAMILY_TAB] as const
export type CardTab = (typeof CARD_TABS)[number]