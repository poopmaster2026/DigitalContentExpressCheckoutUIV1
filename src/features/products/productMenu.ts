import type { Product } from "./types";

export interface ProductMenuItem {
  id: string;
  label: string;
}

/** 商品の操作メニュー項目（カード=ActionMenu / テーブル=Menu 共用）。 */
export function productMenuItems(p: Product): ProductMenuItem[] {
  return [
    { id: "edit", label: "編集" },
    { id: "duplicate", label: "複製" },
    {
      id: "toggle",
      label: p.status === "published" ? "下書きに戻す" : "公開する",
    },
    { id: "delete", label: "削除" },
  ];
}
