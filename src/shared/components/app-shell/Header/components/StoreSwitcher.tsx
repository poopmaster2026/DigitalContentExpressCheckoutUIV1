"use client";

import { Picker, PickerItem } from "@react-spectrum/s2/Picker";

import { STORES, DEFAULT_STORE_ID } from "../../stores";

/** ヘッダーのストア切替 Picker。一覧は stores.ts の単一定義を使う。 */
export function StoreSwitcher() {
  return (
    <Picker
      isQuiet
      aria-label="ストアを切り替え"
      defaultSelectedKey={DEFAULT_STORE_ID}
    >
      {STORES.map((s) => (
        <PickerItem key={s.id} id={s.id}>
          {s.name}
        </PickerItem>
      ))}
    </Picker>
  );
}
