"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { SearchField } from "@react-spectrum/s2/SearchField";
import { useAppSearch } from "../../search-context";

const MD = `@container (min-width: ${768 / 16}rem)`;

// 公式 S2 サンプル準拠: ラッパーは flexGrow:1 で Brand とアクションの間の余白を埋め、
// 中の SearchField を marginX:auto で内寄せする（max/min 幅で伸縮）。Brand の右で始まるため重ならない。
const searchWrap = style({
  flexGrow: 1,
  display: { default: "none", [MD]: "block" },
});

/** ヘッダー中央の検索。値は AppSearchContext から直接取得する（prop drilling なし）。 */
export function HeaderSearch() {
  const { query, setQuery } = useAppSearch();
  return (
    <div className={searchWrap}>
      <SearchField
        aria-label="商品を検索"
        placeholder="商品を検索"
        value={query}
        onChange={setQuery}
        styles={style({ maxWidth: 472, minWidth: 272, marginX: "auto" })}
      />
    </div>
  );
}
