export type ProductSize = {
  size: string
  price: number
  image: string
  default?: boolean
}

export type ProductColor = {
  name: string
  image: string
  displayImage?: string
  default?: boolean
}

export type Product = {
  id: string
  name: string
  price: number
  image: string
  cardImage?: string
  category: string
  description: string
  quantity: number

  uncoveredImage?: string

  carDetails?: {
    carName: string
  }

  sizes?: ProductSize[]
  colors?: ProductColor[]
}