# Spectrum — Content & UX Writing（spectrum.adobe.com）

> 取得方法は `README.md` 参照。ソース言語は U.S. English、**AP style** 準拠。原文の網羅的な単語リストは代表例に絞って収録。

## Voice and tone

- **Voice（design 原則を言語に適用）**: **Rational**（clear・research based、流行語/過度に意見的を避ける）/ **Human**（friendly・honest・配慮、ユーザー感情を認める）/ **Focused**（concise・simple、新概念を作らない）。
- **Tone**（voice の表現の仕方。相手・状況・感情で変わる）: Motivational（応援・稀）/ Helpful（丁寧・時々）/ Instructive（中立・直接的・頻繁）/ Reassuring（プロフェッショナル・時々）/ Supportive（共感・稀）。

## Grammar and mechanics

- **Active voice** 基本（passive は控えめ）。**Contractions** は会話的に使う（法的/決済/セキュリティでは避ける）。**Simple tense**（past/present/future）。
- **Capitalization**: **Sentence case を全製品体験で使用**（title/tooltip/tab/menu item 含む）。Title case は公式名のみ。**All caps は acronym・拡張子のみ**（強調目的の all caps 禁止）。
- **Pronouns**: 基本 **second person（you）**。first person（I/my）は同意/応答/配慮時。**Singular they**（gender 仮定しない）。
- **Punctuation**:
  - **& は使わず "and"**。**! は使わない**。**; は使わない**。
  - **Em dash (—)** は関連別思考（前後スペースあり）、**en dash (–)** は数値範囲/期間（スペースなし）・**テーブルの欠損値**、**hyphen (-)** は語間。
  - **Ellipsis (…)**: truncation/進行中/picker prompt。button では原則避ける（別ビュー遷移なら可）。More は more アイコン。
  - **Period**: 完全文に付ける。短い直接フレーズ（toast/alert banner）・list・header・button には付けない。
  - **Asterisk**: 必須フィールド（アイコン形）。optional には使わない。
  - **Slash**: "and"/"or" を使う。"and/or" 禁止。
  - **Quotation**: smart(curly) のみ。UI 要素直接参照には bold（引用符でなく）。
- **Abbreviations**: 体験内で一貫。K/M/B（大文字・period なし・数値と単位の間にスペース "71 M"）。Months: Jan…Dec（period なし）。Time: sec/min/hr。
- **Numbers**: zero–nine は語、**10 以上は数字**（時刻/series/range は 0–9 も数字）。3桁ごとに comma。**% を使う**（"percent" と綴らない）。Currency $1.00 / $1。
- **Dates/time**: Full=Monday, August 21, 2017 at 3:07pm / Compact=Mon, Aug 21, 2017。整数に :00 を付けない。範囲は en dash。relative time は閾値で hour/day/month に切替（1 day（×24 hours）等）。

## Inclusive UX writing

- 1種類の「典型」を中心に作ると多くを排除する。Business（つながる人が減る）と Brand value（採用減・偏見助長）に悪影響。
- 代表例: **People**（×Customers、支払い依存文脈以外）/ **You**（×Users）/ **View・Show・Go to**（×See）/ 記号/略語を避け意味的に。
- **Inclusive UX writing は accessible だが、逆は必ずしも真でない**。

## Writing about people

- 中立・正確・関連ある描写（個人的特質は関連時のみ）。歴史的意味を理解。ML/AI のバイアスを考慮（self-identification・opt out を許容）。
- **Disability**: person-first/identity-first は本人に尋ねる。"suffering from"/"victim"/名詞化（the disabled）を避ける。例 "uses a wheelchair"（×confined to）。
- **Race/class**: AP Stylebook（国籍・民族・人種を大文字、**white は除く**）。**Allowlist/Blocklist**（×Whitelist/Blacklist）、**Primary/secondary**（×Master/slave）。idiom 回避。多様な名前例。
- **Gender/sexuality**: 不明なら **singular they**。gendered roles を避ける（Server×Waitress、Businessperson×Businessman）。descriptor は修飾語で（"transgender woman" ○）。sex と gender を区別。AI で gender を推測しない。

## Writing for errors

- **可能ならメッセージを出さない**（in-line validation・visual cue・自動解決を優先）。**メッセージを先に決めてからコンポーネントを選ぶ**。
- **Anatomy（3要素）**: ①What happened（最初に・plain language）②The underlying cause（任意）③How to fix it（simple & actionable）。
- システムでなくユーザーに共感 / ユーザーを責めない / positive framing / error code は有用時のみ末尾 / **必要な時以外 apologize しない**（"sorry"=データ損失等の重大時）/ passive は控えめ / "we"=インターフェース・"you"=ユーザー。
- **コンポーネント選択（Consequence/Complication/Action）**: Alert dialog=High/High/High（task-level・割込み）/ Alert banner=Low/Low/High（system-level）/ Help text=Low/Low/High（in-line）/ In-line alert=Any/High/High（フォーム複数フィールド集約）/ Toast=Low/Low/Low（短い一時通知）。**1 コンポーネント = 1 エラーメッセージ**。

## Writing for onboarding

- onboarding = 新規ユーザー体験に限らず、新製品/機能/概念の紹介・継続教育全般。
- **1 チュートリアル = 1 ツール/技術**。**ツアー/チュートリアルは 10 ステップ未満**を目標。最初のステップで成果・ステップ数・所要時間を明示。
- **lightweight な言語**（learning/course/training → tutorial/try it out/explore/walk through）。**jargon は 1 文に 1 つ・Explain then name**。
- **UI を直接参照しない**（"Learn tab/panel/section" でなく "Learn"／回避: tab/panel/menu/page/section）。
- **手法**: Banner / Card / Coach mark / Empty state / Modal / Tooltip / Tour（どこに）/ Tutorial（どうやって）/ Video demo。

## Writing for readability

- **6th-grade reading level**（Buy×Purchase、Help×Assist、About×Approximately、Like×Such as）。
- jargon/社内語/idiom/symbol・emoji を避ける（文化依存・localize しにくい）。
- **Layout**: left-align・justify 回避・line length 最大 50–75 文字・1ページ1カラム。
- **Grammar**: sentence case、all caps は acronym のみ、hashtag は camelCase。
- **Localization**: branded/technical term は使用前に説明、稀な略語は初出でフル+括弧、homonym 回避。

## Writing with visuals

- ビジュアルを唯一の伝達手段にしない（「ビジュアルが存在しない」前提で書く）。
- **directional language を避ける**（位置でなく時系列）: First/Next/Finally・"In the menu bar"（×Above/Below/On the left/At the bottom）。
- **アクションとその効果について書く**（見た目でなく機能）: Enter email（×Type）、Save（×The "Save" button）、Edit（×The pencil icon）、Select/Go to（×Click/Tap）。
- **color/icon だけに頼らない**: "Secure site"（×🔒）、"The **Go** button"（×The green button）。
- **alt text**: 写真は電話で説明する要領、UI 機能画像は動詞で（"Send message"）。

## 出典

`/page/{voice-and-tone, grammar-and-mechanics, inclusive-ux-writing, writing-about-people, writing-for-errors, writing-for-onboarding, writing-for-readability, writing-with-visuals}/`
（`in-product-word-list` は用語集本体が動的ロードのため導入文のみ取得可）
