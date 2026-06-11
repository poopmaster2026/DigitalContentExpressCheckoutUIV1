# STORE-SCREENS.md — /store 画面要件（デジタルDL・Phase 0）

スコープ: **デジタルダウンロード商品のみ**を、作成 → 編集 → 公開/非公開 → 更新 → 複製/削除まで
/store 内で一貫して扱う。コース / サブスク / 予約は Phase 1 以降（タイプ選択画面は Phase 0 では作らない）。

表現はすべて **Adobe Express 流（React Spectrum S2）**。トークンは [`DESIGN-TOKENS.md`](./DESIGN-TOKENS.md)、
決定は [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md)、禁止は [`DESIGN-CONSTRAINTS.md`](./DESIGN-CONSTRAINTS.md)。
基準ビジュアル = Figma `876:337`（Candidate C ダッシュボード、地色 A 確定）。

**出典（2026-06-11 調査）**
- Obsidian `ours/アプリ/ours-stan-store/13-ストア設計.md` / `13-1-デジタル販売要件.md`（画面フロー・フィールド定義の SoT）
- 同 `06-5-Products-Chapter.md`（買い手側の見え方）、`02-1-stan.store深掘り.md`（競合: DL が GMV 過半・$4–30 帯・no-code 摩擦最小が必須ライン）
- Mobbin 実画面: [Gumroad 作成（Name+Type+Price のみ）](https://mobbin.com/screens/9191e8d4-f5d5-46a2-9efc-7c4defb284e4) /
  [Gumroad 編集（タブ+右プレビュー+PWYW）](https://mobbin.com/screens/6e79a1cc-4e8c-4dd0-a224-7c3e7086de1d) /
  [Lemon Squeezy 価格モデルタイル](https://mobbin.com/screens/7ac858f3-47b2-4fcd-a274-08ba363921f3) /
  [Whop 完成度チェックリスト](https://mobbin.com/screens/8b2d9b12-1615-4782-be23-7736599ce109)

---

## 1. 画面マップ

```
/store                      ダッシュボード（基準イメージ）
├── /store/products         商品一覧（全件）
│   ├── 「＋新規商品」      → クイック作成（ダイアログ）→ 作成後 /store/products/[id] へ
│   └── /store/products/[id] 商品編集（左フォーム + 右ライブプレビュー）
└── /store/orders           注文一覧（全件）
```

- タイプ選択画面は**置かない**（digital 固定）。「＋新規商品」= どこから押しても同じクイック作成。
- 詳細へは常に 1 ホップ（旧 13-ストア設計の決定を踏襲）。
- 戻り導線: 一覧・編集の左上に「← ストアに戻る / ← 商品に戻る」。

## 2. 各画面の構成と表示形式（S2 マッピング）

### 2-1. /store ダッシュボード（= Figma 876:337 のまま）

| セクション | 内容 | S2 表示形式 |
| --- | --- | --- |
| Hero | アバター + ストア名 + 公開 URL ＋ アクション（プレビュー / 共有 / ＋新規商品） | ブランドグラデ帯（radius xl）。ボタンは pill。新規商品 = 白 pill、他は半透明 pill |
| クイックタイル ×4 | 新規商品 / 商品を管理 / 注文 / プレビュー | 白カード + gray-100 ボーダー + radius xl。アイコンは pastel チップ + hue-800 |
| KPI ×4 | 今月の売上 / 販売数 / 客単価 / 公開中の商品（+前月比デルタ） | 白カード。数値 `heading-lg`(28)、デルタは `Badge`（positive subtle） |
| 商品 | カテゴリチップ + 検索 + 商品カードグリッド（上位 6）+「すべて見る」 | チップ = `SegmentedControl`（pill）、検索 = `SearchField`（pill）、グリッド = `CardView` |
| 最近の注文 | 上位 3 行 +「すべて見る」 | 行リスト（アバター + 名前/商品 + 金額/時刻）。divider は gray-100 hairline |

### 2-2. /store/products 商品一覧

- **表示形式はダッシュボードと同じ商品カードのグリッド**（Express の Your stuff と同じ思想。
  旧設計のテーブル案は不採用 — Phase 0 は列で見るほどの属性がなく、カードの方がサムネ前提の
  デジタル商品に合う。販売数・売上はカード内のメタ行で足りる）。
- ツールバー: `SegmentedControl`（すべて / 公開中 / 下書き）+ `SearchField` + `Picker`（並び替え: 新着 / 売上 / 販売数）。
- 商品カード（ダッシュボードと同一コンポーネント）:
  サムネ（pastel グラデ or coverImage）+ タイプバッジ + タイトル `title-sm` + 価格 `title` + 販売数 + 状態（●+テキスト）。
  カードメニュー `⋮` = `MenuTrigger`（編集 / 複製 / 公開↔下書き / 削除）。
- カードクリック → 編集画面へ。ページネーションは `Pagination`（無ければ「もっと見る」ボタン）。
- **空状態**: ヒーローグラデの小バナー + 「最初の商品を作りましょう」+ accent ボタン（Express の空状態流儀）。

### 2-3. クイック作成（ダイアログ）— Gumroad 型「3 項目で開始」

`DialogTrigger` + `Dialog`。ページ遷移なしで最小入力 → 作成して編集画面へ。

| 項目 | S2 |
| --- | --- |
| 商品名 `title`（必須） | `TextField` |
| 価格（必須） | 価格モデルタイル（**有料 / 無料**の 2 タイル、Lemon Squeezy 型）+ `NumberField`（¥、有料時のみ） |
| ボタン | 「キャンセル」`secondary` / 「作成して編集へ」`accent`（pill） |

作成直後は **draft**。ファイル未添付では公開できない（§4）。

### 2-4. /store/products/[id] 商品編集 — 左フォーム + 右ライブプレビュー

作成と編集を**同一画面に統一**（旧・残課題を解消。Gumroad と同じく編集にも常時プレビュー）。

**アクションバー**（上部固定・白 + 下 hairline）:
左 = ← 商品に戻る / 中 = 商品名 + 状態（`StatusLight` 公開中=positive / 下書き=neutral）/
右 = 複製・削除（`ActionButton`）、保存（`Button primary`= 黒）、**公開/下書きに戻す**（`Button accent`）。

**左フォーム（白カード積み、カード内 padding 24）**:

| カード | 項目 | S2 |
| --- | --- | --- |
| 基本情報 | 商品名 / 説明（プレーン、max 5000）/ カバー画像 | `TextField` / `TextArea` / `DropZone` + `FileTrigger`（1:1 プレビュー付き） |
| 配信ファイル | アップロード済みファイルリスト（名前・サイズ・差し替え/削除） | `DropZone`（点線・Express 風）+ ファイル行（アイコン + `ui` + `detail-sm`） |
| 価格 | 有料/無料タイル + 金額（¥） | タイル（radius lg・選択 = accent リング）+ `NumberField` |
| 公開設定 | 状態（下書き/公開中）/ 商品 URL slug / 購入後メッセージ | `RadioGroup` / `TextField`（prefix= `ours.store/hanako/p/`）/ `TextArea` |

**右ライブプレビュー**: 買い手から見た商品ページ（モーダル相当のカード）をフォームと同期描画。
スクロールしても `position: sticky`。上に「プレビュー」ラベル + 端末切替は Phase 0 では不要。

**公開チェックリスト（Whop 型）**: プレビュー上部に「公開まであと n 項目」
（カバー画像 / 配信ファイル / 価格 の充足を `StatusLight` で表示）。公開ボタンは未充足なら disabled + 理由表示。

### 2-5. /store/orders 注文一覧

- こちらは**テーブルが正**（時系列の同型データ・スキャン用途）。S2 `TableView`。
- 列: 顧客（アバター+名前+メール）/ 商品 / 金額（右揃え）/ 状態（`Badge`: 完了=positive / 返金=negative / 処理中=neutral）/ 日時。
- ツールバー: `SearchField` + `Picker`（状態）+ `DateRangePicker`（期間）。
- 行クリック → 注文詳細は `Dialog`（ドロワー不要・Phase 0 は読み取り専用: 購入者 / 商品 / 金額 / Stripe ID / DL 状況）。

### 2-6. 共通

- 削除 = `AlertDialog`（destructive 確認）。複製 = 即実行 + Toast「『◯◯のコピー』を作成しました」。
- 保存/公開/エラーは S2 Toast。
- フォームは react-hook-form + zod（必須/文字数/価格 ≥0）。エラーは S2 の `errorMessage`（negative `#D73220`）。

## 3. 商品フィールド（Phase 0 確定案）

13-1 の表を digital / Phase 0 に絞って確定:

| フィールド | 必須 | Phase 0 | 備考 |
| --- | --- | --- | --- |
| `title` | ✓ | ✓ | クイック作成で入力 |
| `price` + `pricingModel`(paid/free) | ✓ | ✓ | **PWYW は Phase 0 では見送り**（論点 3 → 後述） |
| `status`(draft/published) | ✓ | ✓ | |
| `assets`（配信ファイル） | ✓(公開時) | ✓ | **複数ファイル可・個別配信**（zip 強制しない） |
| `description` | — | ✓ | プレーンテキスト |
| `coverImage` | — | ✓ | 無ければ pastel グラデ自動採番 |
| `slug` | — | ✓ | 自動生成 + 編集可 |
| 購入後メッセージ | — | ✓ | サンクス画面/メールに表示 |
| サンプル / 限定販売数 / セール価格 | — | Phase 1+ | 13-1 論点のまま保留 |

## 4. ライフサイクル（状態遷移）

```
クイック作成 → draft（一覧に「下書き」で出る・買い手には非公開）
  → 編集で カバー/ファイル/価格 を充足 → [公開] → published（公開プロフィールに即出現）
  → [下書きに戻す] → draft（プロフィールから消える）
  → [複製] → 新 draft（「◯◯のコピー」）
  → [削除] → AlertDialog 確認 → 論理削除（deletedAt）
```

- 公開判定 = チェックリスト充足（title / price / assets ≥1）。
- 買い手側: published 商品が公開プロフィールの Products Chapter とモーダル / `…/p/[slug]` 個別ページに反映（06-5 のハイブリッド方式）。

## 5. 要判断（ユーザー確認待ち）

1. **PWYW（お好み価格）を Phase 0 に入れるか** — 推奨: 入れない（有料/無料の 2 択で開始。Stripe 構成が単純）
2. **商品一覧をカードグリッドにする変更**（旧設計はテーブル）— 推奨: カード（§2-2 の理由）
3. **注文詳細の中身**（返金操作を置くか）— 推奨: Phase 0 は読み取りのみ
4. 説明文のリッチ化（見出し/箇条書き）— 推奨: Phase 0 はプレーン

## 6. 実装順（提案）

1. ダッシュボード（Figma 876:337 を S2 で再現 — シェル + Hero + タイル + KPI + カードグリッド + 注文リスト）
2. 商品一覧（ダッシュボードの部品再利用 + ツールバー + 空状態）
3. クイック作成ダイアログ + 編集画面（フォーム + ライブプレビュー + 公開チェックリスト）
4. 注文一覧 + 注文詳細ダイアログ
5. Toast / AlertDialog / 状態遷移の結線（モックデータ + TanStack Query）
