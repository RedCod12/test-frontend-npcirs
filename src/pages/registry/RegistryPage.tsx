import { useState } from 'react'
import { useCitizenById, useCitizens, type Citizen } from '@/entities/citizen'
import { CitizenFiltersPanel, useCitizenFilters } from '@/features/citizen-filters'
import { formatNumber } from '@/shared/lib'
import { CitizenCard } from '@/widgets/citizen-card'
import { CitizenList } from '@/widgets/citizen-list'
import { ErrorMessage, Loader } from '@/shared/ui'

export function RegistryPage() {
  const { filters, queryFilters, updateFilter } = useCitizenFilters()
  const list = useCitizens(queryFilters)


  const [selectedCitizenId, setSelectedCitizenId] = useState<number | null>(null)

  const {
    data: selectedCitizen,
    isLoading: isCitizenLoading,
    isError: isCitizenError,
  } = useCitizenById(selectedCitizenId)

  const handleSelectCitizen = (citizen: Citizen) => {
    setSelectedCitizenId(previous =>
      previous === citizen.id ? null : citizen.id
    )
  }

  const renderList = () => {
    if (list.isLoading) return <Loader className="py-12" />
    if (list.citizens.length === 0) return <p className="py-12 text-center text-slate-500">Ничего не найдено</p>
    return (

      <CitizenList
        citizens={list.citizens}
        hasMore={list.hasNextPage}
        isLoadingMore={list.isFetchingNextPage}
        onLoadMore={list.fetchNextPage}
        selectedCitizenId={selectedCitizenId ?? undefined}
        onSelect={handleSelectCitizen}
      />
    )
  }

  return (
    <div className="space-y-5">
      <h2 className="flex flex-wrap items-baseline gap-3 text-2xl font-semibold tracking-tight text-slate-900">
        Картотека
        {!list.isLoading &&
          <span className="text-sm font-normal text-slate-500">{formatNumber(list.matchedTotal)} из {formatNumber(list.overallTotal)}</span>}
      </h2>
      <CitizenFiltersPanel filters={filters} onChange={updateFilter} />
      {list.isError ? (
        <ErrorMessage
          text="Не удалось загрузить статистику"
          className="py-12"
        />
      ) : (
        <div className="min-w-0 w-full flex justify-between gap-2 max-xl:flex-col">
          {renderList()}

          {selectedCitizenId !== null && (
            <CitizenCard
              citizen={selectedCitizen}
              isCitizenLoading={isCitizenLoading}
              isCitizenError={isCitizenError}
              onOpenCitizen={setSelectedCitizenId}
            />
          )}
        </div>
      )}
    </div>
  )
}
