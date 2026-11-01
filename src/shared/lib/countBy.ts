export type CountedItem = [label: string, count: number]

export function countBy<T>(items: readonly T[], getLabel: (item: T) => string): CountedItem[] {
  const counts = new Map<string, number>()
  for (const item of items) {
    const label = getLabel(item)
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}

export const getCount = (items: readonly CountedItem[], label: string): number =>
  items.find(([itemLabel]) => itemLabel === label)?.[1] ?? 0
