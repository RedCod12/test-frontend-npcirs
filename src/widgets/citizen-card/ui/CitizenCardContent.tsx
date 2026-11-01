
import { useFamilyMembers, useRemoveFamilyMember, type Citizen } from '@/entities/citizen'
import { Button, ErrorMessage, Loader, type FieldValue } from '@/shared/ui'
import { FAMILY_TAB, FORM_SECTIONS, type CardTab } from '../model/formConfig'
import { CitizenForm } from './CitizenForm'
import { FamilyTable } from './FamilyTable'
import { useState } from 'react'
import { AddRelativeDialog } from './AddRelativeDialog'

interface CitizenCardContentProps {
    citizenId: Citizen['id']
    activeTab: CardTab
    values: Record<string, FieldValue>
    isEditing: boolean
    onChange: (key: string, value: FieldValue) => void
    errors: Record<string, string>
    onOpenCitizen: (id: number) => void
}

export function CitizenCardContent({
    citizenId,
    activeTab,
    values,
    isEditing,
    onChange,
    errors,
    onOpenCitizen
}: CitizenCardContentProps) {
    const {
        data: familyMembers = [],
        isLoading,
        isError,
    } = useFamilyMembers(
        citizenId,
        activeTab === FAMILY_TAB,
    )
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const removeMutation = useRemoveFamilyMember(citizenId)

    const handleDelete = async (relativeId: number) => {
        try {
            await removeMutation.mutateAsync(relativeId)
        } catch {
        }
    }

    if (activeTab !== FAMILY_TAB) {
        return (
            <CitizenForm
                fields={FORM_SECTIONS[activeTab]}
                values={values}
                errors={errors}
                onChange={onChange}
                disabled={!isEditing}
            />
        )
    }

    if (isLoading) {
        return (
            <Loader
                size="sm"
                text="Загрузка родственников…"
                className="py-5"
            />
        )
    }

    if (isError) {
        return (
            <ErrorMessage
                text="Не удалось загрузить статистику"
                className="py-5"
            />
        )
    }

    return (
        <div className="space-y-4">
            {isEditing && (
                <div className="flex justify-end">
                    <Button
                        variant="secondary"
                        onClick={() => setIsAddDialogOpen(true)}
                    >
                        + Добавить родственника
                    </Button>
                </div>
            )}

            <FamilyTable
                members={familyMembers}
                deletingId={removeMutation.isPending ? removeMutation.variables : null}
                isEditing={isEditing}
                onOpen={onOpenCitizen}
                onDelete={handleDelete}
            />

            {removeMutation.isError && (
                <ErrorMessage text="Не удалось удалить родственника" />
            )}

            {isAddDialogOpen && isEditing && (
                <AddRelativeDialog
                    citizenId={citizenId}
                    existingIds={familyMembers.map(member => member.id)}
                    onClose={() => setIsAddDialogOpen(false)}
                />
            )}
        </div>
    )
}
