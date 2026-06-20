---
name: figma-shadcn-design
description: |
  DigitalContentExpressCheckoutUIV1 の画面デザインを Figma で起こすためのワークフロー。
  shadcn/ui Figma kit（Library 登録済み）から **shadcn コンポーネントのみ** を使い、
  操作対象 Figma ファイルに「実装/Storybook と 1:1 対応する構造」でモックを生成する。

  このスキルの主目的は3つ:
  1. Figma 構造を実装後の摩擦が最小になるように設計する（Frame 階層・命名・状態網羅・Auto Layout 規約）
  2. **shadcn 以外のコンポーネントを絶対に使わない** — kit にない場合はユーザーにエスカレーション
  3. **デザイントークン（src/app/globals.css）と要件に対する充足性を必ず検証**する

  トリガー条件:
  - `/figma-shadcn-design <意図>` の明示呼び出し
  - 「shadcn でデザイン作って」「Figma で画面を組んで」「チェックアウト画面の Figma 作って」等
  - 新しいページ・セクションのビジュアルモックが必要なとき
---

# figma-shadcn-design

DigitalContentExpressCheckoutUIV1 プロジェクトで新しい画面・セクションのデザインを起こすためのスキル。
shadcn/ui Figma kit をベースにして、**実装に翻訳しやすい構造**で操作対象 Figma ファイルにモックを生成する。

## 操作対象 Figma の設定（初回必須）

操作対象 Figma ファイルの fileKey は **未設定**。初回起動時にユーザーから対象ファイルの URL を受け取り、
`<操作対象 fileKey>` を実際の fileKey に読み替える（必要なら本ファイルを更新する）。kit Figma は generic な
shadcn/ui community kit を使うため固定でよい。

## 絶対ルール（最優先）

1. **shadcn 以外のコンポーネントを Figma に作らない** — kit Figma（`Z4Ea6ZuZZniEWeK0LNE1Wl`）に存在するコンポーネントのみを instance として配置する。独自 Frame で「Button っぽいもの」を組み立てない
2. **kit にないコンポーネントが必要になった瞬間に作業を止めてユーザーに報告** — 候補・近いコンポーネント・追加が必要なら shadcn registry 上のコンポーネント名を提示し、判断を仰ぐ
3. **`src/app/globals.css` のトークン（color / radius、および Tailwind の spacing スケール）から一切外れない** — 表外の生 hex / 半端な spacing を使わない
4. **要件メモ（あれば）に記載された要件を全て充足するまで完了報告しない** — 充足チェックなしに「できた」と言わない。要件ドキュメントが無い場合は Step 1.5 でユーザーと要件を固める
5. **アイコンは絶対に絵文字を使わない。必ず shadcn kit の lucide/* インスタンスを使う** — 全て kit Figma の `lucide/<name>` コンポーネント instance として配置する
6. **要件充足チェックの妨げになる「折りたたみ」「コラプス」「省略」を Figma 上で使わない** — 全 section / 全 field / 全 variant / 全 state を **常に展開した状態**で配置する
7. **同じ UI パターンは 1 個だけサンプルとしてデザインすればよい** — 構造が完全に同じで値だけ違うものは 1 個きちんとデザインすれば他は省略可
8. **一体感ルール** — icon と隣接する text は同じ意味色を共有する
9. **崩れ・はみ出し・重なり禁止** — 後述「## 崩れ防止チェックリスト」を生成後に必ず検証する
10. **色の意味階層を守る（選択フィードバック ≠ 確定ボタン）** — 選択中 ring/バッジは `brand-blue (#007aff)`、確定ボタンは `primary (黒)` or `destructive (赤)`
11. **要件が固まっていない状態で Figma を書き始めない** — 未解決の論点がある場合は `grill-me` skill を起動してユーザーと要件を詰める

## 崩れ防止チェックリスト（必ず生成後に検証）

### A. shadcn instance の inner text を書き換えた直後に `layoutSizingHorizontal = 'HUG'` を設定する

```js
const innerText = badge.findOne(n => n.type === 'TEXT');
if (innerText) {
  await figma.loadFontAsync(innerText.fontName);
  innerText.characters = '新規セッション受付中';
  innerText.layoutSizingHorizontal = 'HUG';
}
```

### B. 大見出し（fontSize >= 28）は parent の availableWidth を上回らないか確認

### C. 固定 width / height の Frame に auto-layout content を入れる時は overflow を確認

### D. 絶対座標 (`x`, `y`) で要素を配置しない（page-level の Frame 以外）

### E. INSTANCE 内 TEXT を変更したら全 page で audit を実行

```js
const page = await figma.getNodeByIdAsync('<pageId>');
await figma.setCurrentPageAsync(page);
const issues = [];
const insts = page.findAllWithCriteria({ types: ['INSTANCE'] }).filter(i => !i.id.startsWith('I'));
for (const inst of insts) {
  const txt = inst.findOne(n => n.type === 'TEXT');
  if (!txt) continue;
  if (txt.height > 30 && txt.layoutSizingHorizontal === 'FIXED') {
    issues.push({ type: 'text-wrap', inst: inst.name, txt: txt.characters });
  }
}
return issues;
```

**完了基準**: 全 page で audit 結果が空配列になるまで完了報告しない。

## 前提: 必読ドキュメント

このスキルを起動したら、**作業前に必ず以下を Read する**:

1. [`docs/ARCHITECTURE.md`](../../../docs/ARCHITECTURE.md) — 構造規約（ディレクトリ構成 / feature モジュール内構成 / Container・Presentational）
2. [`docs/DESIGN-SYSTEM.md`](../../../docs/DESIGN-SYSTEM.md) — デザイントークン（color / typography / spacing / radius / shadow）と shadcn コンポーネント仕様。実体は [`src/app/globals.css`](../../../src/app/globals.css)
3. **要件ドキュメント（存在すれば）** — `docs/` 配下や別途共有された仕様

## 対象 Figma ファイル

| 役割 | URL / fileKey | 用途 |
| --- | --- | --- |
| **kit Figma**（参照元） | `Z4Ea6ZuZZniEWeK0LNE1Wl` | shadcn/ui components with variables — Tailwind classes（Community） |
| **操作対象 Figma** | `<操作対象 fileKey 未設定>` | V1 デザインファイル（初回にユーザーから受領） |

## ワークフロー

### Step 0: 対象ページの確定（必須）

入力方式（優先順）:
1. **URL with node-id を 1 個以上受け取る（推奨）**
2. **引数 `--page=<ページ名>`**
3. **指定なし** — ページ一覧を出力 → ユーザーに確認

### Step 1: ユーザー意図の解釈と「実装構造」へのマッピング

意図を `features/{feature}/{page-name}/` の構造に先にマッピングする。

```
features/checkout/checkout-page/
├── CheckoutPage.tsx
├── CheckoutPageSkeleton.tsx
└── payment-form/
    ├── PaymentForm.tsx
    ├── PaymentFormUI.tsx
    ├── PaymentFormSkeleton.tsx
    └── components/
        └── PriceSummary.tsx
```

### Step 1.5: 要件の確定

要件ドキュメントがあれば Read して「必須要件チェックリスト」を抽出。**要件が固まっていなければ `grill-me` skill を起動**して詰める。

### Step 2: 必要なコンポーネントを kit Figma で全数確認（shadcn-only ガード）

参照優先順: ① kit Figma の Assets → ② shadcn MCP（`.mcp.json` 登録済み）→ ③ `vercel-plugin:shadcn` Skill → ④ `npx shadcn@latest list`

#### kit にないコンポーネントが必要な場合（必須エスカレーション）

作業を即停止し、以下フォーマットで報告:
```
⚠️ shadcn kit に該当コンポーネントが見つかりません。
必要だが kit にないもの: <名前>: 用途 <用途>
候補:
- [A] kit にある近いコンポーネントで代替
- [B] shadcn registry にあれば `npx shadcn@latest add <name>` で追加
- [C] 仕様を変えて kit で表現できる範囲に収める
- [D] カスタムコンポーネントを新規作成
```

### Step 3: kit Figma からコンポーネントを特定

```
mcp__plugin_figma_figma__get_metadata({ fileKey: "Z4Ea6ZuZZniEWeK0LNE1Wl" })
mcp__plugin_figma_figma__get_design_context({ fileKey: "Z4Ea6ZuZZniEWeK0LNE1Wl", nodeId: "<対象 node>" })
```

### Step 4: 操作対象ファイルに「実装構造に合わせた Frame 階層」を生成

**MANDATORY**: `use_figma` を呼ぶ前に必ず `figma:figma-use` スキルを先に load する。

Frame 階層:
```
{PageName}
├── {SectionUI}
├── {SectionUI} / Empty
├── {SectionUI} / Skeleton
└── {SectionUI} / Error
{PageName} / Skeleton
```

必須ルール:
1. **Frame 名 = 実装ファイル名（PascalCase）**
2. **状態 suffix は `/` 区切り**
3. **すべての container Frame に Auto Layout を有効化**
4. **shadcn kit コンポーネントは instance のまま配置（detach 禁止）**
5. **spacing / radius は 4 の倍数**
6. **色は variable binding 経由のみ**

### Step 5: 構造チェックリスト

- [ ] ページ Frame 名が `{PageName}` PascalCase
- [ ] セクション Frame 名が `{SectionName}UI`
- [ ] 4 状態が揃っている（データ依存 UI）
- [ ] 全 container Frame で Auto Layout ON
- [ ] shadcn instance が detach されていない
- [ ] 色は variable binding 経由（生 hex 無し）

### Step 6: デザイントークン充足検証（必須）

`src/app/globals.css` を開き、全 Frame に対してチェック:
- Color Tokens: globals.css の CSS 変数に対応しているか
- Spacing: 4 の倍数か
- Radius: Button/Input/Badge=`rounded-md`、Card=`rounded-xl`

### Step 7: 要件充足検証（要件メモがある場合は必須）

✅ 充足 / ⚠️ 部分充足 / ❌ 未充足 / 🤷 デザインスコープ外

完了基準: ❌ が 0 件。

### Step 8: 実装コードへの翻訳（オプション）

`figma-shadcn-implement` スキルに引き継ぐ。

## 参照リンク

- kit Figma: https://www.figma.com/design/Z4Ea6ZuZZniEWeK0LNE1Wl/
- [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)
- [docs/DESIGN-SYSTEM.md](../../../docs/DESIGN-SYSTEM.md)
- [src/app/globals.css](../../../src/app/globals.css)
- [CLAUDE.md](../../../CLAUDE.md)
- [figma-shadcn-implement](../figma-shadcn-implement/SKILL.md)
