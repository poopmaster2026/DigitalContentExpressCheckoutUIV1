"use client";

import { Image } from "@react-spectrum/s2/Image";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import { StoreSwitcher } from "./StoreSwitcher";

const SM = `@container (min-width: ${640 / 16}rem)`;

const brand = style({
  display: "flex",
  alignItems: "center",
  gap: 20,
  flexShrink: 0,
});
// S2 Image はスケルトン用に gray の wrapper 背景を持つため、透過ロゴでは明示的に打ち消す
const logoImage = style({
  height: 24,
  width: "auto",
  display: "block",
  flexShrink: 0,
  backgroundColor: "transparent",
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

/** ロゴ + 区切り + ストア切替。ロゴは色スキームで差し替える。 */
export function Brand({ isDark }: { isDark: boolean }) {
  return (
    <div className={brand}>
      <Image
        src={isDark ? "/ours-logo-dark.png" : "/ours-logo.png"}
        alt="Ours"
        styles={logoImage}
      />
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
