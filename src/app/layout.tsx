import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Toaster } from "@/shared/components/ui/sonner";
import { NavigationProgressProvider } from "@/shared/providers/navigation-progress-provider";
import { QueryProvider } from "@/shared/providers/query-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "SetLink",
  description: "Digital Content Store",
  icons: { icon: "/setlink-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <QueryProvider>
            <NavigationProgressProvider>
              {children}
              <Toaster position="bottom-center" />
            </NavigationProgressProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
