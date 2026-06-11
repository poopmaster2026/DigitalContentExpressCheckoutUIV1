import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { ClientProvider } from "./provider";
import { QueryProvider } from "@/shared/providers/query-provider";
// Design tokens + brand layer (docs/DESIGN-TOKENS.md / Figma SoT 準拠)。
// React Aria Components はこの CSS 変数でスタイルする。S2 は style() マクロのまま。
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
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </ClientProvider>
  );
}
