import { useState } from 'react'
import { StatusBadge, type Citizen } from '@/entities/citizen'
import { Button, ErrorMessage, Tabs } from '@/shared/ui'
import { CARD_TABS, type CardTab } from '../model/formConfig'
import { useCitizenForm } from '../model/useCitizenForm'
import { CitizenCardContent } from './CitizenCardContent'

interface CitizenCardDetailsProps {
  citizen: Citizen
  onOpenCitizen: (id: number) => void
}

export function CitizenCardDetails({
  citizen,
  onOpenCitizen,
}: CitizenCardDetailsProps) {
  const [activeTab, setActiveTab] = useState<CardTab>(CARD_TABS[0])

  const {
    values,
    errors,
    isEditing,
    isSaving,
    isError,
    updateValue,
    handleEdit,
    handleCancel,
    handleSave,
  } = useCitizenForm(citizen)

  return (
    <>
      <header className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-lg font-semibold text-brand-700">
          {citizen.fullName[0]}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-slate-900">
              {citizen.fullName}
            </h3>

            <StatusBadge status={citizen.status} />
          </div>

          <p className="text-xs text-slate-500">
            ID {citizen.id} · {citizen.category}
          </p>
        </div>
      </header>

      <Tabs
        tabs={CARD_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <CitizenCardContent
        errors={errors}
        citizenId={citizen.id}
        activeTab={activeTab}
        values={values}
        isEditing={isEditing}
        onChange={updateValue}
        onOpenCitizen={onOpenCitizen}
      />

      <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-5">
        {Object.keys(errors).length > 0 && (
          <ErrorMessage
            text="Проверьте заполненные поля во всех разделах"
            className="mb-3"
          />
        )}

        {isEditing ? (
          <>
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Отмена
            </Button>

            <Button
              variant="primary"
              onClick={handleSave}
              loading={isSaving}
            >
              Сохранить
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleEdit}>
            Редактировать
          </Button>
        )}
      </div>

      {isError && (
        <ErrorMessage
          text="Не удалось сохранить изменения"
          className="mt-3"
        />
      )}
    </>
  )
}