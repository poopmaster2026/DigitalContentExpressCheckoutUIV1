"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { SortDescriptor } from "react-aria-components";
import { AlertDialog } from "@/shared/components/ui/alert-dialog";
import { productListQueryOptions } from "../../queries/productQueries";
import { useProductMutations } from "../../hooks/useProductMutations";
import type { Product, ProductStatusFilter } from "../../types/product";
import { filterProducts, sortProducts } from "../utils";
import { ProductTableUI } from "./ProductTableUI";

interface ProductTableProps {
  statusFilter: ProductStatusFilter;
  query: string;
}

/** Container — データ取得・ソート・行メニュー操作（複製 / 公開↔下書き / 削除確認） */
export function ProductTable({ statusFilter, query }: ProductTableProps) {
  const router = useRouter();
  const { data: products = [] } = useQuery(productListQueryOptions());
  const { duplicate, setStatus, remove } = useProductMutations();
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, statusFilter, query), sortDescriptor),
    [products, statusFilter, query, sortDescriptor],
  );

  return (
    <>
      <ProductTableUI
        products={visibleProducts}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        onEdit={(id) => router.push(`/store/products/${id}`)}
        onDuplicate={(id) => duplicate.mutate(id)}
        onToggleStatus={(product) =>
          setStatus.mutate({
            id: product.id,
            status: product.status === "published" ? "draft" : "published",
          })
        }
        onDeleteRequest={setDeleteTarget}
      />
      <AlertDialog
        isOpen={deleteTarget !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDeleteTarget(null);
        }}
        title="商品を削除"
        actionLabel="削除"
        onAction={() => {
          if (deleteTarget) remove.mutate(deleteTarget.id);
        }}
      >
        「{deleteTarget?.title}」を削除します。この操作は取り消せません。
      </AlertDialog>
    </>
  );
}
