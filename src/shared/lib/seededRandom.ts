export type Random = () => number

export function createSeededRandom(seed: number): Random {
  let state = (seed * 2654435761) % 4294967296
  return () => (state = (state * 1664525 + 1013904223) % 4294967296) / 4294967296
}

export function pickRandom<T>(random: Random, items: readonly T[]): T {
  return items[Math.floor(random() * items.length)]
}
