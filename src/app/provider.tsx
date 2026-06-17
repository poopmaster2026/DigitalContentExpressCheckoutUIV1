"use client";

import { Provider } from "@react-spectrum/s2/Provider";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

// Wire React Spectrum's client-side navigation (used by links, etc.)
// into the Next.js App Router.
declare module "@react-spectrum/s2/Provider" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function ClientProvider({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <Provider
      elementType="html"
      locale={lang}
      router={{ navigate: router.push }}
    >
      {children}
    </Provider>
  );
}
