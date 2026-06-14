/** 通知ポップオーバーのサンプルデータ（実 API 接続までの仮データ）。 */
export interface NotificationItem {
  author: string;
  avatar: string;
  date: string;
  body: string;
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    author: "田中 さくら",
    avatar: "https://i.pravatar.cc/64?img=5",
    date: "2時間前",
    body: "「やさしい料理の基本」を購入しました。",
  },
  {
    author: "佐藤 はる",
    avatar: "https://i.pravatar.cc/64?img=32",
    date: "6月12日",
    body: "「献立テンプレ30日分」に ★5 のレビューが届きました。",
  },
  {
    author: "鈴木 みなと",
    avatar: "https://i.pravatar.cc/64?img=12",
    date: "6月11日",
    body: "「旬の野菜 動画レッスン」を購入しました。",
  },
];
