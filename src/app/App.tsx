import { useState } from 'react'
import { DashboardPage } from '@/pages/dashboard'
import { RegistryPage } from '@/pages/registry'
import { Sidebar, type NavItem } from '@/widgets/sidebar'

type PageId = 'dashboard' | 'registry'

const NAV_ITEMS: readonly NavItem<PageId>[] = [
  { id: 'dashboard', label: 'Дашборд' },
  { id: 'registry', label: 'Картотека' },
]

export function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard')

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 lg:flex">
      <Sidebar title="Портал ПКК" items={NAV_ITEMS} activeId={activePage} onSelect={setActivePage} />
      <main className="mx-auto min-w-0 max-w-[1600px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        {activePage === 'dashboard' ? <DashboardPage /> : <RegistryPage />}
      </main>
    </div>
  )
}
