'use client'

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR ではクライアント側で即 refetch されないよう staleTime を設ける
        staleTime: 60_000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    // サーバーでは毎リクエスト新しい QueryClient を生成
    return makeQueryClient()
  }
  // ブラウザではシングルトンを使い回す
  return (browserQueryClient ??= makeQueryClient())
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
