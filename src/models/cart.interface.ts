import type { Product } from './product.interface'

export interface Cart {
  id: number
  uuid: string
  stock: number
  product: Product
  updated_at: string
  created_at: string
}
