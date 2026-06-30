# SetLink デザインシステム

shadcn/ui（new-york スタイル）+ Tailwind CSS v4。  
実体は `src/app/globals.css` の CSS 変数と `@theme inline` ブロック。  
**`bg-[#xxx]` 形式の任意値クラスは全面禁止。semantic token のみ使う。**

---

## ブランドカラー

**Primary: `#2563EB`（Blue-600）**

管理画面・決済サービスとしての信頼感を出すブルー系で統一する。  
サイドバーのアクティブ、ボタン、チェックボックス、フォーカスリングをすべてこの 1 色に揃える。

| トークン         | 値          | 用途                                |
| --------------- | ----------- | ----------------------------------- |
| `--cta`         | `#2563EB`   | ボタン・アクティブ状態・選択枠       |
| `--cta-hover`   | `#1D4ED8`   | ホバー時                            |
| `--cta-light`   | `#DBEAFE`   | バッジ背景・選択時の薄い背景         |
| `--cta-border`  | `#BFDBFE`   | 選択枠・軽い区切り                  |
| `--ring`        | `#2563EB`   | フォーカスリング（全コンポーネント） |

---

## カラートークン一覧

### Surface（背景・面）

| Tailwind クラス     | CSS 変数           | 値        | 用途                              |
| ------------------- | ------------------ | --------- | --------------------------------- |
| `bg-background`     | `--background`     | `#F7F8FA` | ページ背景                        |
| `bg-surface-deep`   | `--surface-deep`   | `#FAFAFB` | サイドバー背景（背景より僅かに明るい）|
| `bg-surface`        | `--surface`        | `#F3F4F6` | 補助面（テーブルヘッダー、プレースホルダー）|
| `bg-surface-muted`  | `--surface-muted`  | `#EAEAED` | より暗い補助面                    |
| `bg-card`           | `--card`           | `#ffffff` | カード・ポップオーバー            |

### テキスト

| Tailwind クラス         | CSS 変数              | 値        | 用途                     |
| ----------------------- | --------------------- | --------- | ------------------------ |
| `text-foreground`       | `--foreground`        | `#1F1F1F` | 本文・ラベル             |
| `text-muted-foreground` | `--muted-foreground`  | `#6B7280` | サブテキスト・プレースホルダー |

### CTA（行動喚起）

```tsx
// ✅ 正しい
<Button className="bg-cta text-cta-foreground hover:bg-cta-hover">新規作成</Button>

// ✅ 選択状態（カード・サイドバー等）
className={cn(isActive && "bg-cta/8 text-cta ring-1 ring-cta/50")}

// ✅ 選択カードの枠
className={cn(isSelected ? "border-cta/40" : "hover:border-border-strong")}
```

### Semantic（状態色）

| Tailwind クラス    | CSS 変数         | 値        | 用途              |
| ------------------ | ---------------- | --------- | ----------------- |
| `text-success`     | `--success`      | `#16A34A` | 公開中・成功      |
| `text-warning`     | `--warning`      | `#F59E0B` | 下書き・警告      |
| `text-destructive` | `--destructive`  | `#DC2626` | エラー・削除      |

### Lines

| Tailwind クラス       | CSS 変数          | 値        | 用途                    |
| --------------------- | ----------------- | --------- | ----------------------- |
| `border-border`       | `--border`        | `#E7E7E7` | デフォルト線            |
| `border-border-strong`| `--border-strong` | `#D1D1D1` | ホバー時・強調線        |
| `border-input`        | `--input`         | `#D1D5DB` | Input / Select の枠     |
| `border-sidebar-divider`| `--sidebar-divider`| `#E8E8E8`| サイドバー右ボーダー |

### Sidebar（ダークヘッダー・サイドバー）

| Tailwind クラス             | 値                      | 用途                     |
| --------------------------- | ----------------------- | ------------------------ |
| `bg-sidebar`                | `#26211F`               | ヘッダー・サイドバー外枠 |
| `bg-sidebar-accent`         | `#2E2B29`               | ホバー背景               |
| `text-sidebar-foreground`   | `rgba(255,255,255,0.72)`| サイドバーテキスト       |

---

## サイズ・スペーシング

### レイアウト

| 要素            | 値               | Tailwind            |
| --------------- | ---------------- | ------------------- |
| ヘッダー高さ    | 56px（目標64px） | `h-14`              |
| サイドバー幅    | 208px            | `w-52`              |
| ページ横余白    | 24px             | `px-6`              |
| カード間隔      | 16px             | `gap-4`             |

### コンポーネント高さ

| 要素         | 値     | Tailwind  |
| ------------ | ------ | --------- |
| ボタン（M）  | 36px   | `h-9`     |
| ボタン（L）  | 40px   | `h-10`    |
| Input        | 36px   | `h-9`     |
| テーブル行   | 約56px | —         |

### Border Radius

| クラス         | 値    | 用途                              |
| -------------- | ----- | --------------------------------- |
| `rounded-md`   | 6px   | ボタン・Input・小さな要素         |
| `rounded-lg`   | 10px  | ドロップダウン・小カード          |
| `rounded-xl`   | 14px  | 商品カード・セクションカード       |
| `rounded-2xl`  | 18px  | モーダル・大きなカード            |

### タイポグラフィ

| 用途           | サイズ | クラス              |
| -------------- | ------ | ------------------- |
| ページタイトル | 20px   | `text-xl font-medium tracking-tight` |
| セクション見出し| 16px  | `text-base font-semibold`            |
| 本文           | 14px   | `text-sm`           |
| 補助テキスト   | 12px   | `text-xs`           |
| ラベル（小）   | 10px   | `text-[10px]`       |

### Shadow

**カードに使うのは 1 段階のみ**（shadow-sm）。レイヤーが増えるほど重くなる。

| クラス      | 用途                       |
| ----------- | -------------------------- |
| `shadow-sm` | カードホバー・ピルタブ     |
| `shadow-md` | 一括操作バー・モーダル     |
| `shadow-lg` | ドロップダウン・トースト   |

---

## コンポーネントガイド

### ページヘッダー

```tsx
<header className="border-b px-6 pt-5 pb-0">
  <div className="flex items-start gap-3">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-medium tracking-tight">{title}</h1>
        <span className="text-sm text-muted-foreground">{count}件</span>
      </div>
      <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
    </div>
    {/* 右端: 検索 + 表示切替 + CTA ボタン */}
  </div>
</header>
```

### タブ — ピル型（商品一覧など）

選択中タブ: 白背景 + shadow + border でピルを表現。下線なし。

```tsx
<TabsList className="h-auto gap-1 bg-transparent p-0">
  <TabsTrigger
    className={cn(
      "h-auto rounded-lg px-3 py-1.5 text-sm font-medium shadow-none transition-all",
      "data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-border",
      "data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground",
      "hover:bg-foreground/5 hover:text-foreground",
      // タブ種類によって active text color を変える
      isPublished ? "data-[state=active]:text-success"
        : isDraft ? "data-[state=active]:text-warning"
        : "data-[state=active]:text-foreground",
    )}
  >
    {label}
    <span className="ml-1.5 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums ...">
      {count}
    </span>
  </TabsTrigger>
</TabsList>
```

### タブ — 青塗り型（設定ページなど）

選択中タブ: `bg-cta` 青塗り・白テキスト。

```tsx
<TabsTrigger
  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground
    data-[state=active]:bg-cta data-[state=active]:text-white data-[state=active]:shadow-sm
    after:hidden"
>
```

### 商品カード

```tsx
<div className={cn(
  "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all",
  isSelected
    ? "border-cta/40 shadow-sm shadow-cta/10"
    : "hover:border-border-strong hover:shadow-sm"
)}>
  {/* 画像エリア: 周囲に p-3 の余白 */}
  <div className="flex aspect-square w-full items-center justify-center overflow-hidden border-b p-3 bg-surface/40">
    <img className="h-full w-full rounded-sm object-contain" />
  </div>

  {/* 情報エリア */}
  <div className="flex flex-1 flex-col gap-2 p-3">
    <div className="flex flex-col gap-0.5">
      <p className="text-sm font-medium leading-snug">{name}</p>
      <span className="text-sm font-semibold tabular-nums">{price}</span>
    </div>
    {/* バッジ行 */}
    {/* フッター: ラベル上・値下 */}
    <div className="mt-auto flex items-end justify-between border-t pt-2">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-medium text-muted-foreground">販売</span>
        <span className="text-sm font-semibold tabular-nums">{sales}</span>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[10px] font-medium text-muted-foreground">売上</span>
        <span className="text-sm font-semibold tabular-nums">{revenue}</span>
      </div>
    </div>
  </div>
</div>
```

### ボタン

```tsx
// CTA（青・主要アクション）
<Button className="bg-cta text-cta-foreground hover:bg-cta-hover">新規作成</Button>

// Primary（黒・汎用保存）
<Button>保存</Button>

// Outline（キャンセル等）
<Button variant="outline">キャンセル</Button>

// Ghost Destructive（削除）
<Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
  削除
</Button>
```

### Input

フォーカス時: `border-cta`（青）に変化。`ring` は非表示。

```tsx
// src/shared/components/ui/input.tsx で設定済み
"border border-input bg-card focus-visible:border-cta focus-visible:ring-0"
```

### サイドバー アクティブ状態

```tsx
// 通常ナビ項目
className={cn(
  "rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
  isActive
    ? "bg-cta/8 font-semibold text-cta ring-1 ring-cta/50"
    : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
)}

// 無効（未実装ページ）
className="cursor-not-allowed text-foreground/25"
```

### セクションカード（設定・フォーム）

```tsx
<section className="rounded-xl border border-border bg-card p-6 flex flex-col gap-6">
  <h2 className="text-base font-semibold">{title}</h2>
  {/* フォームフィールド */}
  <Button className="bg-cta text-cta-foreground hover:bg-cta-hover">更新する</Button>
</section>
```

### 一括操作バー（フローティング）

画面下部に fixed 表示。ライトテーマで画面に馴染ませる。

```tsx
<div className="pointer-events-auto flex items-center gap-2 rounded-full border bg-card px-4 py-2 shadow-md">
  <span className="text-sm font-medium">{count}件選択</span>
  <Separator orientation="vertical" className="h-5" />
  {/* アクションボタン群 */}
  {/* 削除: text-destructive hover:bg-destructive/10 */}
</div>
```

### テーブル

- ヘッダー文字: `text-foreground/60`（`text-muted-foreground` より少し濃い）
- ヘッダー背景: `bg-surface/60`
- 行ホバー: `hover:bg-surface/50`
- 選択行: `data-[state=selected]:bg-surface`
- 商品名列: 幅フレキシブル（残り全部）
- 数値列: `w-20`〜`w-28`（コンパクトに）

---

## バッジ（販売形態）

販売形態バッジは「分類」なので派手にしない。各色は `display.tsx` の `SALE_TYPE_BADGE` で一元管理。

| 販売形態  | 色                                          |
| --------- | ------------------------------------------- |
| デジタル  | `border-cta/25 bg-cta/10 text-cta`         |
| コース    | `border-success/25 bg-success/10 text-success` |
| 予約      | `border-warning/25 bg-warning/10 text-warning` |
| サブスク  | `border-link/25 bg-link/10 text-link`      |

## ステータスバッジ（タブカウント）

アクティブタブのバッジは色濃く、非アクティブは薄く。

```tsx
// 公開中タブ
isActive ? "bg-success/15 text-success" : "bg-success/10 text-success/60"

// 下書きタブ
isActive ? "bg-warning/15 text-warning" : "bg-warning/10 text-warning/60"

// すべてタブ
isActive ? "bg-foreground/10 text-foreground" : "bg-foreground/5 text-muted-foreground"
```

---

## 禁止事項

| 禁止                        | 代替                                     |
| --------------------------- | ---------------------------------------- |
| `bg-[#xxx]` 任意値          | semantic token を使う                    |
| `gap-[10px]` 任意値         | Tailwind スケール値（`gap-2.5` 等）      |
| `style={{ color: '#xxx' }}` | token クラスを使う                       |
| 新規コンポーネントに S2     | shadcn/ui + Tailwind CSS v4             |
| Storybook / Vitest          | `npm run build` + `npm run lint` で検証  |
| shadow を 2 段以上重ねる    | 1 段階（shadow-sm）のみ                  |
| カードに枠なしで直接影      | `border` + 必要なら `shadow-sm`          |
