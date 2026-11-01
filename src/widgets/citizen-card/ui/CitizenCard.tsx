import type { Citizen } from '@/entities/citizen'
import { ErrorMessage, Loader } from '@/shared/ui'
import { CitizenCardDetails } from './CitizenCardDetails'

interface CitizenCardProps {
  citizen?: Citizen
  onOpenCitizen: (id: number) => void
  isCitizenLoading: boolean
  isCitizenError: boolean
}

export function CitizenCard({
  citizen,
  onOpenCitizen,
  isCitizenLoading,
  isCitizenError,
}: CitizenCardProps) {
  const renderContent = () => {
    if (isCitizenLoading) {
      return <Loader className="py-12" />
    }

    if (isCitizenError) {
      return (
        <ErrorMessage
          text="Не удалось открыть карточку гражданина"
          className="py-12"
        />
      )
    }

    if (!citizen) return null

    return (
      <CitizenCardDetails
        key={citizen.id}
        citizen={citizen}
        onOpenCitizen={onOpenCitizen}
      />
    )
  }

  return (
    <section className="w-xl max-xl:w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {renderContent()}
    </section>
  )
}