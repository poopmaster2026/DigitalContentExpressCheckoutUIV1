---
name: figma-shadcn-implement
description: |
  Figma のデザインから React + shadcn/ui のコンポーネントを実装するワークフロー。
  `figma-shadcn-design` の逆方向。受け取った Figma URL（node-id 付き）の MCP 経由で
  デザインを取得し、要件と `CLAUDE.md` / `src/app/globals.css`（デザイントークン）に
  準拠した実装コードを生成する。

  このスキルの主目的は 4 つ:
  1. Figma のデザインを `features/{feature}/{page-name}/` の Container/Presentational 構造に正しく翻訳する
  2. **shadcn/ui のコンポーネントのみで実装する**（kit にない要素はエスカレーション）
  3. **デザイントークン（src/app/globals.css）に準拠した Tailwind className を使う**
  4. **デザインがアーキテクチャ/shadcn 規約から外れている場合は、ドキュメントと shadcn MCP を使って実装側で整える**

  トリガー条件:
  - `/figma-shadcn-implement <Figma URL>` の明示呼び出し
  - 「Figma からコンポーネント実装して」「この Figma を React に起こして」等
  - figma.com の URL（特に node-id 付き）を提示されて実装を依頼されたとき
---

# figma-shadcn-implement

`figma-shadcn-design` で起こした（あるいは外部から渡された）Figma デザインを、
DigitalContentExpressCheckoutUIV1 の実装（React + shadcn/ui）に落とすスキル。

## 絶対ルール（最優先）

1. **shadcn/ui のコンポーネントのみで実装する** — `shared/components/ui/` 配下にある（または `npx shadcn@latest add` で追加できる）コンポーネントのみで組む
2. **kit / レジストリにないコンポーネントが必要な瞬間に作業停止 → エスカレーション**
3. **`src/app/globals.css` のトークン（color / radius / Tailwind spacing スケール）から一切外れない**
4. **要件メモ（あれば）を読まずに実装しない**
5. **アイコンは `lucide-react` のみ。絵文字 / Unicode 矢印 / ASCII シンボルは禁止**
6. **Container/Presentational パターンを必ず守る** — データ取得を含むものは `Xxx.tsx` + `XxxUI.tsx` の 2 ファイル

## 前提: 必読ドキュメント

このスキルを起動したら、**作業前に必ず以下を Read する**:

1. [`docs/ARCHITECTURE.md`](../../../docs/ARCHITECTURE.md)
2. [`docs/DESIGN-SYSTEM.md`](../../../docs/DESIGN-SYSTEM.md)
3. [`CLAUDE.md`](../../../CLAUDE.md)
4. **要件ドキュメント（存在すれば）** — `docs/` 配下

## 対象 Figma ファイル

| 役割 | URL / fileKey | 用途 |
| --- | --- | --- |
| **kit Figma**（shadcn 仕様の参照元） | `Z4Ea6ZuZZniEWeK0LNE1Wl` | shadcn/ui components with variables |
| **操作対象 Figma**（モック取得元） | `<操作対象 fileKey 未設定>` | V1 デザインファイル（初回にユーザーから受領） |

## ワークフロー

### Step 0: 引数の解釈と Figma URL の確定（必須）

node-id 付き URL から fileKey/nodeId 抽出 → `get_metadata({fileKey, nodeId})`。ヒットしたら Frame 名・子要素数を出力してユーザー承認後に Step 1 へ。

### Step 1: Figma デザインのフル取得（必須）

```
1. mcp__plugin_figma_figma__get_metadata({ fileKey, nodeId })
2. mcp__plugin_figma_figma__get_design_context({ fileKey, nodeId })
3. mcp__plugin_figma_figma__get_variable_defs({ fileKey, nodeId })
4. mcp__plugin_figma_figma__get_screenshot({ fileKey, nodeId })
```

### Step 2: 要件ファイルの特定と Read

対応する要件ドキュメントを特定して Read。「必須要件チェックリスト」を抽出（Step 10 で照合）。

### Step 3: shadcn コンポーネント・ガード（実装前の早期チェック）

1. `ls src/shared/components/ui/` で既存確認
2. 無ければ shadcn MCP → `vercel-plugin:shadcn` Skill → `npx shadcn@latest list` で確認
3. registry にあれば `npx shadcn@latest add <name>`
4. どちらにも無ければ即停止 → エスカレーション

### Step 4: ディレクトリ・ファイル構造の決定と shadcn インストール

`CLAUDE.md` のディレクトリ構成に従う:

```
src/features/<feature>/<page-name>/<section>/
├── <Section>.tsx            # Container（ロジック・データ取得）
├── <Section>UI.tsx          # Presentational（表示のみ）
└── <Section>Skeleton.tsx
```

### Step 5: Presentational（`XxxUI.tsx`）の実装

| Figma 側 | Tailwind |
| --- | --- |
| Direction: Vertical / Horizontal | `flex flex-col` / `flex` |
| Gap: 16 | `gap-4` |
| Padding: 24 | `p-6` |
| color `background` / `foreground` | `bg-background` / `text-foreground` |
| Radius: 12 / 6 | `rounded-xl` / `rounded-md` |

実装規約:
- **`className` を props で受け取り `cn()` でマージ可能に**
- **データは props で受け取り、内部で取得しない**
- **`'use client'` はイベント/`useState`/`useEffect` を使う時だけ**
- **アイコンは `lucide-react` から import**

```tsx
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'

type Props = { amount: number; disabled?: boolean; className?: string }

export function PaymentFormUI({ amount, disabled, className }: Props) {
  return (
    <Card className={cn('flex flex-col gap-6 p-6', className)}>
      <p className="text-2xl font-semibold">¥{amount.toLocaleString()}</p>
      <Button disabled={disabled} className="w-full">支払う</Button>
    </Card>
  )
}
```

### Step 6: Container（`Xxx.tsx`）と Skeleton の実装

Container はデータ取得・Suspense のみ。Skeleton は `XxxUI` と同じ寸法・配置で shadcn `<Skeleton>` に置換。

### Step 7: デザイントークン充足検証（必須）

```bash
grep -E "\bbg-\[|text-\[|gap-\[|p-\[|w-\[|h-\[|rounded-\[" src/<対象パス>
```
任意値が 0 件か確認。

### Step 8: 規約への寄せ直し

| Figma 側の状態 | 実装側の対応 |
| --- | --- |
| 生 hex で塗っている | 最も近い semantic token を globals.css から選ぶ |
| spacing が半端な値 | 4 の倍数で最も近い値に丸める |
| アイコンが絵文字 | `lucide-react` の該当アイコンに置換 |

### Step 9: 最終チェックリスト（完了報告前）

- [ ] Container / Presentational / Skeleton の分割（データ依存 UI）
- [ ] `XxxUI.tsx` が props のみ受け取り、内部でデータ取得していない
- [ ] アイコンは全て `lucide-react`
- [ ] 任意値 className が 0 件
- [ ] 追加した shadcn コンポーネントが `src/shared/components/ui/` に存在
- [ ] `npm run build` + `npm run lint` でエラーが出ない

## 参照リンク

- kit Figma: https://www.figma.com/design/Z4Ea6ZuZZniEWeK0LNE1Wl/
- [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)
- [docs/DESIGN-SYSTEM.md](../../../docs/DESIGN-SYSTEM.md)
- [src/app/globals.css](../../../src/app/globals.css)
- [CLAUDE.md](../../../CLAUDE.md)
- [figma-shadcn-design](../figma-shadcn-design/SKILL.md)
