import { QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { queryClient } from '@/app/queryClient'
import '@/app/styles/index.css'

async function enableApiMocking() {
  const { worker } = await import('@/app/mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

enableApiMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  )
})