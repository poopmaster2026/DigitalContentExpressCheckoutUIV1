"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { SearchField } from "@react-spectrum/s2/SearchField";
import { useAppSearch } from "../../search-context";

const MD = `@container (min-width: ${768 / 16}rem)`;

const searchWrap = style({
  display: { default: "none", [MD]: "block" },
  width: "full",
  maxWidth: 472,
  minWidth: 272,
  flexShrink: 1,
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
        styles={style({ width: "full" })}
      />
    </div>
  );
}
