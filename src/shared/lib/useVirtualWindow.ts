import { useState, type UIEvent } from 'react'

interface VirtualWindowOptions {
  itemCount: number
  rowHeight: number
  viewportHeight: number
  overscan?: number
}

export function useVirtualWindow({ itemCount, rowHeight, viewportHeight, overscan = 5 }: VirtualWindowOptions) {
  const [scrollTop, setScrollTop] = useState(0)
  const firstIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  const lastIndex = Math.min(itemCount, Math.ceil((scrollTop + viewportHeight) / rowHeight) + overscan)

  return {
    firstIndex,
    lastIndex,
    totalHeight: itemCount * rowHeight,
    handleScroll: (event: UIEvent<HTMLElement>) => setScrollTop(event.currentTarget.scrollTop),
  }
}
