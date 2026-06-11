"use client";

import { useState } from "react";
import { Link } from "react-aria-components";
import Add from "@react-spectrum/s2/icons/Add";
import { Button } from "@/shared/components/ui/button";
import type { ProductStatusFilter } from "../types/product";
import { ProductsToolbar } from "./toolbar/ProductsToolbar";
import { ProductTable } from "./product-table/ProductTable";
import "./products-page.css";

/** /store/products 商品一覧 — Figma 966:337。テーブルが正（STORE-SCREENS.md §2-2）。 */
export function ProductsPage() {
  const [statusFilter, setStatusFilter] = useState<ProductStatusFilter>("all");
  const [query, setQuery] = useState("");

  return (
    <div className="products-page">
      <Link href="/store" className="products-page__back">
        ← ストアに戻る
      </Link>
      <div className="products-page__title-row">
        <h1 className="products-page__title">商品</h1>
        {/* TODO: クイック作成ダイアログ（Figma 960:337）実装後に結線する */}
        <Button variant="accent">
          <Add />
          新規商品
        </Button>
      </div>
      <ProductsToolbar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        query={query}
        onQueryChange={setQuery}
      />
      <ProductTable statusFilter={statusFilter} query={query} />
    </div>
  );
}
