export const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 'Ростов-на-Дону'] as const

export const GENDERS = ['М', 'Ж'] as const

export const CITIZEN_STATUSES = ['Активен', 'На проверке', 'Заблокирован', 'Архив'] as const

export const CITIZEN_CATEGORIES = ['Пенсионер', 'Работающий', 'Студент', 'Инвалид', 'Многодетная семья'] as const

export const EDUCATION_LEVELS = ['Среднее', 'СПО', 'Бакалавр', 'Магистр', 'Кандидат наук'] as const

export const EMPLOYMENT_TYPES = [
    'Постоянная',
    'Временная',
    'Договор ГПХ',
    'Самозанятый',
    'Не работает',
] as const

export const BENEFIT_CATEGORIES = [
    'Нет льготы',
    'Ветеран труда',
    'Инвалид I группы',
    'Инвалид II группы',
    'Многодетная семья',
    'Чернобылец',
] as const

export const CONTACT_CHANNELS = [
    'Телефон',
    'Email',
    'Госуслуги',
    'Личный приём',
    'Почта',
] as const

export const FAMILY_RELATIONS = [
  'Мать',
  'Отец',
  'Сын',
  'Дочь',
  'Брат',
  'Сестра',
  'Супруг(а)',
  'Другое',
] as const

export const RELATED_TABLE_IDS = ['requests', 'documents', 'tasks', 'deals', 'family'] as const