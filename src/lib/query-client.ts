import { isServer, QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // モック API 前提の控えめな既定。実 API 接続時に見直す。
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

// サーバーは毎リクエスト新規インスタンス、ブラウザはシングルトン。
// QueryProvider の useState と共存できるよう export しておく。
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
