"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };

// ローディング表示。実レイアウト（タイトル行 + 一覧）に合わせた箱を S2 トークンで並べる。
// raw hex は使わず gray スケールのみ。Phase 0（mock 同期）では未発火。
const page = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flexGrow: 1,
  minHeight: 0,
});
const titleRow = style({ display: "flex", alignItems: "center", gap: 12 });
const titleBlock = style({ width: 96, height: 28, backgroundColor: "gray-200", borderRadius: "sm" });
const spacer = style({ flexGrow: 1 });
const control = style({ width: 160, height: 32, backgroundColor: "gray-100", borderRadius: "sm" });
const list = style({ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 });
const row = style({ display: "flex", alignItems: "center", gap: 12 });
const thumb = style({ width: 36, height: 36, backgroundColor: "gray-100", borderRadius: "sm", flexShrink: 0 });
const line = style({ height: 16, backgroundColor: "gray-100", borderRadius: "sm", flexGrow: 1 });

const ROWS = Array.from({ length: 8 }, (_, i) => i);

export function ProductsPageSkeleton() {
  return (
    <div className={page}>
      <div className={titleRow}>
        <div className={titleBlock} />
        <div className={spacer} />
        <div className={control} />
        <div className={control} />
      </div>
      <div className={list}>
        {ROWS.map((i) => (
          <div key={i} className={row}>
            <div className={thumb} />
            <div className={line} />
          </div>
        ))}
      </div>
    </div>
  );
}
