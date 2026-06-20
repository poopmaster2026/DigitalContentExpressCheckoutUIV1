import { z } from "zod";

import type { ProductDetail } from "./index";

// ── ファイル制限定数（競合調査 2026-06 に基づく業界標準値）────────────────
// カバー画像: Kajabi 5MB / note 20MB の中間。SVG はセキュリティ上禁止。
export const COVER_IMAGE_MAX_SIZE = 10 * 1024 * 1024; // 10 MB
export const COVER_IMAGE_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

// コンテンツファイル: Fourthwall/Linktree 有料商品水準（Stan 5GB より控えめな初期値）。
export const CONTENT_FILE_MAX_SIZE = 2 * 1024 * 1024 * 1024; // 2 GB
// 実行ファイル系は受け付けない。
export const BLOCKED_CONTENT_MIME_TYPES = [
  "application/x-msdownload",
  "application/x-executable",
  "application/x-sh",
  "application/x-bat",
  "application/x-msdos-program",
  "application/x-dosexec",
] as const;

// ── Zod サブスキーマ ──────────────────────────────────────────────────────
// カバー画像: { url, name, size, type } | null
// サーバー既存データは type:"" size:0 で補完 → refine をスキップ。
const coverImageSchema = z
  .object({
    url: z.string(),
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  .refine(
    (f) =>
      f.type === "" ||
      (COVER_IMAGE_ACCEPTED_TYPES as readonly string[]).includes(f.type),
    "JPEG・PNG・WebP・GIF のみ対応しています"
  )
  .refine(
    (f) => f.size === 0 || f.size <= COVER_IMAGE_MAX_SIZE,
    "カバー画像は10MB以下にしてください"
  )
  .nullable();

// コンテンツファイル: { name, size, type } | null
// サーバー既存データは type:"" で補完（size は保持されているので 0 チェックは行う）。
const contentFileSchema = z
  .object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  .refine((f) => f.size > 0, "ファイルが空です")
  .refine(
    (f) => f.size <= CONTENT_FILE_MAX_SIZE,
    "ファイルサイズは2GB以下にしてください"
  )
  .nullable();

// ── メインスキーマ ────────────────────────────────────────────────────────
/**
 * 商品フォームの Zod スキーマ。
 *
 * 必須フィールド:
 *   - name       商品名（1文字以上）
 *   - price      有料商品（isFree=false）の場合は1円以上
 *
 * 任意フィールド:
 *   - description  説明
 *   - coverImage   カバー画像（null のときはデフォルトイラストを表示）
 *   - contentFile  配信ファイル（null 許容。将来 saleType=digital で必須化）
 */
export const productFormSchema = z
  .object({
    name: z.string().trim().min(1, "商品名を入力してください"),
    description: z.string().trim(),
    isFree: z.boolean(),
    price: z
      .number()
      .int("価格は整数で入力してください")
      .min(0, "価格は0以上で入力してください"),
    published: z.boolean(),
    coverImage: coverImageSchema,
    contentFile: contentFileSchema,
  })
  .superRefine((data, ctx) => {
    if (!data.isFree && data.price <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "有料商品の価格は1円以上を入力してください",
        path: ["price"],
      });
    }
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

/** 新規デジタル商品作成用スキーマ。説明・コンテンツファイルも必須。 */
export const newDigitalProductFormSchema = productFormSchema.superRefine((data, ctx) => {
  if (!data.description.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "説明を入力してください",
      path: ["description"],
    });
  }
  if (!data.contentFile) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "コンテンツファイルをアップロードしてください",
      path: ["contentFile"],
    });
  }
});

/** 商品詳細データ → フォーム初期値。既存ファイルは type 不明のため "" を補完。 */
export function toFormValues(detail: ProductDetail): ProductFormValues {
  return {
    name: detail.name,
    description: detail.description,
    isFree: detail.price === null,
    price: detail.price ?? 0,
    published: detail.status === "published",
    coverImage: detail.image
      ? { url: detail.image, name: "", size: 0, type: "" }
      : null,
    contentFile: detail.contentFile
      ? { ...detail.contentFile, type: "" }
      : null,
  };
}
