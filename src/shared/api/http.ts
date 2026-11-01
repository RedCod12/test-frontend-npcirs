type QueryParams = Record<string, string | number | undefined>

export async function getJson<T>(path: string, params: QueryParams = {}): Promise<T> {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }
  const queryString = query.toString()
  const response = await fetch(`/api${path}${queryString ? `?${queryString}` : ''}`)
  if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`)
  return response.json() as Promise<T>
}