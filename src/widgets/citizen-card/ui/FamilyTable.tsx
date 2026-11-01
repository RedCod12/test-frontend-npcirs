import type { FamilyMember } from '@/entities/citizen'
import { FAMILY_COLUMNS } from '../model/constants'
import { Button } from '@/shared/ui'

interface FamilyTableProps {
  members: readonly FamilyMember[]
  deletingId: number | null
  isEditing: boolean
  onOpen: (id: number) => void
  onDelete: (id: number) => void
}

export const FamilyTable = ({
  members,
  deletingId,
  onOpen,
  onDelete,
  isEditing,
}: FamilyTableProps) => {
  if (members.length === 0) {
    return <p className="py-5 text-sm text-slate-500">Нет данных</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-100 text-left text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            {FAMILY_COLUMNS.map(column => (
              <th key={column.key} scope="col" className="px-3 py-3 font-semibold">
                {column.title}
              </th>
            ))}
            <th className="px-3 py-3 text-right">Действия</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {members.map(member => (
            <tr
              key={`${member.fullName}-${member.relation}`}
              className="text-slate-700"
            >

              {FAMILY_COLUMNS.map(column => (
                <td
                  key={column.key}
                  className={`px-3 py-3 ${column.className}`}
                >
                  {column.render(member)}
                </td>
              ))}

              <td className="px-3 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="secondary"
                    aria-label={`Открыть карточку ${member.fullName}`}
                    title="Открыть карточку"
                    onClick={() => onOpen(member.id)}
                  >
                    Открыть
                  </Button>

                  {isEditing && (
                    <Button
                      variant="secondary"
                      aria-label={`Удалить ${member.fullName} из семьи`}
                      title="Удалить из семьи"
                      disabled={deletingId !== null}
                      onClick={() => onDelete(member.id)}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}