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
    defaultValues: { email: "", password: "", name: "", storeName: "", username: "", agreedToTerms: false },
    mode: "onBlur",
  });

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
    await new Promise((r) => setTimeout(r, 800));
    router.push("/store/products");
  };

  return (
    <div className="flex min-h-screen">
      {/* ===== 左パネル: フォーム ===== */}
      <div className="flex w-full flex-col lg:w-[45%]">
        {/* ロゴ */}
        <div className="px-10 pt-10">
          <Image
            src="/setlink-logo.png"
            alt="SetLink"
            width={48}
            height={55}
            className="rounded-lg"
          />
        </div>

        {/* フォーム（縦中央） */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 py-12">
          <div className="w-full max-w-md">
            {/* ヘッダー + プログレスバー */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">新規登録</h1>
                  <p className="mt-2 text-sm text-muted-foreground">SetLink に参加する</p>
                </div>
                <span className="text-sm text-muted-foreground">{step} / 2</span>
              </div>
              {/* プログレスバー */}
              <div className="mt-4 flex gap-1.5">
                <div className="h-1 flex-1 rounded-full bg-cta" />
                <div
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    step === 2 ? "bg-cta" : "bg-surface-muted"
                  )}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  {/* メールアドレス */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-base text-muted-foreground">
                      メールアドレス
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      className={cn(
                        "h-12 border-0 bg-surface px-4 text-base focus-visible:ring-1",
                        errors.email && "ring-1 ring-destructive"
                      )}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* パスワード */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password" className="text-base text-muted-foreground">
                      パスワード
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        className={cn(
                          "h-12 border-0 bg-surface px-4 pr-12 text-base focus-visible:ring-1",
                          errors.password && "ring-1 ring-destructive"
                        )}
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "パスワードを非表示" : "パスワードを表示"}
                      >
                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                      </button>
                    </div>
                    {(password.length > 0 || errors.password) && (
                      <ul className="mt-1 flex flex-col gap-0.5">
                        <PasswordCheck ok={passwordChecks.length} label="8文字以上" />
                        <PasswordCheck ok={passwordChecks.uppercase} label="大文字を含む" />
                        <PasswordCheck ok={passwordChecks.number} label="数字を含む" />
                        <PasswordCheck ok={passwordChecks.symbol} label="記号を含む" />
                      </ul>
                    )}
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="h-12 mt-1 w-full rounded-full text-base"
                    onClick={handleNext}
                  >
                    次へ
                  </Button>

                  <div className="my-2 text-center text-sm text-muted-foreground">または</div>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="h-12 w-full rounded-full gap-2 text-base"
                    onClick={() => {
                      // TODO: Google OAuth による新規登録
                      // 1. Google の OAuth 認可エンドポイントにリダイレクト
                      // 2. コールバックで受け取った Google プロフィール（name, email）を
                      //    バックエンドに送信してアカウントを作成
                      // 3. 新規ユーザー → Step 2（ストアURL・ストア名入力）へ
                      // 4. 既存ユーザー → ダッシュボード（/store/products）へリダイレクト
                    }}
                  >
                    <GoogleIcon />
                    Googleで登録
                  </Button>

                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    すでにアカウントをお持ちですか？{" "}
                    <Link href="/login" className="font-medium text-foreground hover:underline">
                      ログイン
                    </Link>
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-5">
                  {/* 氏名 */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-base text-muted-foreground">
                      氏名
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="山田 太郎"
                      aria-invalid={!!errors.name}
                      className={cn(
                        "h-12 border-0 bg-surface px-4 text-base focus-visible:ring-1",
                        errors.name && "ring-1 ring-destructive"
                      )}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* ストア名 */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="storeName" className="text-base text-muted-foreground">
                      ストア名
                    </Label>
                    <Input
                      id="storeName"
                      type="text"
                      autoComplete="organization"
                      placeholder="株式会社サンプル"
                      aria-invalid={!!errors.storeName}
                      className={cn(
                        "h-12 border-0 bg-surface px-4 text-base focus-visible:ring-1",
                        errors.storeName && "ring-1 ring-destructive"
                      )}
                      {...register("storeName")}
                    />
                    {errors.storeName && (
                      <p className="text-xs text-destructive">{errors.storeName.message}</p>
                    )}
                  </div>

                  {/* ストアURL */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="username" className="text-base text-muted-foreground">
                      ストアURL
                    </Label>
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
                          className={cn(
                            "h-12 border-0 bg-surface px-4 text-base focus-visible:ring-1",
                            errors.username && "ring-1 ring-destructive"
                          )}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                        />
                      )}
                    />
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

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="h-12 mt-1 w-full rounded-full text-base"
                  >
                    {isSubmitting ? "登録中..." : "アカウントを作成"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-foreground hover:underline"
                    >
                      ← 前のステップに戻る
                    </button>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* フッター */}
        <div className="px-10 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            登録することで
            <Link href="/terms" className="underline hover:text-foreground">
              利用規約
            </Link>
            および
            <Link href="/privacy" className="underline hover:text-foreground">
              プライバシーポリシー
            </Link>
            に同意したことになります。
          </p>
        </div>
      </div>

      {/* ===== 右パネル: ビジュアル ===== */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-cta">
        {/* TODO: 画像を後で追加 */}
        <p className="text-white/40 text-sm">画像エリア</p>
      </div>
    </div>
  );
}

function PasswordCheck({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 text-sm font-medium",
        ok ? "text-success" : "text-muted-foreground"
      )}
    >
      {ok ? <Check className="size-4 shrink-0" /> : <X className="size-4 shrink-0" />}
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
