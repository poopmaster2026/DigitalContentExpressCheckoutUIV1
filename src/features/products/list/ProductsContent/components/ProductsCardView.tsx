"use client";

import { ActionMenu, MenuItem } from "@react-spectrum/s2/ActionMenu";
import { Badge } from "@react-spectrum/s2/Badge";
import {
  Card,
  CardPreview,
  Content,
  Text,
  Image,
} from "@react-spectrum/s2/Card";
import { CardView, type Selection } from "@react-spectrum/s2/CardView";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useRouter } from "next/navigation";
import { useState } from "react";

import { SALE_TYPE_BADGE, THUMB_HUE, KIND_ILLUSTRATION } from "../../../display";
import { formatPrice } from "../../../format";
import { productMenuItems } from "../../../productMenu";
import type { Product } from "../../../types";

import { ProductsActionBar } from "./ProductsActionBar";
import { ProductsEmptyState } from "./ProductsEmptyState";

// S2 Card の grid 画像既定は 3/2。デジタルコンテンツのタイルを画像寸法に依らず
// 均一に見せるため square に固定し、画像枝とイラスト枝で同じ比率を共有する
const previewImage = style({
  width: "full",
  aspectRatio: "square",
  objectFit: "cover",
  pointerEvents: "none",
});
const previewBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "full",
  aspectRatio: "square",
});

// プレビュー上のオーバーレイは例外状態（下書き）のみ。位置は公式 Gallery 例と同じ右上
const overlayTopEnd = style({ position: "absolute", top: 16, insetEnd: 16 });
const descriptionRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  gridArea: "description",
});
// 商品名・金額は一覧での視認性を優先して太字（プロダクト判断。S2 既定より太い）
const boldText = style({ fontWeight: "bold" });

export function ProductsCardView({
  products,
  isFiltered,
}: {
  products: Product[];
  isFiltered: boolean;
}) {
  const [selected, setSelected] = useState<Selection>(new Set());
  const router = useRouter();

  return (
    <CardView
      aria-label="商品一覧"
      layout="grid"
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      items={products}
      // marginX -16 = size M の GridLayout が CardView 内側に持つ 16px の端ガターを
      // 相殺し、カード列をタイトル/テーブルと左右で揃える（公式 Photos の手法）
      styles={style({ width: "full", flexGrow: 1, minHeight: 0, marginX: -16 })}
      renderEmptyState={() => <ProductsEmptyState isFiltered={isFiltered} />}
      renderActionBar={() => <ProductsActionBar />}
    >
      {(p) => (
        <Card id={p.id} textValue={p.name}>
          <CardPreview>
            {p.image ? (
              <Image src={p.image} alt="" styles={previewImage} />
            ) : (
              <div className={`${previewBase} ${THUMB_HUE[p.thumb]}`}>
                {KIND_ILLUSTRATION[p.kind]}
              </div>
            )}
            {/* オーバーレイは例外状態（下書き）のみ。正常状態（公開中）は無印 */}
            {p.status === "draft" && (
              <Badge variant="neutral" styles={overlayTopEnd}>
                下書き
              </Badge>
            )}
          </CardPreview>
          <Content>
            <Text slot="title">
              <span className={boldText}>{p.name}</span>
            </Text>
            <ActionMenu
              aria-label="操作"
              onAction={(key) => {
                if (key === "edit") router.push(`/store/products/${p.id}`);
              }}
            >
              {productMenuItems(p).map((a) => (
                <MenuItem key={a.id} id={a.id}>
                  {a.label}
                </MenuItem>
              ))}
            </ActionMenu>
            <div className={descriptionRow}>
              <Badge variant={SALE_TYPE_BADGE[p.saleType].variant}>
                {SALE_TYPE_BADGE[p.saleType].label}
              </Badge>
              <Text slot="description">
                <span className={boldText}>{formatPrice(p.price)}</span>
              </Text>
            </div>
          </Content>
        </Card>
      )}
    </CardView>
  );
}
