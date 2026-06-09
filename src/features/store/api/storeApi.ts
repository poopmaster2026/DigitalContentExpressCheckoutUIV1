import type {
  OrderRow,
  StoreDashboardData,
  StoreProductDetail,
  StoreProductRow,
} from '../types/store'
import {
  mockStoreDashboard,
  mockListOrders,
  mockStoreProducts,
  findProductDetail,
  toProductDetail,
} from '../mock/store'
import type { ProductCreateFormValues } from '../schemas/productCreateSchema'
import type { ProductEditFormValues } from '../schemas/productEditSchema'
import type { CreatableProductType } from '../product-create-page/productTypeMeta'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

interface ListResponse {
  products: StoreProductRow[]
  total: number
}

export async function fetchStoreProducts(): Promise<StoreProductRow[]> {
  if (typeof window === 'undefined') return mockStoreProducts
  try {
    const res = await fetch(`${API_BASE}/api/store/products?limit=100`)
    if (!res.ok) throw new Error('Failed to fetch products')
    const data: ListResponse = await res.json()
    const products = data.products.map(normalizeRow)
    return products.length > 0 ? products : mockStoreProducts
  } catch {
    return mockStoreProducts
  }
}

export async function fetchStoreProduct(productId: string): Promise<StoreProductDetail | null> {
  if (typeof window === 'undefined') return findProductDetail(productId)
  try {
    const res = await fetch(`${API_BASE}/api/store/products/${productId}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Failed to fetch product')
    return normalizeDetail(await res.json())
  } catch {
    return findProductDetail(productId)
  }
}

export async function createProduct(
  type: CreatableProductType,
  values: ProductCreateFormValues & { coverUrl?: string | null; fileUrl?: string | null },
): Promise<StoreProductDetail> {
  try {
    const res = await fetch(`${API_BASE}/api/store/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...values }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error ?? 'Failed to create product')
    }
    return normalizeDetail(await res.json())
  } catch (e) {
    if (e instanceof Error && e.message.includes('Failed to create')) throw e
    const newRow: StoreProductRow = {
      id: `p${Date.now()}`,
      title: values.title,
      type,
      price: values.price,
      soldCount: 0,
      revenue: 0,
      status: values.status ?? 'draft',
    }
    mockStoreProducts.push(newRow)
    return toProductDetail(newRow)
  }
}

export async function updateProduct(
  productId: string,
  values: Partial<ProductEditFormValues> & { coverUrl?: string; fileUrl?: string },
): Promise<StoreProductDetail> {
  try {
    const res = await fetch(`${API_BASE}/api/store/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error ?? 'Failed to update product')
    }
    return normalizeDetail(await res.json())
  } catch (e) {
    if (e instanceof Error && e.message.includes('Failed to update')) throw e
    const idx = mockStoreProducts.findIndex((p) => p.id === productId)
    if (idx === -1) throw new Error('Product not found')
    const existing = mockStoreProducts[idx]
    const updated: StoreProductRow = {
      ...existing,
      title: values.title ?? existing.title,
      price: values.price ?? existing.price,
      status: values.status ?? existing.status,
    }
    mockStoreProducts[idx] = updated
    return toProductDetail(updated)
  }
}

export async function duplicateProduct(productId: string): Promise<StoreProductDetail> {
  try {
    const res = await fetch(`${API_BASE}/api/store/products/${productId}/duplicate`, {
      method: 'POST',
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error ?? 'Failed to duplicate product')
    }
    return normalizeDetail(await res.json())
  } catch (e) {
    if (e instanceof Error && e.message.includes('Failed to duplicate')) throw e
    const original = findProductDetail(productId)
    if (!original) throw new Error('Product not found')
    const copy: StoreProductRow = {
      ...original,
      id: `p${Date.now()}`,
      title: `${original.title}（コピー）`,
      soldCount: 0,
      revenue: 0,
      status: 'draft',
    }
    mockStoreProducts.push(copy)
    return toProductDetail(copy)
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/api/store/products/${productId}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete product')
  } catch (e) {
    if (e instanceof Error && e.message.includes('Failed to delete')) throw e
    const idx = mockStoreProducts.findIndex((p) => p.id === productId)
    if (idx !== -1) mockStoreProducts.splice(idx, 1)
  }
}

export async function uploadCover(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/uploads', {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Failed to upload cover')
  }
  const data = await res.json()
  return data.url
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/uploads', {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Failed to upload file')
  }
  const data = await res.json()
  return data.url
}

function normalizeRow(raw: any): StoreProductRow {
  return {
    id: String(raw.id),
    title: raw.title,
    type: raw.type ?? 'digital',
    thumbnailUrl: raw.thumbnailUrl ?? undefined,
    price: raw.price,
    soldCount: raw.soldCount ?? 0,
    revenue: raw.revenue ?? 0,
    status: raw.status,
  }
}

function normalizeDetail(raw: any): StoreProductDetail {
  return {
    ...normalizeRow(raw),
    description: raw.description ?? '',
    category: raw.category ?? '',
    slug: raw.slug ?? '',
  }
}

export function fetchStoreDashboard(): Promise<StoreDashboardData> {
  return Promise.resolve(mockStoreDashboard)
}

export function fetchStoreOrders(): Promise<OrderRow[]> {
  return Promise.resolve(mockListOrders)
}
