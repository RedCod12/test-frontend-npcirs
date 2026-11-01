import type { UIEvent } from 'react'
import { type Citizen } from '@/entities/citizen'
import { useVirtualWindow } from '@/shared/lib'
import { columns } from '../model/columns'
import { Button, Loader } from '@/shared/ui'

const ROW_HEIGHT = 54
const VIEWPORT_HEIGHT = 560

interface CitizenListProps {
  citizens: readonly Citizen[]
  selectedCitizenId?: number
  hasMore: boolean
  isLoadingMore: boolean
  onSelect: (citizen: Citizen) => void
  onLoadMore: () => void
}

export const CitizenList = ({
  citizens,
  selectedCitizenId,
  hasMore,
  isLoadingMore,
  onSelect,
  onLoadMore
}: CitizenListProps) => {
  const {
    firstIndex,
    lastIndex,
    totalHeight,
    handleScroll
  } = useVirtualWindow({
    itemCount: citizens.length, rowHeight: ROW_HEIGHT, viewportHeight: VIEWPORT_HEIGHT,
  })

  const onScrollerScroll = (event: UIEvent<HTMLDivElement>) => {
    handleScroll(event)
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget
    const nearEnd = scrollTop + clientHeight > scrollHeight - ROW_HEIGHT * 8
    if (nearEnd && hasMore && !isLoadingMore) onLoadMore()
  }

  const cellClass = 'min-w-0 text-center w-full truncate px-2'

  return (
    <section className="min-w-0 flex-1 max-xl:w-full self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="flex justify-between items-center gap-3 border-b border-slate-200 bg-slate-50 py-3 text-xs font-semibold text-slate-500">
              {columns.map(column => (
                <span key={column.key} className={cellClass}>
                  {column.title}
                </span>
              ))}
            </div>

            <div
              className="overflow-y-auto"
              style={{ height: VIEWPORT_HEIGHT }}
              onScroll={onScrollerScroll}
            >
              <div
                className="relative"
                style={{ height: totalHeight }}
              >
                {citizens.slice(firstIndex, lastIndex).map((citizen, offset) => (
                  <Button
                    key={citizen.id}
                    variant="row"
                    active={citizen.id === selectedCitizenId}
                    aria-pressed={citizen.id === selectedCitizenId}
                    onClick={() => onSelect(citizen)}
                    className="absolute w-full justify-between gap-3 px-3"
                    style={{
                      top: (firstIndex + offset) * ROW_HEIGHT,
                      height: ROW_HEIGHT,
                    }}
                  >
                    {columns.map(column => (
                      <span key={column.key} className={cellClass}>
                        {column.render(citizen)}
                      </span>
                    ))}
                  </Button>
                ))}
                {isLoadingMore && (
                  <Loader
                    size="sm"
                    text="Загрузка записей…"
                    className="absolute bottom-0 left-0 z-10 w-full bg-white/95 py-3"
                  />
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
