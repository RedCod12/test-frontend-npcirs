import { Button } from "@/shared/ui";

export interface NavItem<T extends string> { id: T; label: string }

interface SidebarProps<T extends string> {
  title: string
  items: readonly NavItem<T>[]
  activeId: T
  onSelect: (id: T) => void
}

export const Sidebar = <T extends string>({ title, items, activeId, onSelect }: SidebarProps<T>) => {
  return (
    <aside className="flex shrink-0 flex-col gap-5 border-b 
    border-slate-200 bg-white px-4 py-5 shadow-sm sm:px-6
     lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r lg:px-4 lg:py-8">
      <h1 className="px-3 text-xl font-bold tracking-tight text-slate-900">{title}</h1>
      <nav aria-label="Основная навигация" className="flex gap-2 lg:flex-col">
        {items.map(item => (
          <Button
            key={item.id}
            variant="nav"
            active={item.id === activeId}
            aria-current={item.id === activeId && 'page'}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
