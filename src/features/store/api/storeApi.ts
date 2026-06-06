import type {
  OrderRow,
  StoreDashboardData,
  StoreProductDetail,
  StoreProductRow,
} from '../types/store'
import { mockStoreDashboard, mockListOrders } from '../mock/store'
import type { ProductCreateFormValues } from '../schemas/productCreateSchema'
import type { ProductEditFormValues } from '../schemas/productEditSchema'
import type { CreatableProductType } from '../product-create-page/productTypeMeta'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9090'

interface ListResponse {
  products: StoreProductRow[]
  total: number
}

export async function fetchStoreProducts(): Promise<StoreProductRow[]> {
  const res = await fetch(`${API_BASE}/api/store/products?limit=100`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const data: ListResponse = await res.json()
  return data.products.map(normalizeRow)
}

export async function fetchStoreProduct(productId: string): Promise<StoreProductDetail | null> {
  const res = await fetch(`${API_BASE}/api/store/products/${productId}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch product')
  return normalizeDetail(await res.json())
}

export async function createProduct(
  type: CreatableProductType,
  values: ProductCreateFormValues & { coverUrl?: string | null; fileUrl?: string | null },
): Promise<StoreProductDetail> {
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
}

export async function updateProduct(
  productId: string,
  values: Partial<ProductEditFormValues> & { coverUrl?: string; fileUrl?: string },
): Promise<StoreProductDetail> {
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
}

export async function duplicateProduct(productId: string): Promise<StoreProductDetail> {
  const res = await fetch(`${API_BASE}/api/store/products/${productId}/duplicate`, {
    method: 'POST',
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Failed to duplicate product')
  }
  return normalizeDetail(await res.json())
}

export async function deleteProduct(productId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/store/products/${productId}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete product')
}

export async function uploadCover(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/api/uploads/cover`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Failed to upload cover')
  }
  const data = await res.json()
  return `${API_BASE}${data.url}`
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/api/uploads/file`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Failed to upload file')
  }
  const data = await res.json()
  return `${API_BASE}${data.url}`
}

function normalizeRow(raw: any): StoreProductRow {
  return {
    id: String(raw.id),
    title: raw.title,
    type: raw.type,
    thumbnailUrl: raw.thumbnailUrl ?? undefined,
    price: raw.price,
    soldCount: raw.soldCount,
    revenue: raw.revenue,
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
