# Spectrum — Components（spectrum.adobe.com）

> 取得方法・S1/S2 前提は `README.md` 参照。各コンポーネント = 目的 / オプション・バリアント / do's & don'ts。値・サイズ名は原文ベース。
> サイズ既定は **medium**、フォーカスは **2px の青いリング**、ラベルは **sentence case** が全体の共通則。

## A–M

### Action bar
- **目的**: 単一・一括選択時に選択アイテムへアクションを実行するバー。
- **バリアント**: 非強調 / emphasized（青背景）。**構成**: close button（全解除して閉じる）+ item counter + action group。
- 選択時に下部からスライドインし sticky。**アクションは 5 つ以下**、大画面=ラベル+アイコン/小画面=アイコンのみ+オーバーフロー。ドラッグバー無し。quick actions（廃止）でなくこれを使う。

### Action button
- **目的**: タスクベースのアクション/選択。ボタンほど注目させない UI 向け。
- **サイズ** XS–XL。**オプション**: label+icon（icon-only はツールチップ必須）/ quiet（背景なし）/ selected（トグル）/ emphasized（選択時青背景）/ static color / hold icon（長押しで popover）/ disabled。
- 孤立した icon/text-only は standard。hold icon は LTR 右下固定・無関係アクションをまとめない。

### Action group
- **目的**: 関連 action button のグループ。
- horizontal(既定)/vertical、density regular/compact、justified、quiet、emphasized、selection single/multiple、overflow wrap(既定)/collapse(More へ)。

### Alert banner
- **目的**: 緊急・高シグナルな **system レベル**メッセージ。
- **色は 3 種のみ**: gray(neutral)/blue(informative)/red(negative)。テキスト必須、**アクションは最大 1 つ**、任意 close。
- **黄/橙をエラーに使わない**（コントラスト不足）。red は遮断的エラー専用。スタックしない。**タイムアウトさせない**。ページ最上部・ヘッダー下。

### Alert dialog
- **目的**: 重要情報を acknowledge させ操作をブロックするモーダル。
- **バリアント**: Confirmation(既定/accent)/Information/Warning(橙)/Destructive(red)/Error。
- title 必須・**ボタン最大 3 つ**（primary=右端、secondary outline、cancel）。狭いと縦積み（最重要が最下部）。多用しない・入れ子にしない。**質問形にしない**。

### Avatar
- **目的**: ユーザー/組織のサムネイル。サイズ size-50〜size-700。
- 画像未設定時はブランドの generic avatar（性別・文化から抽象化）。**性別を仮定した placeholder を使わない**。

### Badge
- **目的**: status light 同様、色分けした少量メタデータ。
- 色: gray/green/seafoam/blue/indigo/purple/fuchsia/magenta/red/yellow。サイズ small(既定)/M/L/XL。
- semantic（Positive 完了/Informative 公開/Negative 失敗/Neutral 下書き）/ non-semantic（8 カテゴリ以下）。**blue は accent ボタンと紛らわしく極力避ける**、yellow は「割引」専用、**複数同時表示しない**、icon-only は極力避ける。

### Breadcrumbs
- **目的**: 現在地の階層・ナビ文脈。
- バリアント default/multiline/compact/with root context。**5 件以上 or 幅不足で truncation menu**（root→現在地、インデントしない）。
- フィルタ用途に使わない・ラベルにアイコンを入れない・複数を同時 truncate しない・**root 含め 4 件目安**・native モバイルは header bar に頼る。

### Button
- **目的**: アクション/遷移。
- **強調度**: Accent（必須アクション・**1 ビュー 3 つまで**）/ Primary（中）/ Secondary（低・**単独使用禁止**）/ Negative（破壊的・控えめ）。fill / outline（outline=secondary 向け）/ static color。
- サイズ S/M(既定)/L/XL。最小幅=高さ×2.25。**カスタム色禁止**、pending は 5 秒以内（1 秒遅延後表示）、split button(廃止)でなく button group。
- ラベルは**動詞・1–2 語・最大 4 語・20 文字未満・句読点/絵文字なし**。

### Button group
- 関連ボタンのグループ。horizontal(既定)/vertical、狭いと縦積み（最重要を最下部）。最重要=accent/primary/negative、他=secondary outline。配置はコンテキスト依存（テキスト左/空状態中央/dialog 内右）。

### Cards
- **目的**: 関連アイテム群をブラウズする柔軟なコンテナ。
- スタイル standard（footer+ボタン可）/ quiet（メタデータ少・**ボタン不可**→action bar）。向き vertical/horizontal（常に正方形 preview・tile grid 限定）。サイズ S/M(既定)/L。
- **preview アスペクト比 4:1〜3:4・推奨 2:1**。レイアウト vertical masonry/horizontal masonry(quiet のみ)/tile grid(既定)。**card gutter = ページ gutter の 3/4**（32→24px）。**個別カードでなくグループをグリッドに揃える**。ghost loading 5 フェーズ。quick actions(廃止)→action bar。title 5–7語・metadata 10–15語。

### Checkbox
- **目的**: 複数選択 / 1 項目の選択マーク。状態 selected/not selected/**indeterminate**（混在値）。
- サイズ S/M(既定)/L/XL。emphasized(青、フォーム/設定)/not emphasized(gray、パネル)。disabled/error/read-only。
- **checkbox=複数選択/radio=排他単一**、**checkbox=選択/switch=有効化**（switch にエラー状態なし）。

### Checkbox group
- 関連 checkbox のグループ。label position top(既定)/side、vertical(既定)/horizontal、required/optional、error（negative help text+アイコン）、help text。

### Close button
- **目的**: 親コンポーネント（toast/action bar 等）を**閉じる/dismiss** する内部ボタン（× の UI アイコン、文字の x ではない）。
- **削除アクションに使わない**（破壊的操作は action button）。

### Coach mark
- **目的**: 新規/不慣れな体験を教える一時メッセージ。連結して tour。
- 構成: title/body/step indicator(任意・全 step で統一 or 無し)/image/action dependent/indicator(standard 大 or quiet 小、light/dark/blue)。
- 幅は tour 内で統一。**Skip tour は常に quiet secondary（最終 step では省略）**。primary: 単発="OK"・tour=最終以外"Next"・最終"Finish"。

### Color area / Color loupe / Color slider / Color wheel
- **Color area**: 色の 2 プロパティを 2D 選択。size 既定 size-2400（192/240px）、最小 size-800。down/touch で color loupe。
- **Color loupe**: 選択中に指/カーソルで隠れる出力色を拡大表示（合成色）。
- **Color slider**: 1 チャンネルを直線で。horizontal(既定)/vertical、太さ size-300。
- **Color wheel**: 1 チャンネルを円形で（既定 0–360）。
- 共通: ラベルを付ける・リアルタイムに選択色表示・focus で handle 2 倍。

### Combo box
- **目的**: テキスト入力 + picker メニューで長いリストを絞り込み。
- label(原則必須)/top(既定)・side/quiet/required・optional/menu trigger input(既定)・focus・manual/error/disabled/read-only/help text。最小幅 standard=高さ×2.5。
- 使い分け: **6 項目未満→radio、6 超かつ複雑→combo box、それ以外→picker**。placeholder を必須情報に使わない（help text を使う）。

### Contextual help
- **目的**: 隣接要素やビュー全体の状態の追加情報を popover で。
- タイプ info（instructive）/ help（helpful・画像/動画/リンク可）。trigger=XS quiet icon-only action button。placement 既定 bottom start、offset 既定 6/8px、container padding 8px。
- tooltip=hover の数語、help text=常時可視の必須情報、**contextual help に必須情報を隠さない**。disabled の理由説明に使える。

### Divider
- **目的**: 近接コンテンツのグループ化・分割。
- サイズ small(既定・行/ボタン群/パネル内)/medium(サブセクション)/large(ページ・セクションタイトルのみ)。horizontal(既定)/vertical。medium/large はヘッダーの下に。多用しない。

### Field label
- **目的**: 入力に文脈を与えるラベル。top(既定)/side、necessity indicator（asterisk or "(required)"/"(optional)"）。
- フォームでは少数派のみ required/optional 表記。**末尾にコロン（:）を付けない**。短く 1–3 語、sentence case。

### Help text
- **目的**: 入力の説明（neutral）or エラー（negative）。同スペースで切替（エラー→error text に置換、両者に同じ要点）。
- negative の icon は任意（text field 等は不要、checkbox/radio group は必要）。1–2 文・末尾ピリオド。エラーは解決策を示す。

### In-line alert
- **目的**: ビュー内オブジェクトに紐づく非モーダルメッセージ。フォーム検証の複数フィールド集約に多用。
- semantic: Neutral(既定 gray)/Informative(青)/Positive(緑)/Notice(橙)/Negative(red)。title area + body area。

### Link
- **目的**: 別の場所へ遷移。**本文コピー内**で使う（タイトル不可・目立たせたいなら button）。
- バリアント primary(既定 青)/secondary(gray)/static color/quiet(下線なし・重要リンクに使わない・フッター向け)。
- **"learn more"/"click here"/"more information" 等の汎用語を避け固有の説明文**。standalone=末尾句読点なしの短い動詞句。

### Menu
- **目的**: アクション/選択/設定。popover(desktop 既定)/tray(mobile 既定) に配置。
- 構成: menu item（label 必須・icon は装飾不可・description 控えめ・value area・drill-in chevron）/section/section header/divider(2 セクション以上)。
- 選択 no selection(既定・押下でアクション)/single(checkmark)/multiple(checkbox)。selection style checkbox or switch(mobile)。**menu 項目に ellipsis(…) を極力使わない**（別ビュー遷移を示唆）。

### Meter
- **目的**: 量/達成度の視覚表現。進捗は**ユーザー操作**で決まる（progress bar=システム）。
- semantic Informative(青・既定)/Positive(緑)/Notice(橙)/Negative(red)。サイズ large(既定)/small。値 0–1、幅 size-2400。label 左・value 右。

> **A–M の空プレースホルダ（旧サイト未記載・S2 系新名称）**: accordion, action-menu, avatar-group, calendar, color-field, color-handle, color-swatch, date-field, date-picker, date-range-picker, dialog, disclosure, drop-zone, form, illustrated-message, list-box, list-view, logic-button。

## N–Z

### Picker（select / dropdown）
- **目的**: 限られたスペースで一覧から選択。サイズ S/M(既定)/L/XL。
- label position top(既定)/side、placeholder、quiet、required/optional、error、disabled、read-only、help text。最小幅=field button 高さ×2。
- 必ず label を付ける。error text は解決策を示し 1–2 文・ピリオド・感嘆符なし。

### Popover
- **目的**: メニュー/オプション/追加アクション等の transient コンテンツを浮かせて表示（stroke + drop shadow）。
- width/height カスタム、show tip(既定 no・ソースに明確な down state がない時)、placement(既定 top・22 値)、offset(既定 8px)、cross offset(既定 0)、container padding(既定 8px)。
- 外側クリック/ソース再クリック/内部アクションで dismiss。小画面で多すぎる時は tray。背景 = background-layer-2-color。

### Progress bar
- **目的**: システム操作の進捗（determinate/indeterminate）。default(青)/over background(static white)。
- サイズ S/M(既定)/L/XL。値 min 0–max 100。幅 既定 size-2400・最小 48/最大 768px。label は左・% は右・sentence case・末尾 "..."。狭い縦スペース（テーブル/カード）に。旧 "Bar loader"→progress bar。

### Progress circle
- **目的**: システム操作の進捗（円形）。default/over background。**サイズ S/M(既定)/L の 3 種**（bar と異なる）。
- 大エリアの読み込みに medium/large、ボタン/メニュー/入力内など狭所に small。RTL でも fill は時計回り。旧 "Circle loader"→progress circle。

### Quick actions（**廃止 / deprecated**）
- 廃止。代わりに **action bar** を使う。

### Radio button / Radio group
- **目的**: 相互排他の単一選択。サイズ S/M(既定)/L/XL。top(既定)/side、vertical(既定)/horizontal、emphasized(青)/not emphasized(gray)、required/optional、error、disabled、read-only、help text。
- **排他選択に radio、複数選択は checkbox**。必ず label を付ける。radio-button は radio-group に統合。

### Rating
- **目的**: 0–5 のスケールで評価。not emphasized(既定)/emphasized(青)/disabled。
- 最も高い星を再クリックでクリア。複数不一致なら空表示。**星の数をカスタマイズしない（常に 5 つ）**。

### Search field
- **目的**: 検索/フィルタ。サイズ S/M(既定)/L/XL、default/quiet。
- **error 状態を持たない**（代わりに "No results"。どの検索語もエラー扱いしない）。最小幅=高さ×3、in-field clear button。
- 既定 label は **Search**（カスタム可）。filtering は filter アイコン + tags、スコープ検索は picker と組む。

### Side navigation
→ `patterns.md` 参照（3 オプション・**最大 3 階層**・first-level のみアイコン・既定幅 size-3000）。

### Slider
- **目的**: 上下限不変の範囲で値を選択。top(既定)/side、value/min 0/max 100/step 1、value format(通貨/%/接辞)、progression linear(既定)/logarithmic、fill、editable value、disabled。
- ダブルクリックで既定値リセット、hot text。必ず label・単位表示・負正は +/-。

### Status light
- **目的**: エンティティの状態。**semantic**（ドット=color 400）: informative(青 active/live)/neutral(gray archived/draft)/positive(緑 complete)/notice(橙 pending)/negative(red error)。**non-semantic**（カテゴリ・8 以下）。
- サイズ S/M(既定)/L/XL。**必ず label を付ける**（色だけでは不十分）。label 色をドット色に合わせない（gray のまま）。

### Swatch / Swatch group
- **Swatch**: 色/グラデ/テクスチャの小サンプル。サイズ XS/S/M(既定)/L、square(既定)/rectangle(2:1)、rounding none/default/full。selected/disabled(× アイコン)/mixed values。利用不可は disabled より非表示推奨。
- **Swatch group**: density regular(既定)/compact/spacious、selection single/multiple。**グリッドは "none" rounding**（Hermann grid 錯視回避）、低コントラストは gray-900 20% ボーダー。

### Switch
- **目的**: オプションのオン/オフ・有効/無効化。selected/not selected のみ（**indeterminate 不可**）。
- サイズ S/M(既定)/L/XL、emphasized(青)/not emphasized、disabled、read-only。**switch=activation / checkbox=selection**。switch に error 状態なし。

### Table
- **目的**: 大量データのスキャン/ソート/比較/アクション。standard(白背景・主役)/quiet(背景なし・補助)、column dividers(任意・控えめ)、selectable rows(左チェックボックス)。
- **テキスト=左寄せ**（中央禁止）/ **数値=右寄せ**（tabular + lining、比較用。郵便番号/IP/電話など nominal は左寄せ）。垂直中央。**zebra stripes を使わない**（row divider で十分）。**欠損値は en dash（–）**（"null" と書かない）。

### Tabs
→ `patterns.md`/`SPECTRUM-GUIDELINES.md` 参照（同等重要度のセクションのみ・ネスト回避・horizontal 既定・quiet/emphasized・選択は常に 1 つ）。

### Tag / Tag group
- **目的**: コンテンツのカテゴリ分け（キーワード/人物）。label 必須、avatar、removable("x")/not removable、error、disabled、read-only。
- 長いと truncate（hover で tooltip）。グループは幅不足で折り返し。**2 個以上表示時のみ** "Clear all" 等の bulk action。

### Text area
- **目的**: 長文入力（text field の検証を全サポート）。サイズ S/M(既定)/L/XL。
- top(既定)/side、quiet(稀)、required/optional、character count、validation icon、error、disabled、read-only、help text。drag icon でリサイズ可（height 未定義なら動的伸長）。

### Text field
- **目的**: カスタムテキスト入力。サイズ S/M(既定)/L/XL。
- top(既定)/side、quiet、required/optional、character count、validation icon、error（**error icon が validation icon を上書き**）、disabled、read-only、help text。

### Toast
- **目的**: 短い一時通知（アクション不要）。neutral(既定 gray)/informative(青)/positive(緑)/negative(red)。
- **アクションは最大 1 つ（static white secondary outline）**。auto-dismiss は**最低 5 秒**。配置 既定 bottom center（viewport から 16px）。
- **優先度キュー（8 段階）**: 1=Actionable/error(auto-dismiss なし)・2=Error・3=Actionable/positive・4=Actionable/informative・5=Actionable/neutral・6=Positive・7=Informative・8=Neutral。
- **複数同時表示しない**（キュー）。アクションは 1 つだけ（"Dismiss" は close と重複で禁止）。2 行未満・sentence case・ピリオドなし。

### Tool（**廃止**）
- 廃止し action button に統合。ツールバーは bar/panel 内に quiet icon-only action button を並べる。

### Tooltip
- **目的**: hover/focus で文脈ヘルプ。neutral(既定 gray)/semantic(informative/positive/negative・アイコン必須)。
- 最大幅 既定 size-2000（160/200px）、placement 既定 top、flip 既定 yes、offset 既定 4/5px。
- **重要情報の伝達に使わない**（常時表示すべき）。**アクション/リンクを入れない**（hover/focus 時のみ表示のため）。1–2 短文。

### Tray（mobile 専用）
- **目的**: popover に収まらない量の transient コンテンツ。高さ auto or 固定、最大 = 上端から 64px safe zone。
- portrait は下端・全幅、landscape は portrait 幅維持・中央。下からスライドイン + オーバーレイ。外側/下スワイプ/内部アクションで dismiss。

### Tree view
- **目的**: ネスト階層のナビ。text-only(既定)/icon/thumbnail。detached/emphasized(青選択)、サイズ S/M(既定)/L/XL、drag icon。
- 選択 single/multi、style checkbox or highlight。D&D で並べ替え/再構成（異階層選択→兄弟にフラット化、外部ドロップ受付）。

### Tab bar (iOS) / Bottom navigation (Android)（参考・モバイル）
- top-level ナビ専用。**ラベル+アイコン常時**（icon-only は a11y レビュー済みの稀ケースのみ）。**項目数 3–5**。background は app bar と揃える（primary/secondary gray）。

> **N–Z で取得不可（CloudFront エラー・sitemap 未掲載・実体なし）**: number-field, well。

## 出典
spectrum.adobe.com `/page/{各 slug}/`（全件は `README.md` の目録参照）。
