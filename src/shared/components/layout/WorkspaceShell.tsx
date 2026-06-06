import { GlobalHeader } from './GlobalHeader'
import { Rail } from './Rail'

type Props = {
  children: React.ReactNode
}

/**
 * ワークスペースの共通シェル（GlobalHeader + Rail + スクロール可能なコンテンツ領域）。
 *
 * Editor は左セクションパネル / プレビューの 2 ペインを持つ専用レイアウトのため独自に組むが、
 * メール等の単一コンテンツ画面はこのシェルに乗せて重複実装を避ける。
 */
export function WorkspaceShell({ children }: Props) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <GlobalHeader />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Rail />
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
