"use client";

import {
  IllustratedMessage,
  Heading,
  Content,
} from "@react-spectrum/s2/IllustratedMessage";
import FileText from "@react-spectrum/s2/illustrations/gradient/generic1/FileText";
import NoSearchResults from "@react-spectrum/s2/illustrations/linear/NoSearchResults";

/** 検索/フィルタ結果なし・商品ゼロの空状態（CardView / TableView 共用）。 */
export function ProductsEmptyState({ isFiltered }: { isFiltered: boolean }) {
  if (isFiltered) {
    return (
      <IllustratedMessage size="L">
        <NoSearchResults />
        <Heading>該当する商品がありません</Heading>
        <Content>検索条件やフィルタを変更してお試しください。</Content>
      </IllustratedMessage>
    );
  }
  return (
    <IllustratedMessage size="L">
      <FileText />
      <Heading>最初の商品を作成しましょう</Heading>
      <Content>
        サイドバーの「新規作成」からデジタルコンテンツを登録できます。
      </Content>
    </IllustratedMessage>
  );
}
