export type ProductType = 'digital'

export interface ProductReview {
  id: string
  author: string
  rating: number
  body: string
  createdAt: string
}

export interface ProductFaq {
  q: string
  a: string
}

export interface Product {
  id: string
  slug: string
  title: string
  shortDescription?: string
  description: string
  type: ProductType
  thumbnailUrl: string
  galleryUrls: string[]
  price: number
  originalPrice?: number
  currency: 'JPY'
  rating?: number
  reviewCount?: number
  soldCount?: number
  badge?: string
  billingCycle?: 'monthly' | 'yearly'
  lessonCount?: number
  durationMinutes?: number
  inventory?: number
  category?: string
  reviews?: ProductReview[]
  faq?: ProductFaq[]
}
