"use client";

import { Bell, CreditCard, Eye, EyeOff, Link2, Lock, Receipt, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const TABS = [
  { value: "profile",       label: "プロフィール",   icon: User,       enabled: true  },
  { value: "integrations",  label: "連携",            icon: Link2,      enabled: false },
  { value: "billing",       label: "請求",            icon: Receipt,    enabled: false },
  { value: "payments",      label: "支払い",           icon: CreditCard, enabled: false },
  { value: "notifications", label: "メール通知",       icon: Bell,       enabled: false },
  { value: "security",      label: "セキュリティ",     icon: Lock,       enabled: false },
] as const;

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-2xl font-semibold text-foreground">アカウント設定</h1>

      <Tabs defaultValue="profile">
        <TabsList className="h-auto w-full justify-start gap-1 bg-transparent p-0 flex-wrap">
          {TABS.map(({ value, label, icon: Icon, enabled }) => (
            <TabsTrigger
              key={value}
              value={value}
              disabled={!enabled}
              className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:bg-surface disabled:pointer-events-none disabled:opacity-40 data-[state=active]:border-cta data-[state=active]:bg-cta/8 data-[state=active]:text-cta after:hidden"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="mt-8">
          <div className="flex flex-col gap-10 max-w-2xl">
            <ProfileSection />
            <Separator />
            <PasswordSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-foreground">プロフィール</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-muted-foreground">氏名</Label>
          <Input
            defaultValue="花子"
            className="h-11 border border-border bg-card px-4 text-base focus-visible:ring-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-muted-foreground">ユーザー名</Label>
          <Input
            defaultValue="kumaaa1212"
            className="h-11 border border-border bg-card px-4 text-base focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm text-muted-foreground">メールアドレス</Label>
        <Input
          type="email"
          defaultValue="hanako@ours.jp"
          className="h-11 border border-border bg-card px-4 text-base focus-visible:ring-1"
        />
      </div>

      <div>
        <Button size="lg" className="h-11 px-8">更新する</Button>
      </div>
    </section>
  );
}

function PasswordSection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-foreground">パスワード</h2>

      <div className="flex flex-col gap-2">
        <Label className="text-sm text-muted-foreground">現在のパスワード</Label>
        <PasswordInput show={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-muted-foreground">新しいパスワード</Label>
          <PasswordInput show={showNew} onToggle={() => setShowNew((v) => !v)} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-muted-foreground">パスワードの確認</Label>
          <PasswordInput show={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
        </div>
      </div>

      <div>
        <Button size="lg" className="h-11 px-8">更新する</Button>
      </div>
    </section>
  );
}

function PasswordInput({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder="••••••••"
        className="h-11 border border-border bg-card px-4 pr-12 text-base focus-visible:ring-1"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={show ? "パスワードを非表示" : "パスワードを表示"}
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
