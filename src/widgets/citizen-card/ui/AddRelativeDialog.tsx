import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    FAMILY_RELATIONS,
    useAddFamilyMember,
} from '@/entities/citizen'
import { fetchCitizens } from '@/entities/citizen/api/citizenApi'
import { Button, ErrorMessage, FormField, Input, Loader } from '@/shared/ui'

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

    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [relation, setRelation] = useState<string>(FAMILY_RELATIONS[0])

    const addMutation = useAddFamilyMember(citizenId)

    useEffect(() => {
        dialogRef.current?.showModal()

        return () => dialogRef.current?.close()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search.trim())
        }, 300)

        return () => clearTimeout(timeout)
    }, [search])

    const normalizedSearch = search.trim()

    const canSearch =
        normalizedSearch.length >= 2 &&
        normalizedSearch === debouncedSearch

    const { data, isFetching, isError: isSearchError } = useQuery({
        queryKey: ['citizens', 'family-search', debouncedSearch],
        queryFn: () => fetchCitizens({
            filters: {
                search: debouncedSearch,
                city: '',
                gender: '',
                status: '',
            },
            offset: 0,
            limit: 20,
        }),
        enabled: canSearch,
    })

    const excludedIds = new Set([citizenId, ...existingIds])

    const candidates = canSearch
        ? (data?.items ?? []).filter(citizen => !excludedIds.has(citizen.id))
        : []

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (selectedId === null || addMutation.isPending) return

        try {
            await addMutation.mutateAsync({
                relativeId: selectedId,
                relation,
            })

            dialogRef.current?.close()
        } catch {
        }
    }

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            aria-labelledby="add-relative-title"
            className="m-auto h-145 max-h-[85dvh] w-[min(92vw,520px)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-xl backdrop:bg-slate-950/40" >
            <form onSubmit={handleSubmit} className="flex h-full min-h-0 flex-col gap-5">
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
                            onChange={event => {
                                setSearch(event.target.value)
                                setSelectedId(null)
                            }}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="min-h-0 flex-1">
                    {canSearch && (
                        <div className="max-h-52 space-y-1 overflow-y-auto rounded-xl border border-slate-200 p-2">
                            {isFetching && (
                                <Loader size="sm" className="py-4" />
                            )}

                            {isSearchError && (
                                <ErrorMessage text="Не удалось выполнить поиск" />
                            )}

                            {!isFetching && !isSearchError && candidates.length === 0 && (
                                <p className="py-4 text-center text-sm text-slate-500">
                                    Никого не найдено
                                </p>
                            )}

                            {!isFetching && !isSearchError && candidates.map(citizen => (
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
                                        onChange={() => {
                                            setSelectedId(previous =>
                                                previous === citizen.id ? null : citizen.id
                                            )
                                        }}
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

                    {addMutation.isError && (
                        <ErrorMessage text="Не удалось добавить родственника" />
                    )}

                    <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                        <Button
                            variant="secondary"
                            disabled={addMutation.isPending}
                            onClick={() => dialogRef.current?.close()}
                        >
                            Отмена
                        </Button>

                        <Button
                            type="submit"
                            loading={addMutation.isPending}
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