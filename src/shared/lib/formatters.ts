export const formatNumber = (value: number): string => value.toLocaleString('ru')

export const formatDate = (isoDate: string): string => isoDate.split('-').reverse().join('.')
