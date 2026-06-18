# DigitalContentExpressCheckoutUIV1 デザインシステム

> `DigitalContentExpressCheckoutUI` から移植・調整したドキュメント。
> **色・トークンの単一の正は [`src/app/globals.css`](../src/app/globals.css)**、本ドキュメントは読みやすく整理した参照用。

shadcn/ui の各コンポーネントは `src/shared/components/ui/` に `npx shadcn@latest add <name>` で展開する。仕様の**単一の正はコード**、本ドキュメントは読みやすく整理した抜粋。

---

## 0. ベース思想

- **Notion-style** — 静かで余白が広く、コンテンツが主役。装飾は最小限
- **プライマリは黒（`#0D0D0D`）** — 強い色は使わず、コンテンツを邪魔しない
- **アクセントは 2 つの赤** — `destructive`（`#DC2626` red-600）と `warning`（`#EF4444` red-500）
- **shadcn/ui new-york style** — Radix UI プリミティブ + Tailwind CSS v4
- **アイコンは `lucide-react`**、サイズは text コンテキスト基準（16px / 14px / 12px）

---

## 1. Color Tokens

### 1.1 Background & Surface

| Token | Hex | 用途 | CSS 変数 |
| --- | --- | --- | --- |
| `bg/page` | `#FFFFFF` | カード・コンテンツ面の白 | `--background` |
| `bg/app` | `#F5F5F7` | アプリ全体の背景（Apple グレー） | `--surface` |
| `bg/surface` | `#F3F4F6` | カード・パネル等の控えめなサーフェス | `--secondary`, `--muted` |
| `bg/surface-muted` | `#E5E7EB` | hover/選択面 | `--accent` |
| `bg/brand-tint` | `#F2F9FF` | 情報系の淡い背景 | `--brand-tint` |

### 1.2 Text & Icon

| Token | Hex | 用途 | CSS 変数 |
| --- | --- | --- | --- |
| `text/primary` | `#0D0D0D` | 本文・見出し | `--foreground`, `--card-foreground` |
| `text/secondary` | `#615D59` | 説明文・サブテキスト | `--muted-foreground` |
| `text/inverse` | `#FFFFFF` | 暗背景上のテキスト | `--primary-foreground` |

### 1.3 Brand & Primary

| Token | Hex | 用途 | CSS 変数 |
| --- | --- | --- | --- |
| `brand/blue` | `#007AFF` | 選択フィードバック（ring / 「選択中」バッジ）| `--brand-blue`, `--info`, `--selected` |
| `brand/blue-hover` | `#0062CC` | brand/blue ホバー | `--brand-blue-hover` |
| `primary/solid` | `#0D0D0D` | プライマリボタン背景・テキスト基調 | `--primary`, `--ring` |
| `primary/text` | `#FFFFFF` | プライマリボタンのテキスト | `--primary-foreground` |

#### 色の意味階層

| 用途 | 色 |
| --- | --- |
| **選択フィードバック**（現在選択中の ring / バッジ） | `brand/blue` (#007AFF) |
| **ポジティブ・アクション**（プライマリ CTA） | `primary/solid` (#0D0D0D) |
| **破壊的アクション**（削除確定） | `destructive` (#DC2626) |
| **中立アクション**（Cancel） | outline + `text/primary` |

**ルール**: 「選択している状態」と「確定するボタン」を**同じ色にしない**。

### 1.4 Status

| Token | Hex | 用途 | CSS 変数 |
| --- | --- | --- | --- |
| `status/success` | `#2A9D99` | 成功・有効 | `--success` |
| `status/warning` | `#EF4444` | 警告（red-500） | `--warning` |
| `status/destructive` | `#DC2626` | 削除・エラー（red-600） | `--destructive` |
| `status/info` | `#007AFF` | 情報・通知 | `--info` |

### 1.5 Border

| Token | Hex | CSS 変数 |
| --- | --- | --- |
| `border/default` | `#E5E5E5` | `--border`, `--input` |

---

## 2. Typography

### 2.1 Font Family

| 用途 | フォント | CSS 変数 |
| --- | --- | --- |
| **sans（既定）** | -apple-system / Hiragino Sans / system-ui | `--font-sans` |
| mono | ui-monospace | `--font-mono` |

### 2.2 Type Scale

| Tailwind | Size | Weight | 用途 |
| --- | --- | --- | --- |
| `text-5xl font-bold` | 48px | 700 | ヒーローコピー |
| `text-4xl font-bold` | 36px | 700 | ページタイトル |
| `text-3xl font-bold` | 28px | 700 | セクションタイトル |
| `text-2xl font-bold` | 22px | 700 | サブセクション |
| `text-lg` | 18px | 400 | リード文 |
| `text-base` | 16px | 400 | 本文 |
| `text-sm` | 14px | 400 | UI ラベル・補助テキスト |
| `text-xs` | 13px | 400 | 注釈・キャプション |

---

## 3. Spacing Scale

Tailwind v4 デフォルト（4px ベース）。

| Token | px | Tailwind |
| --- | --- | --- |
| 4px | 4 | `gap-1` `p-1` |
| 8px | 8 | `gap-2` `p-2` |
| 12px | 12 | `gap-3` `p-3` |
| 16px | 16 | `gap-4` `p-4` |
| 24px | 24 | `gap-6` `p-6` |
| 32px | 32 | `gap-8` `p-8` |

### Spacing 規約

| 場面 | 値 |
| --- | --- |
| インライン要素（アイコン × テキスト） | `gap-2`（8px） |
| カード内パディング | `p-6`（24px） |
| カード内ブロック間 | `gap-6`（24px） |
| フォーム要素間 | `gap-4`（16px） |

---

## 4. Radius Scale

| Token | Tailwind | 用途 |
| --- | --- | --- |
| `radius/md` | `rounded-md` | **Button**, **Input**, **Badge** |
| `radius/xl` | `rounded-xl` | **Card**, Dialog |
| `radius/full` | `rounded-full` | Avatar, pill Badge |

`--radius: 0.625rem`（10px）ベース。`@theme inline` で `radius-sm/md/lg/xl` を派生。

---

## 5. Shadow Scale

| Tailwind | 用途 |
| --- | --- |
| `shadow-xs` | Input, Button (outline) |
| `shadow-sm` | **Card** |
| `shadow-lg` | Popover, Dropdown |
| `shadow-xl` | Dialog |

---

## 6. Components 仕様

### Button

```tsx
import { Button } from "@/shared/components/ui/button"
import { Trash2 } from "lucide-react"

<Button>保存</Button>
<Button variant="destructive"><Trash2 /> 削除</Button>
<Button variant="outline" size="sm">キャンセル</Button>
<Button variant="ghost" size="icon"><Trash2 /></Button>
```

variants: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
sizes: `xs` | `sm` | `default` | `lg` | `icon-xs` | `icon-sm` | `icon` | `icon-lg`

### Input

```tsx
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"

<div className="flex flex-col gap-2">
  <Label htmlFor="email">メールアドレス</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>
```

Height: 36px, Radius: `rounded-md`, Shadow: `shadow-xs`

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/shared/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
    <CardDescription>説明文</CardDescription>
  </CardHeader>
  <CardContent><p>本文</p></CardContent>
  <CardFooter className="border-t">
    <Button>アクション</Button>
  </CardFooter>
</Card>
```

Padding: `py-6` / `px-6`, Radius: `rounded-xl`, Shadow: `shadow-sm`, Gap: `gap-6`

### Badge

```tsx
import { Badge } from "@/shared/components/ui/badge"

<Badge>公開中</Badge>
<Badge variant="secondary">下書き</Badge>
<Badge variant="destructive">エラー</Badge>
<Badge variant="outline">タグ</Badge>
```

variants: `default` | `secondary` | `destructive` | `outline` | `ghost` | `link`

---

## 7. 関連リンク

- shadcn kit Figma: https://www.figma.com/design/Z4Ea6ZuZZniEWeK0LNE1Wl/
- [src/app/globals.css](../src/app/globals.css) — デザイントークンの実体
- [docs/ARCHITECTURE.md](./ARCHITECTURE.md) — ディレクトリ構成・実装規約
- [CLAUDE.md](../CLAUDE.md) — プロジェクト全体ルール
