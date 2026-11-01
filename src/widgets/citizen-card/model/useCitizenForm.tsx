import { useState } from 'react'
import { useUpdateCitizen, type Citizen } from '@/entities/citizen'
import type { FieldValue } from '@/shared/ui'
import { buildInitialValues } from './buildInitialValues'
import { citizenFormSchema } from './validationSchema'

export function useCitizenForm(citizen: Citizen) {
  const [values, setValues] = useState(() => buildInitialValues(citizen))
  const [savedValues, setSavedValues] = useState(() => buildInitialValues(citizen))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isEditing, setIsEditing] = useState(false)

  const mutation = useUpdateCitizen()

  const updateValue = (key: string, value: FieldValue) => {
    setValues(previous => ({
      ...previous,
      [key]: value,
    }))

    setErrors(previous => {
      const next = { ...previous }
      delete next[key]
      return next
    })
  }

  const handleEdit = () => {
    mutation.reset()
    setErrors({})
    setIsEditing(true)
  }

  const handleCancel = () => {
    mutation.reset()
    setValues({ ...savedValues })
    setErrors({})
    setIsEditing(false)
  }

  const handleSave = async () => {
    const result = citizenFormSchema.safeParse(values)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}

      for (const issue of result.error.issues) {
        const key = String(issue.path[0])

        fieldErrors[key] ??= issue.message
      }

      setErrors(fieldErrors)
      return
    }

    try {
      await mutation.mutateAsync({
        id: citizen.id,
        values: result.data,
      })

      setValues(result.data)
      setSavedValues(result.data)
      setErrors({})
      setIsEditing(false)
    } catch (error) {
      console.error('Ошибка сохранения карточки:', error)
    }
  }

  return {
    values,
    errors,
    isEditing,
    isSaving: mutation.isPending,
    isError: mutation.isError,
    updateValue,
    handleEdit,
    handleCancel,
    handleSave,
  }
}