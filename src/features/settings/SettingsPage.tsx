"use client";

import { Bell, CreditCard, Link2, Lock, Receipt, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

import { PasswordSection } from "./PasswordSection/PasswordSection";
import { ProfileSection } from "./ProfileSection/ProfileSection";

const TABS = [
  { value: "profile",       label: "プロフィール",  icon: User,       enabled: true  },
  { value: "integrations",  label: "連携",           icon: Link2,      enabled: false },
  { value: "billing",       label: "請求",           icon: Receipt,    enabled: false },
  { value: "payments",      label: "支払い",          icon: CreditCard, enabled: false },
  { value: "notifications", label: "メール通知",      icon: Bell,       enabled: false },
  { value: "security",      label: "セキュリティ",    icon: Lock,       enabled: false },
] as const;

export function SettingsPage() {
  return (
    <Tabs defaultValue="profile" className="flex flex-1 flex-col">
      {/* 上部固定ヘッダー */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="px-4 pt-5 pb-0 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight">設定</h1>
        </div>
        <div className="mt-6 overflow-x-auto px-4 pt-1 pb-3 sm:px-6">
          <TabsList className="h-auto gap-2 rounded-none bg-transparent p-0">
            {TABS.map(({ value, label, icon: Icon, enabled }) => (
              <TabsTrigger
                key={value}
                value={value}
                disabled={!enabled}
                className="h-9 rounded-full border border-border-strong px-4 text-sm font-medium transition-all shadow-none flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:border-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:hover:border-foreground data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </header>

      {/* コンテンツ */}
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <TabsContent value="profile" className="mt-0">
          <div className="flex flex-col gap-5">
            <ProfileSection />
            <PasswordSection />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
