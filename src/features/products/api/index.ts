// BE 接続時にやること:
// 1. 下記 import のコメントを外す
// 2. 各関数のモック行（return PRODUCTS; 等）を削除し、その下の apiClient 行を有効化
// import { apiClient } from "@/lib/axios";

import { PRODUCTS, getProductDetail } from "../mock";
import { FILTER_ALL } from "../types";
import type { Product, ProductDetail } from "../types";

export interface ProductListParams {
  status?: string;
  saleType?: string;
  q?: string;
}

// TODO: BE ができたら実 API に差し替える
export async function fetchProducts(params: ProductListParams = {}): Promise<Product[]> {
  const { status, saleType, q } = params;
  return PRODUCTS.filter((p) => {
    const okStatus = !status || status === FILTER_ALL || p.status === status;
    const okSaleType = !saleType || saleType === FILTER_ALL || p.saleType === saleType;
    const okQ = !q || p.name.includes(q);
    return okStatus && okSaleType && okQ;
  });
  // return apiClient.get<Product[]>("/products", { params }).then((res) => res.data);
}

// TODO: BE ができたら実 API に差し替える
export async function fetchProductDetail(
  id: string
): Promise<ProductDetail | undefined> {
  return getProductDetail(id);
  // return apiClient.get<ProductDetail>(`/products/${id}`).then((res) => res.data);
}

// TODO: BE ができたら実 API に差し替える
// カバー画像・コンテンツファイルはどちらも multipart に含めて submit 時に一括送信する。
// こうすることで「ファイル選択後にキャンセル → 無駄なアップロードが残る」問題を防ぐ。
//
// 進捗表示は mutationFn の外（コンテナ）で管理する TanStack Query の標準パターンに従う:
//   const [progress, setProgress] = useState(0);
//   const { mutateAsync } = useMutation(createProductMutationOptions(setProgress));
//   const onSubmit = handleSubmit((data) => mutateAsync(data));
//
// export interface CreateProductInput {
//   name: string;
//   description: string;
//   saleType: SaleType;
//   category: string;
//   slug: string;
//   price: number | null;
//   published: boolean;
//   coverImage?: File;
//   contentFile?: File;
// }
// export function createProduct(
//   input: CreateProductInput,
//   onProgress?: (percent: number) => void
// ): Promise<{ id: string }> {
//   const body = new FormData();
//   Object.entries(input).forEach(([k, v]) => {
//     if (v !== undefined) body.append(k, v instanceof File ? v : String(v));
//   });
//   return apiClient
//     .post<{ id: string }>("/products", body, {
//       headers: { "Content-Type": "multipart/form-data" },
//       onUploadProgress: (e) => {
//         if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100));
//       },
//     })
//     .then((res) => res.data);
// }

// TODO: BE ができたら実 API に差し替える
// export interface UpdateProductInput extends Partial<CreateProductInput> {}
// export function updateProduct(
//   id: string,
//   input: UpdateProductInput,
//   onProgress?: (percent: number) => void
// ): Promise<void> {
//   const body = new FormData();
//   Object.entries(input).forEach(([k, v]) => {
//     if (v !== undefined) body.append(k, v instanceof File ? v : String(v));
//   });
//   return apiClient
//     .patch(`/products/${id}`, body, {
//       headers: { "Content-Type": "multipart/form-data" },
//       onUploadProgress: (e) => {
//         if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100));
//       },
//     })
//     .then(() => undefined);
// }

// TODO: BE ができたら実 API に差し替える
// export async function deleteProduct(id: string): Promise<void> {
//   await apiClient.delete(`/products/${id}`);
// }

// TODO: BE ができたら実 API に差し替える
// 公開状態の切り替え（toggle）は updateProduct({ published }) で賄う
// export async function duplicateProduct(id: string): Promise<{ id: string }> {
//   return apiClient.post<{ id: string }>(`/products/${id}/duplicate`).then((res) => res.data);
// }
