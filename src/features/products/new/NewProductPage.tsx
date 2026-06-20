import type { SaleType } from "../types";

import { NewProductContent } from "./NewProductContent/NewProductContent";

const VALID_SALE_TYPES: readonly string[] = [
  "digital",
  "course",
  "booking",
  "subscription",
] as const;

function isSaleType(v: string | undefined): v is SaleType {
  return VALID_SALE_TYPES.includes(v ?? "");
}

interface NewProductPageProps {
  saleType: string | undefined;
}

/**
 * 新規商品作成ページの最上位エントリ（route から呼ばれる）。
 * saleType は URL クエリパラメータから受け取り、不正値は digital にフォールバック。
 */
export function NewProductPage({ saleType }: NewProductPageProps) {
  const resolved: SaleType = isSaleType(saleType) ? saleType : "digital";
  return <NewProductContent saleType={resolved} />;
}
