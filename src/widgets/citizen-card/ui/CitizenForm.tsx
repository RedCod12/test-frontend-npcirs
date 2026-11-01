import { FormField, type FieldConfig, type FieldValue } from '@/shared/ui'

interface CitizenFormProps {
  fields: readonly FieldConfig[]
  values: Record<string, FieldValue>
  errors: Record<string, string>
  onChange: (key: string, value: FieldValue) => void
  disabled: boolean
}

export const CitizenForm = ({
  fields,
  values,
  errors,
  onChange,
  disabled,
}: CitizenFormProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(field => (
        <FormField
          key={field.key}
          config={field}
          value={values[field.key]}
          error={errors[field.key]}
          onChange={onChange}
          disabled={disabled}
        />
      ))}
    </div>
  )
}