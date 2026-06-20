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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <NavigationProgressProvider>
              {children}
              <Toaster position="bottom-right" />
            </NavigationProgressProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
