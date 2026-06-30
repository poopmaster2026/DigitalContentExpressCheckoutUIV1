"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import type { LoginFormValues } from "../types/validation";
import { loginSchema } from "../types/validation";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (_values: LoginFormValues) => {
    // TODO: implement auth
    await new Promise((r) => setTimeout(r, 800));
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">ログイン</h1>
              <p className="mt-2 text-sm text-muted-foreground">ストア管理へ進む</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              {/* Email */}
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
                    "h-12 border-0 bg-card px-4 text-base focus-visible:ring-1",
                    errors.email && "ring-1 ring-destructive"
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base text-muted-foreground">
                    パスワード
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-cta hover:underline"
                    tabIndex={-1}
                  >
                    パスワードを忘れた方
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className={cn(
                      "h-12 border-0 bg-card px-4 pr-12 text-base focus-visible:ring-1",
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
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* ログインボタン */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="h-12 mt-1 w-full rounded-full text-base"
              >
                {isSubmitting ? "ログイン中..." : "ログイン"}
              </Button>
            </form>

            {/* OR */}
            <div className="my-6 text-center text-sm text-muted-foreground">または</div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-12 w-full rounded-full gap-2 text-base"
              onClick={() => {
                // TODO: implement Google OAuth
              }}
            >
              <GoogleIcon />
              Googleでログイン
            </Button>

            {/* 新規登録リンク */}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              アカウントをお持ちでないですか？{" "}
              <Link href="/register" className="font-medium text-foreground hover:underline">
                新規登録
              </Link>
            </p>
          </div>
        </div>

        {/* フッター */}
        <div className="px-10 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            ログインすることで
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
