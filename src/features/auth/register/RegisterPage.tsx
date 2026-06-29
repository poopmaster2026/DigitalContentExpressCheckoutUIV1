"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Eye, EyeOff, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";

import type { RegisterFormValues } from "../types/validation";
import { registerSchema } from "../types/validation";

export function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreedToTerms: false },
  });

  // 派生値: useState なし
  const username = useWatch({ control, name: "username" }) ?? "";
  const password = useWatch({ control, name: "password" }) ?? "";

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^a-zA-Z0-9]/.test(password),
  };

  const handleNext = async () => {
    const valid = await trigger(["email", "password"]);
    if (valid) setStep(2);
  };

  const onSubmit = async (_values: RegisterFormValues) => {
    // TODO: バックエンド API でアカウントを作成する
    // - POST /api/auth/register にフォーム値を送信
    // - 成功後: ダッシュボードへリダイレクト
    await new Promise((r) => setTimeout(r, 800));
    router.push("/store/products");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-auth-bg px-4 py-12">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/setlink-logo.png"
          alt="SetLink"
          width={80}
          height={91}
          className="rounded-xl"
        />
      </div>

      {/* White card */}
      <div className="w-full max-w-md rounded-2xl bg-card p-10 shadow-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-card-foreground">新規登録</h1>
          <p className="mt-1 text-sm text-muted-foreground">SetLink に参加する</p>
          {/* セグメント型プログレスバー */}
          <div className="mt-4 flex gap-1.5">
            <div className="h-1 flex-1 rounded-full bg-cta" />
            <div
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                step === 2 ? "bg-cta" : "bg-border"
              )}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {step === 1 && (
            <div className="flex flex-col gap-4">
              {/* メールアドレス */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm text-muted-foreground">
                  メールアドレス
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className={cn(errors.email && "border-destructive")}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* パスワード */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm text-muted-foreground">
                  パスワード
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className={cn("pr-10", errors.password && "border-destructive")}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {/* パスワード要件チェックリスト */}
                {password.length > 0 && (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    <PasswordCheck ok={passwordChecks.length} label="8文字以上" />
                    <PasswordCheck ok={passwordChecks.uppercase} label="大文字を含む" />
                    <PasswordCheck ok={passwordChecks.number} label="数字を含む" />
                    <PasswordCheck ok={passwordChecks.symbol} label="記号を含む" />
                  </ul>
                )}
              </div>

              {/* 次へ */}
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={handleNext}
              >
                次へ
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">または</span>
                <Separator className="flex-1" />
              </div>

              {/* Google OAuth */}
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full gap-2"
                onClick={() => {
                  // TODO: Google OAuth による新規登録
                  // 1. Google の OAuth 認可エンドポイントにリダイレクト
                  // 2. コールバックで受け取った Google プロフィール（name, email）を
                  //    バックエンドに送信してアカウントを作成
                  // 3. 新規ユーザー → Step 2（ユーザー名・ストア名入力）へ
                  // 4. 既存ユーザー → ダッシュボード（/store/products）へリダイレクト
                }}
              >
                <GoogleIcon />
                Googleで登録
              </Button>

              {/* ログインへ */}
              <p className="text-center text-sm text-muted-foreground">
                すでにアカウントをお持ちですか？{" "}
                <Link href="/login" className="text-cta hover:underline">
                  ログイン
                </Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              {/* 氏名 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-sm text-muted-foreground">
                  氏名
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="山田 太郎"
                  aria-invalid={!!errors.name}
                  className={cn(errors.name && "border-destructive")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* 会社・ストア名 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="storeName" className="text-sm text-muted-foreground">
                  会社・ストア名
                </Label>
                <Input
                  id="storeName"
                  type="text"
                  autoComplete="organization"
                  placeholder="株式会社サンプル"
                  aria-invalid={!!errors.storeName}
                  className={cn(errors.storeName && "border-destructive")}
                  {...register("storeName")}
                />
                {errors.storeName && (
                  <p className="text-xs text-destructive">{errors.storeName.message}</p>
                )}
              </div>

              {/* ユーザー名 */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username" className="text-sm text-muted-foreground">
                  ユーザー名
                </Label>
                {/* 小文字変換: UI の入力正規化のため Controller で処理 */}
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input
                      id="username"
                      type="text"
                      autoComplete="username"
                      placeholder="my-store"
                      aria-invalid={!!errors.username}
                      className={cn(errors.username && "border-destructive")}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                    />
                  )}
                />
                {/* リアルタイム URL プレビュー */}
                <p
                  className={cn(
                    "text-xs",
                    username && !errors.username ? "text-cta" : "text-muted-foreground"
                  )}
                >
                  {username ? `${username}.setlink.jp` : "username.setlink.jp"}
                </p>
                {errors.username && (
                  <p className="text-xs text-destructive">{errors.username.message}</p>
                )}
              </div>

              {/* 利用規約 */}
              <div className="flex flex-col gap-1">
                <Controller
                  control={control}
                  name="agreedToTerms"
                  render={({ field }) => (
                    <div className="flex items-start gap-2.5">
                      <Checkbox
                        id="agreedToTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={!!errors.agreedToTerms}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor="agreedToTerms"
                        className="cursor-pointer text-sm leading-snug text-muted-foreground"
                      >
                        {/* TODO: リンク先 URL は後で設定 */}
                        <Link href="/terms" className="text-cta hover:underline">
                          利用規約
                        </Link>
                        および
                        <Link href="/privacy" className="text-cta hover:underline">
                          プライバシーポリシー
                        </Link>
                        に同意します
                      </label>
                    </div>
                  )}
                />
                {errors.agreedToTerms && (
                  <p className="text-xs text-destructive">{errors.agreedToTerms.message}</p>
                )}
              </div>

              {/* アカウントを作成 */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "登録中..." : "アカウントを作成"}
              </Button>

              {/* 戻る */}
              <p className="text-center text-sm text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-cta hover:underline"
                >
                  ← 前のステップに戻る
                </button>
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Footer — white text on dark background */}
      <div className="mt-8 flex flex-col items-center gap-1.5">
        <button
          type="button"
          className="text-sm font-medium text-white hover:underline"
          onClick={() => {
            // TODO: サポートページへのリンク
          }}
        >
          お困りの場合
        </button>
        <p className="max-w-md text-center text-xs text-white/55">
          登録することで、
          <Link href="/terms" className="underline hover:text-white/80">
            利用規約
          </Link>
          および
          <Link href="/privacy" className="underline hover:text-white/80">
            プライバシーポリシー
          </Link>
          に同意したことになります。
        </p>
      </div>
    </div>
  );
}

function PasswordCheck({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li
      className={cn(
        "flex items-center gap-1.5 text-xs",
        ok ? "text-success" : "text-muted-foreground"
      )}
    >
      {ok ? <Check className="size-3" /> : <X className="size-3" />}
      {label}
    </li>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
