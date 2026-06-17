import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import { QueryProvider } from "@/shared/providers/query-provider";

import { ClientProvider } from "./provider";
// グローバルなベースリセットのみ。デザインは React Spectrum S2（style() macro
// + Spectrum トークン）由来 — docs/DESIGN.md 参照。独自トークン層はここに持たない。
import "./globals.css";

export const metadata: Metadata = {
  title: "SetLink",
  description: "React Spectrum (S2) UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // ロケールはサーバー側で解決する。こうすることで S2 の <Provider> が
  // サーバー / クライアントで同じ <html lang> を描画し、ロケールに合う Spectrum フォントを読み込む。
  const acceptLanguage = (await headers()).get("accept-language");
  const lang = acceptLanguage?.split(/[,;]/)[0] || "en-US";

  // S2 の <Provider>（elementType="html"）が <html> 要素そのものを描画し、
  // Spectrum の背景レイヤーを適用し、ロケールに合うフォントを読み込む。
  return (
    <ClientProvider lang={lang}>
      {/* suppressHydrationWarning: ブラウザ拡張が hydration 前に body へ属性を注入する
          ミスマッチ（例: ColorZilla の cz-shortcut-listen）への公式対処。1 階層のみ有効。
          https://nextjs.org/docs/messages/react-hydration-error */}
      <body suppressHydrationWarning>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </ClientProvider>
  );
}
