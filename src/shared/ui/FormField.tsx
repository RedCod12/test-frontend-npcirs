import type { ChangeEvent } from 'react'
import chevronDown from '@/shared/assets/icons/chevron-down.svg'
import { ErrorMessage } from './ErrorMessage'
import { Input } from './Input'

export type FieldType = 'text' | 'date' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox'
export type FieldValue = string | boolean

export interface FieldConfig {
  key: string
  label: string
  type: FieldType
  options?: readonly string[]
  placeholder?: string
}

interface FormFieldProps {
  config: FieldConfig
  value: FieldValue
  onChange: (key: string, value: FieldValue) => void
  disabled?: boolean
  error?: string
}

const fieldClass = `mt-1.5 w-full 
flex items-center space-between min-w-0 rounded-lg border border-slate-200 bg-white px-3 
py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 
focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 disabled:cursor-default disabled:bg-slate-50 disabled:text-slate-600`

export const FormField = ({
  config,
  value,
  onChange,
  disabled = false,
  error,
}: FormFieldProps) => {
  const { key, label, type, options = [], placeholder } = config

  if (type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm text-slate-700">
        <input
          type="checkbox"
          className="h-4 w-4 accent-brand-600 disabled:opacity-60"
          checked={Boolean(value)}
          disabled={disabled}
          onChange={event => onChange(key, event.target.checked)}
        />
        {label}
      </label>
    )
  }

  const inputProps = {
    value: String(value ?? ''),
    placeholder,
    disabled,
    'aria-invalid': Boolean(error),
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => onChange(key, event.target.value),
  }

  return (
    <label className={`block min-w-0 text-sm font-medium text-slate-600 ${type === 'textarea' ? 'sm:col-span-2' : ''}`}>
      {label}
      {type === 'select' ? (
        <div className="relative">
          <select
            {...inputProps}
            className={`${fieldClass} appearance-none pr-10`}
          >
            <option value="">Не указано</option>

            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <img
            src={chevronDown}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
          />
        </div>
      ) : type === 'textarea' ? (
        <textarea
          {...inputProps}
          rows={3}
          className={fieldClass}
        />
      ) : (
        <Input
          type={type}
          {...inputProps}
          className="mt-1.5 w-full"
        />
      )}

      {error && (
        <ErrorMessage
          text={error}
          className="mt-1 text-left"
        />
      )}
    </label>
  )
}
