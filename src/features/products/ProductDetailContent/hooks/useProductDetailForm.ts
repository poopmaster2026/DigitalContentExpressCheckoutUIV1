"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { ProductDetail } from "../../types";

/**
 * 詳細/編集フォームの状態管理（react-hook-form + zod）。
 * 商品名・説明・価格・無料・公開フラグに加え、カバー画像 URL と配信ファイルも
 * すべて RHF の管理下に置く（画面の状態を 1 つの form に集約）。
 * 作成画面（/new）でも同じ schema を空初期値で再利用する想定。
 */
export const productFormSchema = z.object({
  name: z.string().trim().min(1, "商品名を入力してください"),
  description: z.string().trim(),
  isFree: z.boolean(),
  price: z
    .number()
    .int("価格は整数で入力してください")
    .min(0, "価格は0以上で入力してください"),
  published: z.boolean(),
  /** カバー画像 URL（未設定は null → プレースホルダ表示）。 */
  coverImage: z.string().nullable(),
  /** デジタル配信ファイル（未設定は null）。 */
  contentFile: z.object({ name: z.string(), size: z.number() }).nullable(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

/** 詳細データ → フォーム初期値。 */
export function toFormValues(detail: ProductDetail): ProductFormValues {
  return {
    name: detail.name,
    description: detail.description,
    isFree: detail.price === null,
    price: detail.price ?? 0,
    published: detail.status === "published",
    coverImage: detail.image ?? null,
    contentFile: detail.contentFile ?? null,
  };
}

export function useProductDetailForm(detail: ProductDetail) {
  return useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toFormValues(detail),
    mode: "onBlur",
  });
}
