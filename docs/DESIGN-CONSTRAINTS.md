# DESIGN-CONSTRAINTS.md — AI-slop 回避ルール

このファイルは **禁止パターン＋具体トークン** の集合体。
デザインの意図（なぜこう見えるか）は `docs/DESIGN-SYSTEM.md` を参照。
実装判断に迷ったら、まず「この制約に違反していないか」を確認すること。

> **背景**: LLM は「統計的中心値」をサンプリングする傾向があるため、
> 明示的に禁止しない限り Inter / 紫グラデ / 全幅白 hero という
> 最も平均的な選択に収束する（Anthropic "Improving frontend design through Skills"）。
> 具体値で制約することで、この収束を上書きする。

---

## 1. フォント

### 禁止
| 禁止フォント | 理由 |
|---|---|
| Inter | 最も多用される汎用 sans-serif。「AI 製」と一目でわかる。 |
| Roboto / Open Sans / Lato | 同上。Google Fonts の統計的最頻値。 |
| Space Grotesk | 「技術系スタートアップ」の記号。個性がない。 |
| system-ui / -apple-system | Chrome 既定フォールバック。意図のある選択ではない。 |
| 外部 @import / next/font | フォントを追加してはいけない。 |

### 正解
```
Adobe Clean — S2 が Typekit から自動ロードする。追加設定不要。
日本語: S2 が locale に応じて自動フォールバック。
```

---

## 2. カラー

### 禁止パターン
| パターン | なぜダメか |
|---|---|
| 白 or 薄グレー背景 ＋ 青グラデ CTA ボタン | 汎用 SaaS の典型。このプロジェクトのブランドではない。 |
| 紫グラデーション Hero 背景（#6366f1→#8b5cf6 など） | AI 生成 UI の最頻出パターン。明示的禁止。 |
| `violet` / `purple` 系をメインカラーに使う | `brand.violet (#9674FF)` はプレミアム導線専用バッジ色。背景・ボタン・テキストに流用しない。 |
| ガラスモーフィズム（backdrop-filter: blur + 白透過） | 全面使用禁止。アクセント的にも使わない。 |
| 全要素への box-shadow 多用 | 浮いた感がうるさい。カードは 1 種類のブランドシャドウのみ。 |
| 真っ白 (#ffffff) をページ背景に | キャンバスは `gray-75 (#f3f3f3)`。白はカード面のみ。 |

### 正解トークン（優先順）
```
ページ背景     → gray-75           (#f3f3f3)
カード面       → gray-25 / white   (#ffffff)
ボーダー       → gray-100          (#e9e9e9)
本文テキスト   → neutral           (#292929 = gray-800)
副次テキスト   → neutral-subdued
主要 CTA       → variant="accent"  (tokens 設定後: indigo #5157E4)
Chrome 背景    → --brand-chrome    (#1d1d1d) ← globals.css 変数のみ
Hero グラデ    → --brand-hero-gradient  ← globals.css 変数のみ
              = linear-gradient(90deg, #FF9416 0%, #FEC082 30%, #9FB6FA 62%, #D795AC 100%)
```

**raw hex を `style()` マクロに渡してはいけない** — S2 token 名を使う。
ブランド層（chrome / Hero）だけが例外で、CSS 変数または brand-tokens.ts 定数を使う。

---

## 3. レイアウト

### 禁止パターン
| パターン | なぜダメか |
|---|---|
| 全幅白背景 ＋ max-w-xl 中央寄せカード群 | Tailwind 系のデフォルトレイアウト。Adobe Express の黒 Chrome とは真逆。 |
| Navbar を上部横並び（水平 nav） | このプロジェクトのナビは**左縦サイドバー（幅 80px）**。横は使わない。 |
| ヒーロー = 「大きい画像 ＋ 中央テキスト ＋ グラデ CTA ボタン」 | マーケティングサイトのパターン。管理 UI に持ち込まない。 |
| 全カードに rounded-2xl ＋ heavy shadow | カード角は `xl`（約 16px）。shadow は brand.cardShadow 1 種類のみ。 |
| フローティングボタン（FAB）を右下に配置 | Chrome Sidebar の「＋作成」ボタンが主要アクション。FAB は使わない。 |

### 正解レイアウト構造
```
AppShell:
  ├── Header   高さ 56px  background: --brand-chrome
  │   ├── Left: グラデロゴ + "Ours" + ストア名
  │   └── Right: 検索 / アバター / アップグレードボタン
  ├── Sidebar  幅 80px    background: --brand-chrome
  │   ├── + 作成ボタン（indigo, borderRadius: full）
  │   └── ナビ: Home / 商品 / 注文 / 分析 / 設定
  └── Content  残り幅     background: gray-75
```

---

## 4. コンポーネント

### 禁止パターン
| パターン | 正解 |
|---|---|
| `import` from `lucide-react` | `@react-spectrum/s2/icons/*` のみ |
| shadcn/Radix の `<Card>`, `<Button>` など | `@react-spectrum/s2/*` のみ |
| Tailwind クラス (`className="px-4 text-sm"`) | `style()` マクロ |
| `className={cn(...)}` パターン | `className={style(...)}` |
| グローバル CSS でデザイントークンを管理 | `style()` マクロで S2 トークンを使う。CSS 変数はブランド層のみ |

### S2 コンポーネント対応表
| デザイン要素 | 使う S2 コンポーネント |
|---|---|
| 商品グリッド | `CardView` + `AssetCard` |
| 注文リスト | `ListView` + `ListViewItem` |
| カテゴリ切替 | `SegmentedControl` または `Tabs` |
| 検索 | `SearchField` |
| CTA ボタン | `Button variant="accent"` |
| アクションボタン（アイコン） | `ActionButton` |
| メールフォーム | `TextField` (react-hook-form と組み合わせ) |
| 支払い方法選択 | `RadioGroup` + `Radio` |
| 同意チェック | `Checkbox` |
| バッジ | `Badge` |
| アバター | `Avatar` |

---

## 5. S2 スタイリング制約

```ts
// ✅ 正解: token 名を使う
className={style({ backgroundColor: 'gray-75', padding: 24, borderRadius: 'xl' })}

// ❌ NG: raw hex / rem / string px
className={style({ backgroundColor: '#f3f3f3' })}   // hex 不可
className={style({ padding: '1rem' })}               // string 不可

// ✅ S2 コンポーネントには styles prop
<Button styles={style({ marginTop: 16 })}>...</Button>

// ✅ ブランド Chrome は CSS 変数で（マクロ外）
<header className="brand-chrome">...</header>

// ✅ Hero グラデ
<section className="brand-hero">...</section>
```

---

## 6. よくある AI 生成 UI の症状と対処

| 症状 | このプロジェクトでの正解 |
|---|---|
| 全体が「白背景＋青いアクセント」 | キャンバス `gray-75`、Chrome `#1d1d1d`、accent は indigo |
| ヘッダーが白い水平 Navbar | ヘッダーは黒 Chrome + 左サイドバー構成 |
| カードがすべて角丸 XL ＋ 深い影 | radius `xl`、shadow は `brand.cardShadow` 1 種のみ |
| ナビに使われているアイコンが lucide-react | `@react-spectrum/s2/icons/` の S2 アイコンのみ |
| Hero に紫グラデ | Hero は `--brand-hero-gradient`（橙→桃→青紫→マーブ）のみ |
| フォントが Inter / Space Grotesk | Adobe Clean のみ（追加 import 禁止） |

---

## 参考リンク
- Anthropic Blog: [Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)
- このプロジェクトの詳細設計: `docs/DESIGN-SYSTEM.md`
- S2 コンポーネント API: `react-spectrum-s2` MCP または `.claude/skills/react-spectrum-s2`
