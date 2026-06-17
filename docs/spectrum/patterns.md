# Spectrum — Patterns / Application structure（spectrum.adobe.com）

> 取得方法・S1/S2 前提は `README.md` 参照。`responsive-grid` の詳細は `SPECTRUM-GUIDELINES.md`、
> `object-styles`/`states` は `foundations.md`、`writing-for-errors`/`onboarding` は `content-writing.md`。

## Application frame（アプリフレーム）

全 Adobe アプリが共有する基本構造。フレームは static で安定が原則。一時的状態は popover/tray で表す。

- **Header bar**: 最上位ナビ/アクション・全プラットフォーム共通で常時最上部。**modes は左、global actions（share/sync/undo）は右**、小さな縦 divider で区切る。
- **Sidebar**: 左/右/両側（desktop/tablet 用、スマホは別レイアウト）。**tools は左サイドバー上部**（modes の隣、default tool を最上部）。actions は任意位置。
- **Panel**: コンテンツ整理。**幅は 304px か 240px の 2 種**。単一パネル or 縦積みグループ（間に divider）。スマホは画面下部・全幅。
- **Bottom bar**: モバイルフォン専用（sidebar の代替）。
- **Dividers**: desktop 2px / mobile 1px、不透明で bar/panel より濃い色。
- **Popover/tray**: メニュー・設定・追加アクションなど transient な状態を表現（popover は浮く、tray は mobile 専用）。

### レスポンシブ（responsive grid との関係・verbatim）

- main content は responsive grid 上に載る。**rail/panel があるとき grid = 100% −（rail/panel 幅）**。collapsed 左 rail = **48px**。
- **ビューポート < 1280px では展開 rail/panel はオーバーレイ、≥ 1280px ではオフセット**。

## Headers（ヘッダーバー）

- **常に sticky**（スクロールで隠れない）。配置を変えない。
- **グローバル/永続アクション = 右、一時/コンテキスト = 左**（divider 区切り、狭画面は "more actions" に collapse）。
- **ブランディング or home アイコンはどちらか一方**。**検索は製品全体を検索**（タブ/ドキュメント名が無ければ畳まず展開維持）。
- ヘッダーは本体と同じか**より暗い**テーマ（明ヘッダー+暗本体は禁止、暗ヘッダー+明本体なら divider 不要）。
- 12 カラム fluid grid 使用時は header コンテンツも outer gutter（例 32px）に揃える。fixed grid 使用時はコンテンツ max-width 1280px。

## Side navigation

- **3 オプション**: ① Single level（フラット）② Single level with headers（**header は非インタラクティブ**・無所属項目は上部）③ Multi-level（ヘッダークリックで sub-level 開閉、場合により top-level location へ遷移）。1 メニュー内で挙動/スタイルを混在させない。
- **最大 3 階層まで**（4 階層以上はインデントが判別不能でユーザビリティ問題）。
- 挙動の一貫性: location あり→遷移+sub 展開／location なし→sub 展開のみ。同一体験で混在させない。
- **アイコンは first-level 項目のみ**（multi-level の sub-level は常にテキストのみ）。装飾アイコン禁止。
- **既定幅 size-3000**。詰め込みすぎない。ラベルは descriptive かつ concise・sentence case・原則折り返し（truncate しない）。RTL ミラーリング。

## Cards（パターンとしての配置）

- スタイル Standard（footer+ボタン）/ Quiet（**ボタン不可**→action bar）。向き vertical/horizontal（horizontal は常に正方形 preview・tile grid のみ）。サイズ S/M(既定)/L。
- **preview アスペクト比 4:1〜3:4・推奨 2:1**。レイアウト vertical masonry / horizontal masonry（quiet のみ）/ tile grid（既定）。
- **card gutter = ページ gutter の 3/4**（32px → 24px）。**個別カードでなく card グループ（card grid）をレイアウトリージョンとしてカラムに揃える**。
- ghost loading は 5 フェーズ。タイトル 5–7 語、metadata 10–15 語、ボタン 1–3 語（動詞句）。**title に "new" を使わない**（badge を使う）。quick actions（廃止）→ action bar。

## Coach mark（オンボーディングの一時メッセージ）

- アナトミー: Indicator / Image / Steps / Title / Body / Buttons（Skip tour, Next）。
- tour 内では primary action が次の coach mark を表示。**Skip tour は常に quiet secondary・最終 step では省略**。primary: 単発 "OK" / tour は最終以外 "Next"・最終 "Finish"。
- width は tour 内で統一。配置は popover と同様にコンポーネントへ揃える（関連 UI を隠さない・画面内に保つ）。indicator: standard(大)/quiet(小)、light/dark/blue。

## Contextual help

- **2 タイプ**: info アイコン（in-line 情報・instructive）/ help アイコン（詳しいヘルプ・helpful・画像/動画/link 可）。trigger = XS quiet icon-only action button。
- popover placement 既定 **bottom start**、offset 既定 desktop 6px/mobile 8px、cross offset 0、container padding 8px。
- tooltip=hover の数語 / help text=常時可視の必須情報 / **必須情報を contextual help に隠さない**。disabled の理由説明に使える。

## Form errors（バリデーションパターン）

- **エラー 2 種**: Single input（help text で各 input に表示）/ Group input（複数を **in-line alert** に集約しページ/セクション上部、single と併用可）。
- **バリデーション 2 方式**: 送信時 / リアルタイム（ただし**入力完了まではエラーを出さない**）。
- "(required)"/"(optional)" を一貫使用（少ない方だけマーク）。in-line alert は**高レベル要約**にする（各フィールドを列挙しない＝セキュリティリスク）。

## Bottom navigation (Android) / Tab bar (iOS)

- top-level ナビ専用（sub-content の区分けに使わない）。**ラベル+アイコン常時**（icon-only は a11y レビュー済みの稀ケースのみ）。**項目数 3–5 推奨**。
- background は app bar と揃える（primary=明/secondary=暗の gray スケール）。notification badge 可。disabled は最小限。
- iOS の label position は OS が自動処理（portrait=bottom / landscape=side / 多数=compact）。

## Quick actions / Tool（**廃止**）

- どちらも deprecated。quick actions → **action bar**、tool → **action button**（ツールバーは quiet icon-only action button を並べる）。

## 出典

`/page/{application-frame, headers, side-navigation, cards, coach-mark, contextual-help, form-errors, bottom-navigation-android, tab-bar-ios, quick-actions, tool}/`
