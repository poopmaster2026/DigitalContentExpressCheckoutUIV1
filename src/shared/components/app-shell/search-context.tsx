"use client";

import { createContext, useContext } from "react";

/** ヘッダー検索（アプリ全体で1箇所）の値をページへ共有するコンテキスト。 */
export const AppSearchContext = createContext<{
  query: string;
  setQuery: (query: string) => void;
}>({ query: "", setQuery: () => {} });

export const useAppSearch = () => useContext(AppSearchContext);
