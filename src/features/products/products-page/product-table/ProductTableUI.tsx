"use client";

import type { ReactNode } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
  type ColumnProps,
  type SortDescriptor,
} from "react-aria-components";
import ChevronDown from "@react-spectrum/s2/icons/ChevronDown";
import ChevronUp from "@react-spectrum/s2/icons/ChevronUp";
import More from "@react-spectrum/s2/icons/More";
import { thumbTint } from "@/styles/brand-tokens";
import { IconButton } from "@/shared/components/ui/icon-button";
import { Menu, MenuItem, MenuSeparator, MenuTrigger } from "@/shared/components/ui/menu";
import { StatusLight } from "@/shared/components/ui/status-light";
import type { Product } from "../../types/product";
import { formatPrice, formatRevenue } from "../utils";
import "./product-table.css";

interface ProductTableUIProps {
  products: Product[];
  sortDescriptor?: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (product: Product) => void;
  onDeleteRequest: (product: Product) => void;
}

function SortableColumn({
  children,
  ...props
}: Omit<ColumnProps, "children" | "allowsSorting"> & { children: ReactNode }) {
  return (
    <Column {...props} allowsSorting>
      {({ sortDirection }) => (
        <span className="product-table__header-cell">
          {children}
          {sortDirection && (
            <span className="product-table__sort-indicator" aria-hidden="true">
              {sortDirection === "ascending" ? <ChevronUp /> : <ChevronDown />}
            </span>
          )}
        </span>
      )}
    </Column>
  );
}

/** Presentational — React Aria Table（CRUD example の型。行クリック = 編集へ） */
export function ProductTableUI({
  products,
  sortDescriptor,
  onSortChange,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDeleteRequest,
}: ProductTableUIProps) {
  return (
    <div className="product-table-card">
      <Table
        aria-label="商品一覧"
        className="product-table"
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
        onRowAction={(key) => onEdit(String(key))}
      >
        <TableHeader>
          <SortableColumn id="title" isRowHeader className="product-table__col product-table__col--title">
            商品
          </SortableColumn>
          <SortableColumn id="price" className="product-table__col product-table__col--num product-table__col--price">
            価格
          </SortableColumn>
          <SortableColumn id="sales" className="product-table__col product-table__col--num product-table__col--sales">
            販売数
          </SortableColumn>
          <SortableColumn id="revenue" className="product-table__col product-table__col--num product-table__col--revenue">
            売上
          </SortableColumn>
          <Column id="status" className="product-table__col product-table__col--status">
            状態
          </Column>
          <Column id="actions" className="product-table__col product-table__col--actions">
            <span className="visually-hidden">操作</span>
          </Column>
        </TableHeader>
        <TableBody
          items={products}
          renderEmptyState={() => (
            <div className="product-table__empty">該当する商品がありません</div>
          )}
        >
          {(product) => (
            <Row id={product.id} className="product-table__row">
              <Cell className="product-table__cell product-table__cell--title">
                <span className="product-table__product">
                  <span
                    className="product-table__thumb"
                    style={{
                      backgroundImage: `linear-gradient(180deg, ${thumbTint[product.thumbTint][0]}, ${thumbTint[product.thumbTint][1]})`,
                    }}
                    aria-hidden="true"
                  />
                  {product.title}
                </span>
              </Cell>
              <Cell className="product-table__cell product-table__cell--num">
                {formatPrice(product)}
              </Cell>
              <Cell className="product-table__cell product-table__cell--num">
                {product.sales}
              </Cell>
              <Cell className="product-table__cell product-table__cell--num">
                {formatRevenue(product)}
              </Cell>
              <Cell className="product-table__cell">
                <StatusLight variant={product.status === "published" ? "positive" : "neutral"}>
                  {product.status === "published" ? "公開中" : "下書き"}
                </StatusLight>
              </Cell>
              <Cell className="product-table__cell product-table__cell--actions">
                <MenuTrigger>
                  <IconButton aria-label={`${product.title} の操作`}>
                    <More />
                  </IconButton>
                  <Menu>
                    <MenuItem onAction={() => onEdit(product.id)}>編集</MenuItem>
                    <MenuItem onAction={() => onDuplicate(product.id)}>複製</MenuItem>
                    <MenuItem onAction={() => onToggleStatus(product)}>
                      {product.status === "published" ? "下書きに戻す" : "公開する"}
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem variant="destructive" onAction={() => onDeleteRequest(product)}>
                      削除
                    </MenuItem>
                  </Menu>
                </MenuTrigger>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
