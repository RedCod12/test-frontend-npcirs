import type { Citizen } from '@/entities/citizen'
import type { FieldValue } from '@/shared/ui'
import { FORM_SECTIONS } from './formConfig'

export function buildInitialValues(citizen: Citizen): Record<string, FieldValue> {
  const source: Record<string, unknown> = { ...citizen }
  const values: Record<string, FieldValue> = {}

  for (const fields of Object.values(FORM_SECTIONS)) {
    for (const { key, type } of fields) {
      const value = source[key]
      values[key] = type === 'checkbox'
        ? Boolean(value)
        : typeof value === 'string' ? value : ''
    }
  }
  return values
}
