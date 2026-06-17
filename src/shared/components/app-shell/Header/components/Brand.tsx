"use client";

import { Image } from "@react-spectrum/s2/Image";
import { size, style } from "@react-spectrum/s2/style" with { type: "macro" };

import { StoreSwitcher } from "./StoreSwitcher";

const SM = `@container (min-width: ${640 / 16}rem)`;

const brand = style({
  display: "flex",
  alignItems: "center",
  gap: 20,
  flexShrink: 0,
});
// 36px ロゴは S2 サンプル既定の 24px 先頭アイコンより左右 6px ずつ大きい。
// その分だけクラスタを左へ寄せ、バッジ中心をサイドバーの「＋」/ナビアイコン列
// （= 作成ボタンの size(6) で定義される軸）に揃える。
const logoWrap = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginStart: size(-6),
});
// S2 Image はスケルトン用に gray の wrapper 背景を持つため、透過ロゴでは明示的に打ち消す
const logoImage = style({
  height: 36,
  width: "auto",
  display: "block",
  flexShrink: 0,
  backgroundColor: "transparent",
});
const brandName = style({
  fontSize: "heading-sm",
  fontWeight: "bold",
  color: "heading",
});
// ブランドとストア切替の区切り。色は S2 Divider の既定トークン（gray-200）に合わせる。
// marginStart はサイドバー展開時のコンテンツパネル左端に縦のラインを揃えるための値
const brandDivider = style({
  width: 2,
  height: 16,
  borderRadius: "full",
  backgroundColor: "gray-200",
  flexShrink: 0,
  marginStart: 20,
  display: { default: "none", [SM]: "block" },
});
const storeSwitcherWrap = style({
  display: { default: "none", [SM]: "contents" },
});

/** ロゴ + ブランド名 + 区切り + ストア切替。 */
export function Brand() {
  return (
    <div className={brand}>
      <div className={logoWrap}>
        <Image src="/setlink-logo.png" alt="" styles={logoImage} />
        <span className={brandName}>SetLink</span>
      </div>
      <div
        className={brandDivider}
        role="separator"
        aria-orientation="vertical"
      />
      <div className={storeSwitcherWrap}>
        <StoreSwitcher />
      </div>
    </div>
  );
}
