# DESIGN-TOKENS.md — Spectrum 2 トークンリファレンス（Adobe Express 再現の事実集）

このファイルは **Adobe Express / Spectrum 2 (S2) のデザインシステム調査結果**。
「うちのプロダクトでどう使うか」の決定は [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md)、
禁止パターンは [`DESIGN-CONSTRAINTS.md`](./DESIGN-CONSTRAINTS.md) を参照。
実装時にトークン名・実値を引くときはこのファイルが正。

**出典（2026-06-11 実測。記憶ではなく以下から抽出した検証済みの値）**

| ソース | 用途 |
| --- | --- |
| `@adobe/spectrum-tokens` v14.13.0（公式トークン JSON） | hex / px の実値 |
| `@react-spectrum/s2` v1.4.0 `style/spectrum-theme.ts`（node_modules 内） | `style()` マクロが受け付けるトークン名と解決値 = **実装上の正** |
| Mobbin の Adobe Express 実画面（§1 にリンク） | 視覚言語の裏どり |

---

## 1. Adobe Express の視覚言語（実画面観察）

Mobbin 実画面: [Home（ヒーロー+クイックアクション）](https://mobbin.com/screens/65274596-ef62-485d-bdc0-9b0f29304d6a) /
[Home（アプリ切替メニュー）](https://mobbin.com/screens/01620735-34c0-4f7f-898a-615ce92c80dc) /
[Explore（テンプレ一覧+フィルタ）](https://mobbin.com/screens/695b842e-f913-440f-8223-de3aa242f976) /
[Webpage カテゴリ](https://mobbin.com/screens/dd085320-7564-47d9-8218-c3498484c2fe)

1. **黒 chrome**: 上ヘッダー + 左レール（アイコン+極小ラベルのナビ。Home / Your stuff / Brands / Templates / Schedule / Learn / Add-ons）。レール最上部に **indigo 円形の「+」作成ボタン**。
2. **コンテンツ面は白基調**。クイックアクションタイルは「白 + gray-100 ボーダー + 角丸 lg〜xl」で**影なし**。Express は影ではなく**hairline ボーダーで区切る**。サムネイルの下地にだけ gray-50/75。
3. **ピル形状言語**: 検索フィールド = フルピル（chrome 内ではダークピル）、フィルタチップ = ピル+ボーダー、主要ボタン = ピル。
4. カテゴリ切替は 2 種を使い分け: ページ上部 = **テキストタブ+下線インジケータ**（For you / Video / Photo…）、コンテンツ内 = **SegmentedControl**（Templates / Photos / Videos…）。
5. **ヒーロー** = ブランドグラデ帯（橙→桃→ペリウィンクル→モーヴ）、角丸 xl、中央に黒の extra-bold 見出し。ボタンやリンクには使わない。
6. コンテンツカードはサムネイル主体（角丸 default〜lg）。タイトル 13–14px、メタ情報 11–12px の gray-600 相当。
7. プレミアム導線のみ violet（Premium member ピル / Start free trial）。アバターはグラデーションリング。

---

## 2. カラー

### 2-1. 仕組み（S2 の色の引き方）

- `style()` マクロには **`hue-step` 名**（`blue-900` 等）か**セマンティック名**（`accent` 等）を渡す。
  マクロが `light-dark()` を自動生成するので **dark 対応は自動**（hex 直書きだと失われる）。
- セマンティック名はプロパティごとに解決先が違う（`backgroundColor: 'accent'` と `color: 'accent'` は別トークン）。
- `baseColor('blue-900')` ヘルパーで default/hover/down/focus の段階を自動生成できる。

### 2-2. 全 19 色相スケール（light テーマ実値）

gray のみ 25/50/75 あり: `gray-25 #FFFFFF` / `gray-50 #F8F8F8` / `gray-75 #F3F3F3`。
**900 がセマンティックの基準濃度**（accent/CTA）、800 が visual（アイコン・装飾）、100 が淡背景。

| hue | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 | 1100 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| gray | #E9E9E9 | #E1E1E1 | #DADADA | #C6C6C6 | #8F8F8F | #717171 | #505050 | #292929 | #131313 | #000000 | — |
| blue | #F5F9FF | #E5F0FE | #CBE2FE | #ACCFFD | #8EB9FC | #729EFD | #5D89FF | #4B75FF | #3B63FB | #274DEA | #1D3ECF |
| red | #FFF6F5 | #FFEBE8 | #FFD6D1 | #FFBCB4 | #FF9D91 | #FF7665 | #FF513D | #F03823 | #D73220 | #B72818 | #9C2113 |
| orange | #FFF6E7 | #FFECCF | #FFDA9E | #FFC15E | #FFA213 | #FC7D00 | #E86A00 | #D45B00 | #C24E00 | #A73E00 | #903300 |
| yellow | #FFF8CC | #FFF197 | #FFDE2C | #F5C700 | #E6AF00 | #D29500 | #C18300 | #AF7400 | #9E6600 | #865500 | #724800 |
| chartreuse | #F6FBDE | #EAF6AD | #D0EC46 | #B6DB00 | #A3C400 | #8FAC00 | #809900 | #728900 | #667A00 | #566700 | #495700 |
| celery | #EBFFDC | #C5FF9C | #9DF75C | #81E43A | #6ECE2A | #5DB41F | #52A119 | #489014 | #408111 | #346D0C | #2C5C09 |
| green | #EDFCF1 | #D7F7E1 | #ADEEC5 | #6BE3A2 | #2BD17D | #12B867 | #0BA45D | #079355 | #05834E | #036E45 | #025D3C |
| seafoam | #EBFBF6 | #D3F6EA | #A9EDD8 | #5CE1C2 | #10CFA9 | #0DB595 | #0BA286 | #099078 | #07816D | #056C5C | #035C50 |
| cyan | #EEFAFE | #D9F4FD | #B7E7FC | #8AD5FF | #5CC0FF | #30A7FE | #1D95E7 | #1286CD | #0B78B3 | #046691 | #005779 |
| indigo | #F7F8FF | #EBEEFF | #D8DEFF | #C0C9FF | #A7B2FF | #9197FE | #8480FE | #7A6AFD | #7155FA | #6338EE | #5424DB |
| purple | #FBF7FE | #F4EBFC | #EBDAF9 | #DDC1F6 | #D0A7F3 | #BF8AEE | #B272EB | #A65CE7 | #9A47E2 | #8628D9 | #730DCC |
| fuchsia | #FEF6FF | #FDE9FF | #FAD3FF | #F7B5FF | #F393FF | #EC69FF | #DF4DF5 | #C844DC | #B539C8 | #9C28AF | #871B9A |
| magenta | #FFF5F8 | #FFE8F0 | #FFD5E3 | #FFB9D0 | #FF98BB | #FF709F | #FF4885 | #F02D6E | #D92361 | #BA1650 | #A3053E |
| pink | #FFF6FC | #FFE8F7 | #FFD3F0 | #FFB5E6 | #FF94DB | #FF67CC | #F24CB8 | #E434A3 | #CE2A92 | #B01F7B | #981668 |
| turquoise | #EEFBFB | #D1F5F5 | #A9ECED | #6FDDE4 | #27CAD8 | #0FB1C0 | #0C9EAB | #0A8D99 | #087E89 | #056B74 | #035A62 |
| brown | #FCF7F2 | #F7EEE1 | #EFDDC3 | #E5C89D | #D6B17B | #BE9B68 | #AB8A5A | #9A7B4D | #8B6D42 | #775B32 | #674C23 |
| silver | #F7F7F7 | #EFEFEF | #DFDFDF | #CCCCCC | #B7B7B7 | #A0A0A0 | #8F8F8F | #808080 | #727272 | #606060 | #515151 |
| cinnamon | #FDF7F3 | #F9ECE5 | #F4DACB | #EDC4AC | #E5AA88 | #D4916C | #C67E58 | #B86D46 | #AA5E38 | #934D2B | #803E20 |

各スケールは 1600 まで続く（dark テーマでは段階が反転気味に再割当てされる）。
dark の実値が必要なときは `@adobe/spectrum-tokens` を引く。主要 2 色相の dark:

| step | gray (dark) | blue (dark) |
| --- | --- | --- |
| 25 / 50 / 75 | #111111 / #1B1B1B / #222222 | — |
| 100 | #2C2C2C | #0E173F |
| 300 | #393939 | #0C2175 |
| 500 | #6D6D6D | #1A3AC3 |
| 700 | #AFAFAF | #345BF8 |
| 800 | #DBDBDB | #4069FD |
| 900 | #F2F2F2 | **#5681FF**（dark の accent） |
| 1000 | #FFFFFF | #6995FE |

### 2-3. セマンティックトークン解決表（light）

| マクロでの指定 | 解決先 | light 実値 |
| --- | --- | --- |
| `backgroundColor: 'accent'` | accent-color-900 = blue-900 | `#3B63FB` |
| `backgroundColor: 'informative'` | informative-color-900 = blue-900 | `#3B63FB` |
| `backgroundColor: 'negative'` | negative-color-900 = red-900 | `#D73220` |
| `backgroundColor: 'positive'` | positive-color-900 = green-900 | `#05834E` |
| `backgroundColor: 'notice'` | notice-color-600 = orange-600（明るめが正） | `#FC7D00` |
| `backgroundColor: 'neutral'` | gray-800 | `#292929` |
| `backgroundColor: 'neutral-subdued'` | gray-700 | `#505050` |
| `backgroundColor: 'neutral-subtle'` | gray-100 | `#E9E9E9` |
| `backgroundColor: 'disabled'` | gray-100 | `#E9E9E9` |
| `color: 'accent'` | blue-900 | `#3B63FB` |
| `color: 'neutral'`（本文） | gray-800 | `#292929` |
| `color: 'neutral-subdued'`（副次） | gray-700 | `#505050` |
| `color: 'negative'` | red-900 | `#D73220` |
| `color: 'disabled'` | gray-400 | `#C6C6C6` |
| `borderColor: 'negative'` | red-900 | `#D73220` |
| `borderColor: 'disabled'` | gray-300 | `#DADADA` |
| visual 系（アイコン装飾 `fill: 'accent'` 等） | 各 hue の **800** | 例 blue-800 `#4B75FF` |
| フォーカスリング | blue-800 | `#4B75FF` |

### 2-4. 背景レイヤー

| トークン | light | dark | 用途 |
| --- | --- | --- | --- |
| `backgroundColor: 'base'` | gray-25 `#FFFFFF` | `#111111` | アプリ最背面 |
| `'layer-1'` | gray-50 `#F8F8F8` | `#1B1B1B` | 1 段上のサーフェス |
| `'layer-2'` | gray-25 `#FFFFFF` | gray-75 `#222222` | さらに上（light では白+影で区別） |
| `'elevated'` | gray-25 `#FFFFFF` | `#222222` | ポップオーバー / ダイアログ |
| `'pasteboard'` | gray-100 `#E9E9E9` | `#111111` | キャンバス外領域（エディタ） |

> Express の実画面ではコンテンツ面 = base（白）、タイルは白+`gray-100` ボーダー、
> サムネ下地のみ gray-50/75。「グレー地に白カード」ではなく「白地+ボーダー区切り」が Express 流（§9 参照）。

---

## 3. タイポグラフィ

### 3-1. フォントファミリー

- **Adobe Clean Spectrum VF**（可変フォント）。`@react-spectrum/s2` が Typekit から自動ロード。追加設定・代替フォント禁止。
- 日本語は locale で自動切替: `adobe-clean-han-japanese → Hiragino Kaku Gothic ProN → Osaka → YuGothic → Meiryo → MS PGothic`（spectrum-theme.ts の実チェーン）。
- コードは `source-code-pro` 系（`fontFamily: 'code'`）。

### 3-2. ウェイト（CJK は太さが 1 段下がる — 重要）

| トークン | 欧文 | 日本語 (CJK) |
| --- | --- | --- |
| normal | 400 | 400 |
| medium | 500 | 500 |
| bold | 700 | **500** |
| extra-bold | 800 | **700** |
| black | 900 | 900 |

ロール既定: **heading = extra-bold / title = bold / detail = medium / body・ui = normal**。
`fontWeight: 'heading'` のようにロール名でも指定でき、CJK 差は自動適用される。

### 3-3. サイズロール全表（desktop。`font: 'ui'` 等の shorthand がサイズ+ウェイト+行間+色を一括設定）

| ロール | 2xs | xs | sm | （無印） | lg | xl | 2xl | 3xl |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **ui**（コントロール内テキスト） | — | 11 | 12 | **14** | 16 | 18 | 20 | 22 |
| **heading**（ページ/セクション見出し） | 14 | 18 | 20 | **22** | 28 | 36 | 45 | 58 |
| **title**（コンポーネント内タイトル） | — | 12 | 14 | **16** | 18 | 20 | 22 | 25 |
| **body**（本文ブロック） | 11 | 12 | 14 | **16** | 18 | 20 | 22 | 25 |
| **detail**（メタ/オーバーライン） | — | — | 12 | **14** | 16 | 18 | — | — |
| **code** | — | 12 | 14 | **16** | 18 | 20 | — | — |

- UI コンポーネント内の文字は ui（既定 14px）。本文段落だけ body。**サイズではなく役割で選ぶ。**
- line-height は固定値でなく**フォントサイズ 10px→1.3 から 32px→1.15 へ線形補間、2px 丸め**
  （32px 超は常に 1.15）。マクロの `lineHeight` 既定が面倒を見るので手動指定しない。

---

## 4. スペーシング

- **4px グリッドの離散値のみ**: `0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96`
  （margin は同列の負値も可）。これ以外の数値は型エラー。
- 相対トークン: `'text-to-control'`（fontSize 比 10/14em）/ `'text-to-visual'`（6/14em）/
  `'edge-to-text'`（コンポーネント高さ × 3/8）/ `'pill'`（高さ ÷ 2）。
- エスケープハッチ: `space(px)` = rem 変換、`size(px)` = `--s2-scale` 連動（touch 端末で 1.25 倍）。
  固定 px が要る寸法（サムネ等）にだけ使う。
- Express 実用値の目安: カード内 24 / セクション間 32–40 / タイル・チップ内 gap 12 / グリッド gap 16。

---

## 5. 角丸

| キー | 実値 | Express での使いどころ |
| --- | --- | --- |
| `none` | 0 | — |
| `sm` | 4px | インラインバッジ |
| `default` | 8px | テンプレ/サムネカード |
| `lg` | 10px | クイックアクションタイル |
| `xl` | 16px | カード・ヒーロー帯・モーダル |
| `full` | 9999px | 円形ボタン（+作成）・アバター |
| `pill` | 高さ÷2 | 検索・チップ・ボタン全般（**Express の既定形状**） |

---

## 6. ボーダー・フォーカスリング

- `borderWidth`: 0 / 1 / 2 / 4。区切りは **1px の `gray-100`**（Express の基本文法）。
- フォーカスリング: **2px solid blue-800 `#4B75FF`、outline-offset 2px**。
  S2 コンポーネントは内蔵済み。自作要素は `outlineStyle` 系で同じ値を再現する。

---

## 7. エレベーション（影）

`boxShadow` マクロキーは 4 つだけ。**Express は影を多用しない**（タイルはボーダー、影はフローティング要素のみ）。

| キー | light | dark |
| --- | --- | --- |
| `emphasized` | 0 1px 6px rgba(0,0,0,.12) | 0 1px 6px rgba(0,0,0,.36) |
| `elevated`（ポップオーバー/メニュー/ドロワー） | 0 2px 8px rgba(0,0,0,.16) | …(0,0,0,.48) |
| `dragged`（ドラッグ中） | 0 6px 16px rgba(0,0,0,.20) | …(0,0,0,.60) |
| `none` | — | — |

---

## 8. コンポーネント寸法・モーション

- `component-height`: 50=20px / 75=24px / **100=32px（size="M" 既定）** / 200=40px / 300=48px / 400=56px / 500=64px。
  S2 の `size` prop S/M/L/XL ≒ 24/32/40/48。
- ピルの左右パディング = 高さ × 3/8（`'edge-to-text'`）。
- イージング: default = `cubic-bezier(0.45, 0, 0.4, 1)`、in = `(0.5,0,1,1)`、out = `(0,0,0.4,1)`。
  `transitionProperty` プリセット: `default` / `colors` / `opacity` / `shadow` / `transform`。

---

## 9. マクロヘルパー（`@react-spectrum/s2/style`）

| ヘルパー | 用途 |
| --- | --- |
| `lightDark(l, d)` | light/dark で別トークンを使う |
| `colorMix(a, b, %)` | トークン同士の混色 |
| `linearGradient(angle, [color, stop]...)` | トークン色のグラデ（ブランドグラデは hex が要るので CSS 変数側で） |
| `baseColor('blue-900')` | hover/down/focus の自動段階 |
| `fontRelative(px)` / `edgeToText(h)` / `space(px)` / `size(px)` | 相対値・エスケープ |

---

## 10. ブランド層（S2 に存在しない Adobe Express 固有値）

`src/styles/brand-tokens.ts` / `globals.css` で保持（実測値・Mobbin 実画面と整合確認済み）:

- chrome `#1d1d1d`（S2 最近似は gray-50 dark `#1B1B1B` — 別物として保持が正解）
- accent indigo `#5157E4`（S2 の indigo-900 `#7155FA` とは別物。Express 実測値を維持）
- premium violet `#9674FF`
- hero グラデ `linear-gradient(90deg, #FF9416, #FEC082 30%, #9FB6FA 62%, #D795AC)`

---

## 11. 相違点・要判断事項

1. **コンテンツ面の地色**: 現 `DESIGN-SYSTEM.md` は「キャンバス gray-75 `#F3F3F3` + 白カード」。
   Express 実画面は「**白 base + gray-100 ボーダーのタイル**」（§1-2, §2-4）。
   Figma（fileKey `mXIeaaZlPI1oRmjaIKgnHh` / フレーム `876:337`）が SoT — どちらに寄せるかは設計判断。
2. notice / warning は orange-**600**（`#FC7D00`）と明るめが正（900 ではない）。
3. 角丸トークンには size 連動バリアントが存在する（`corner-radius-*-default` 以外）。必要時に
   `@adobe/spectrum-tokens` を直接引く。
