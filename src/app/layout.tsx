import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { ClientProvider } from "./provider";
import { QueryProvider } from "@/shared/providers/query-provider";
// Global base styles only. Design comes from React Spectrum S2 (style() macro
// + Spectrum tokens) — see docs/DESIGN.md. No custom token layer here.
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Content Express Checkout",
  description: "React Spectrum (S2) UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Resolve the locale on the server so the S2 <Provider> renders the same
  // <html lang> on the server and client and loads the right Spectrum fonts.
  const acceptLanguage = (await headers()).get("accept-language");
  const lang = acceptLanguage?.split(/[,;]/)[0] || "en-US";

  // The S2 <Provider> (elementType="html") renders the <html> element itself,
  // applies the Spectrum background layer, and loads fonts for the locale.
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
