import { useEffect, useRef, type FormEvent } from 'react'
import { FAMILY_RELATIONS } from '@/entities/citizen'
import { Button, ErrorMessage, FormField, Input, Loader } from '@/shared/ui'
import { useAddRelative } from '../model/useAddRelative'

interface AddRelativeDialogProps {
    citizenId: number
    onClose: () => void
    existingIds: readonly number[]
}

export function AddRelativeDialog({
    citizenId,
    onClose,
    existingIds,
}: AddRelativeDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const {
        search,
        updateSearch,
        canSearch,
        candidates,
        selectedId,
        toggleCitizen,
        relation,
        setRelation,
        save,
        isSearching,
        isSearchError,
        isSaving,
        isSaveError,
    } = useAddRelative({ citizenId, existingIds })

    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.showModal()

        return () => dialog?.close()
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const success = await save()

        if (success) dialogRef.current?.close()
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            aria-labelledby="add-relative-title"
            className="m-auto h-145 max-h-[85dvh] w-[min(92vw,520px)]
      overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-xl backdrop:bg-slate-950/40"
        >
            <form
                onSubmit={handleSubmit}
                className="flex h-full min-h-0 flex-col gap-5"
            >
                <div className="shrink-0 space-y-5">
                    <div>
                        <h3
                            id="add-relative-title"
                            className="text-lg font-semibold text-slate-900"
                        >
                            Добавить родственника
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Выберите гражданина из картотеки.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="relative-search"
                            className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                            Поиск по ФИО
                        </label>

                        <Input
                            id="relative-search"
                            type="search"
                            value={search}
                            placeholder="Начните вводить ФИО"
                            onChange={event => updateSearch(event.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="min-h-0 flex-1">
                    {canSearch && (
                        <div className="h-full space-y-1 overflow-y-auto rounded-xl border border-slate-200 p-2">
                            {isSearching && <Loader size="sm" className="py-4" />}

                            {isSearchError && (
                                <ErrorMessage text="Не удалось выполнить поиск" />
                            )}

                            {!isSearching && !isSearchError && candidates.length === 0 && (
                                <p className="py-4 text-center text-sm text-slate-500">
                                    Никого не найдено
                                </p>
                            )}

                            {!isSearching && !isSearchError && candidates.map(citizen => (
                                <div
                                    key={citizen.id}
                                    className="flex items-center w-full gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
                                >
                                    <label
                                        key={citizen.id}
                                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50"
                                    >
                                        <FormField
                                            config={{
                                                key: String(citizen.id),
                                                label: "",
                                                type: 'checkbox',
                                            }}
                                            value={selectedId === citizen.id}
                                            onChange={() => toggleCitizen(citizen.id)}
                                        />

                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-medium">
                                                {citizen.fullName}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                ID {citizen.id}
                                            </span>
                                        </span>
                                    </label>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-auto shrink-0 space-y-5">
                    <FormField
                        config={{
                            key: 'relation',
                            label: 'Степень родства',
                            type: 'select',
                            options: FAMILY_RELATIONS,
                        }}
                        value={relation}
                        onChange={(_, value) => setRelation(String(value))}
                    />

                    {isSaveError && (
                        <ErrorMessage text="Не удалось добавить родственника" />
                    )}

                    <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                        <Button
                            variant="secondary"
                            disabled={isSaving}
                            onClick={() => dialogRef.current?.close()}
                        >
                            Отмена
                        </Button>

                        <Button
                            type="submit"
                            loading={isSaving}
                            disabled={selectedId === null}
                        >
                            Добавить
                        </Button>
                    </div>
                </div>
            </form>
        </dialog>
    )
}