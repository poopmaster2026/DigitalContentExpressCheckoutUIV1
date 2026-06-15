/** ストア一覧（ヘッダーの切替 Picker と AccountMenu の submenu で共用する単一定義）。 */
export interface Store {
  id: string;
  name: string;
}

export const STORES: Store[] = [
  { id: "hanako", name: "花子のストア" },
  { id: "atelier", name: "アトリエ花" },
];

export const DEFAULT_STORE_ID = "hanako";

export const DEFAULT_STORE = STORES.find((s) => s.id === DEFAULT_STORE_ID);
