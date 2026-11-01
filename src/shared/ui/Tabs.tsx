interface TabsProps<T extends string> {
  tabs: readonly T[]
  activeTab: T
  onChange: (tab: T) => void
}

export function Tabs<T extends string>({ tabs, activeTab, onChange }: TabsProps<T>) {
  return (
    <nav aria-label="Разделы карточки" className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200">
      {tabs.map(tab => (
        <button
          key={tab}
          type="button"
          className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium 
            transition-colors focus-visible:rounded-t-md focus-visible:outline-2 
            focus-visible:-outline-offset-2 focus-visible:outline-brand-500 
            ${tab === activeTab ? 'border-brand-600 text-brand-700'
            :
            'border-transparent text-slate-500 hover:text-slate-800'}`}
          aria-current={tab === activeTab && 'page' || undefined}
          onClick={() => onChange(tab)}
        >{tab}</button>
      ))}
    </nav>
  )
}
