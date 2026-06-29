"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">アカウント設定</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList variant="line" className="w-full justify-start border-b border-border pb-0 rounded-none h-auto gap-0">
          <TabsTrigger value="profile" className="px-4 pb-3 text-base rounded-none">
            プロフィール
          </TabsTrigger>
          <TabsTrigger value="security" className="px-4 pb-3 text-base rounded-none">
            セキュリティ
          </TabsTrigger>
        </TabsList>

        {/* プロフィール */}
        <TabsContent value="profile" className="mt-8">
          <ProfileSection />
        </TabsContent>

        {/* セキュリティ */}
        <TabsContent value="security" className="mt-8">
          <SecuritySection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
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
          <Button size="lg" className="h-11 px-8">
            更新する
          </Button>
        </div>
      </section>
    </div>
  );
}

function SecuritySection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-foreground">パスワード</h2>

        <div className="flex flex-col gap-2">
          <Label className="text-sm text-muted-foreground">現在のパスワード</Label>
          <PasswordInput show={showCurrent} onToggle={() => setShowCurrent((v) => !v)} />
        </div>

        <Separator />

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
          <Button size="lg" className="h-11 px-8">
            更新する
          </Button>
        </div>
      </section>
    </div>
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
