import type { FetchParams } from '@/models/fetch-params.interface'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export const formatQueryParams = (params: FetchParams): string => {
  return Object.keys(params)
    .filter((key) => params[key as keyof FetchParams])
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key as keyof FetchParams] ?? '')}`
    )
    .join('&')
}
