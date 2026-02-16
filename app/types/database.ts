export interface Product {
  id: string
  created_at: string
  name: string
  description: string | null
  size: string | null
  price: number
  category: string | null
  image_url: string | null
  stock: number
  is_active: boolean
}