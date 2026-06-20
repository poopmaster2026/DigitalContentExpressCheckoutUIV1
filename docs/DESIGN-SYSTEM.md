# デザインシステム

shadcn/ui（new-york スタイル）+ Tailwind CSS v4 を使う。
実体は `src/app/globals.css` の CSS 変数と `@theme inline` ブロック。

---

## カラートークン

すべてのカラーは semantic token 経由で使う。`bg-[#xxx]` 形式は禁止。

### Surface（背景・面）

| Tailwind クラス     | CSS 変数           | 値          | 用途                                   |
| ------------------- | ------------------ | ----------- | -------------------------------------- |
| `bg-background`     | `--background`     | `#F2F1EF`   | ページ背景（温かみのあるライトベージュ）|
| `bg-surface`        | `--surface`        | `#f6f5f4`   | カード内の補助面（ファイルアップロード枠等）|
| `bg-surface-muted`  | `--surface-muted`  | `#eeedeb`   | やや暗い補助面                         |
| `bg-card`           | `--card`           | `#ffffff`   | カード・ポップオーバー（純白）          |
| `bg-popover`        | `--popover`        | `#ffffff`   | Popover / DropdownMenu の背景          |

### テキスト

| Tailwind クラス        | CSS 変数              | 値         | 用途                   |
| ---------------------- | --------------------- | ---------- | ---------------------- |
| `text-foreground`      | `--foreground`        | `#1c1a19`  | 本文・ラベル           |
| `text-muted-foreground`| `--muted-foreground`  | `#6e6864`  | サブテキスト・プレースホルダ |
| `text-card-foreground` | `--card-foreground`   | `#1c1a19`  | カード内テキスト       |

### Primary（黒ボタン・汎用）

| Tailwind クラス          | CSS 変数            | 値         | 用途                     |
| ------------------------ | ------------------- | ---------- | ------------------------ |
| `bg-primary`             | `--primary`         | `#0d0d0d`  | shadcn Button default    |
| `bg-primary-hover`       | `--primary-hover`   | `#262626`  | ホバー時                 |
| `bg-primary-active`      | `--primary-active`  | `#000000`  | アクティブ時             |
| `text-primary-foreground`| `--primary-foreground`| `#ffffff` | primary ボタン文字色     |

### CTA（行動喚起ボタン）

新規作成・保存などの主要アクションに使う。`bg-primary` の代わりに明示的に使う。

| Tailwind クラス     | CSS 変数       | 値         | 用途               |
| ------------------- | -------------- | ---------- | ------------------ |
| `bg-cta`            | `--cta`        | `#2563eb`  | CTA ボタン背景（青）|
| `bg-cta-hover`      | `--cta-hover`  | `#1d4ed8`  | ホバー時           |
| `text-cta-foreground`| `--cta-foreground`| `#ffffff`| CTA ボタン文字色   |
| `border-cta`        | `--cta`        | `#2563eb`  | フォーカスリング   |

```tsx
// 使い方
<Button className="bg-cta text-cta-foreground hover:bg-cta-hover">
  新規作成
</Button>
```

### Link（リンク・アクセントカラー）

リンク・選択状態など「ここぞ」という 1 点だけに使う暖色アクセント。

| Tailwind クラス  | CSS 変数  | 値         |
| ---------------- | --------- | ---------- |
| `text-link`      | `--link`  | `#b5450f`  |

### Semantic（状態色）

| Tailwind クラス          | CSS 変数          | 値         | 用途             |
| ------------------------ | ----------------- | ---------- | ---------------- |
| `text-destructive`       | `--destructive`   | `#dc2626`  | エラー・削除     |
| `bg-destructive`         | `--destructive`   | `#dc2626`  | 削除ボタン背景   |
| `text-warning`           | `--warning`       | `#d97706`  | 警告             |
| `text-success`           | `--success`       | `#16a34a`  | 成功             |
| `bg-success`             | `--success`       | `#16a34a`  | 成功トースト背景 |

### Muted（セカンダリ面）

| Tailwind クラス      | CSS 変数        | 値         | 用途                          |
| -------------------- | --------------- | ---------- | ----------------------------- |
| `bg-secondary`       | `--secondary`   | `#eeedeb`  | セカンダリボタン背景          |
| `bg-muted`           | `--muted`       | `#f6f5f4`  | disabled / 薄い背景           |
| `bg-accent`          | `--accent`      | `#eeedeb`  | hover 背景（DropdownMenu 等） |

### Border / Input / Ring

| Tailwind クラス  | CSS 変数        | 値                              | 用途                            |
| ---------------- | --------------- | ------------------------------- | ------------------------------- |
| `border-border`  | `--border`      | `rgba(28,25,23,0.12)`           | カード・テーブルの線            |
| `border-border-strong`| `--border-strong`| `rgba(28,25,23,0.20)`     | より目立つ線                    |
| `border-input`   | `--input`       | `rgba(28,25,23,0.18)`           | Input / Select のデフォルト枠   |
| `border-cta`     | `--cta`         | `#2563eb`                       | フォーカス時の枠（focus-visible）|
| `ring-ring`      | `--ring`        | `rgba(28,25,23,0.35)`           | focus リング                    |

#### Input フォーカス規約

- デフォルト: `border-input`（グレー）
- フォーカス時のみ: `focus-visible:border-cta focus-visible:ring-0`

```tsx
// Input コンポーネントの正しいスタイル
"border border-input focus-visible:border-cta focus-visible:ring-0"
```

### Shadow

Tailwind のシャドウユーティリティではなく CSS 変数で定義。`shadow-xs` / `shadow-sm` を主に使う。

| クラス      | 用途                     |
| ----------- | ------------------------ |
| `shadow-xs` | カード・ポップオーバー   |
| `shadow-sm` | 小さな浮き上がり要素     |
| `shadow-md` | モーダル・ドロップダウン |
| `shadow-lg` | 大きなポップオーバー     |

### Sidebar（ダークサイドバー）

サイドバーは独立したダークトーン。

| Tailwind クラス             | CSS 変数                     | 値                       |
| --------------------------- | ---------------------------- | ------------------------ |
| `bg-sidebar`                | `--sidebar`                  | `#1c1a19`                |
| `text-sidebar-foreground`   | `--sidebar-foreground`       | `rgba(255,255,255,0.72)` |
| `bg-sidebar-accent`         | `--sidebar-accent`           | `#2e2b29`                |
| `text-sidebar-accent-foreground`| `--sidebar-accent-foreground`| `#ffffff`            |

---

## タイポグラフィ

| 用途         | フォント                                  |
| ------------ | ----------------------------------------- |
| UI テキスト  | Inter, Noto Sans JP（日本語混在に対応）  |
| コード・数値 | ui-monospace                              |

---

## Border Radius

| Tailwind クラス | 値（`--radius` = `0.625rem`）  |
| --------------- | ------------------------------ |
| `rounded-sm`    | `0.25rem`（radius - 4px）      |
| `rounded-md`    | `0.5rem`（radius - 2px）       |
| `rounded-lg`    | `0.625rem`（= radius）         |
| `rounded-xl`    | `0.875rem`（radius + 4px）     |

---

## コンポーネント使用ガイド

### ボタン

```tsx
// 通常アクション
<Button variant="outline" size="sm">キャンセル</Button>

// CTA（行動喚起）
<Button className="bg-cta text-cta-foreground hover:bg-cta-hover">
  新規作成
</Button>

// 危険操作
<Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
  削除
</Button>
```

### フォームフィールド

- デフォルト枠: `border-input`（グレー）
- フォーカス時: `border-cta`（青）に自動変化
- エラー時: `border-destructive` を `cn()` で付与

### タブアンダーライン

shadcn Tabs の `variant="line"` を使い、`after:!bottom-0` で underline を位置調整。

```tsx
<TabsList variant="line" className="h-auto bg-transparent p-0">
  <TabsTrigger className={cn(
    "h-auto rounded-none border-0 bg-transparent px-2 pb-2.5 pt-0 text-sm shadow-none after:!bottom-0",
    "data-[state=active]:bg-transparent data-[state=active]:text-foreground",
  )}>
    タブラベル
  </TabsTrigger>
</TabsList>
```

### ページネーションのアクティブページ

背景色はページ背景 `--background`（ベージュ）に対して `--card`（白）で区別する。
`!bg-card` の `!important` が必要（tailwind-merge が custom token を競合認識しないため）。

```tsx
className={p === currentPage ? "!bg-card" : undefined}
```

---

## 使用禁止

| 禁止事項                  | 代替                              |
| ------------------------- | --------------------------------- |
| `bg-[#xxx]` 任意値クラス  | semantic token を使う             |
| `gap-[10px]` 任意値クラス | Tailwind スケール値を使う（`gap-2.5` 等）|
| raw CSS `style={{ color: '#xxx' }}`| token クラスを使う  |
| 新規コンポーネントに S2   | shadcn/ui + Tailwind CSS v4 を使う|
| 新規コンポーネントに Storybook / Vitest | `npm run build` + `npm run lint` で検証 |
