"use client";

import { ActionBar, ActionButton, Text } from "@react-spectrum/s2/ActionBar";
import Edit from "@react-spectrum/s2/icons/Edit";
import Copy from "@react-spectrum/s2/icons/Copy";
import Delete from "@react-spectrum/s2/icons/Delete";

/** 選択時の一括操作バー（アイコン + ラベル / isEmphasized）。グリッド/テーブル共用。 */
export function ProductsActionBar() {
  return (
    <ActionBar isEmphasized>
      <ActionButton onPress={() => {}}>
        <Edit />
        <Text>編集</Text>
      </ActionButton>
      <ActionButton onPress={() => {}}>
        <Copy />
        <Text>複製</Text>
      </ActionButton>
      <ActionButton onPress={() => {}}>
        <Delete />
        <Text>削除</Text>
      </ActionButton>
    </ActionBar>
  );
}
