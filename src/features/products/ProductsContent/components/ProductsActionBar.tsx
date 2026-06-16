"use client";

import { ActionBar, ActionButton, Text } from "@react-spectrum/s2/ActionBar";
import { AlertDialog, DialogTrigger } from "@react-spectrum/s2/AlertDialog";
import Publish from "@react-spectrum/s2/icons/Publish";
import Revert from "@react-spectrum/s2/icons/Revert";
import Delete from "@react-spectrum/s2/icons/Delete";

/**
 * 選択時の一括操作バー（グリッド/テーブル共用）。
 * 件数表示・選択解除(×)・Escape・読み上げは S2 が Context 経由で自動注入するため
 * ここには書かない。アクションは行メニューと語彙を揃える（ただし「複製」は単一商品向けの
 * 操作のため一括バーには含めない）。状態遷移→破壊的の順に並べ、破壊的（削除）は色ボタンに
 * せず確認ダイアログ（destructive）で担保する。
 */
export function ProductsActionBar() {
  return (
    <ActionBar isEmphasized>
      <ActionButton aria-label="公開する" onPress={() => {}}>
        <Publish />
        <Text>公開する</Text>
      </ActionButton>
      <ActionButton aria-label="下書きに戻す" onPress={() => {}}>
        <Revert />
        <Text>下書きに戻す</Text>
      </ActionButton>
      <DialogTrigger>
        <ActionButton aria-label="削除">
          <Delete />
          <Text>削除</Text>
        </ActionButton>
        <AlertDialog
          variant="destructive"
          title="選択した商品を削除"
          primaryActionLabel="削除"
          cancelLabel="キャンセル"
          onPrimaryAction={() => {}}
        >
          選択した商品を削除します。この操作は取り消せません。
        </AlertDialog>
      </DialogTrigger>
    </ActionBar>
  );
}
