import type { ReactNode } from "react";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function AppShellUI({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-sidebar">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* content: sm以上で左上角丸・影でコンテンツパネル感を演出 */}
        <main className="flex flex-1 flex-col overflow-auto bg-background sm:rounded-tl-xl sm:shadow-lg">
          {children}
        </main>
      </div>
    </div>
  );
}
