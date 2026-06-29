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
import { Separator } from "@/shared/components/ui/separator";

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
  });

  const onSubmit = async (_values: LoginFormValues) => {
    // TODO: implement auth
    await new Promise((r) => setTimeout(r, 800));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-auth-bg px-4 py-12">
      {/* Logo above card */}
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
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-card-foreground">ログイン</h1>
          <p className="mt-1 text-sm text-muted-foreground">ストア管理へ進む</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm text-muted-foreground">
                パスワード
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-cta hover:underline"
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
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Submit — dark full-width button matching Shopify style */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "ログイン中..." : "ログイン"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">または</span>
          <Separator className="flex-1" />
        </div>

        {/* Google OAuth — light gray, icon + text */}
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full gap-2"
          onClick={() => {
            // TODO: implement Google OAuth
          }}
        >
          <GoogleIcon />
          Googleでログイン
        </Button>

        {/* Sign up */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          アカウントをお持ちでないですか？{" "}
          <Link href="/register" className="text-cta hover:underline">
            新規登録
          </Link>
        </p>
      </div>

      {/* Footer — white text on dark background */}
      <div className="mt-8 flex flex-col items-center gap-1.5">
        <button
          type="button"
          className="text-sm font-medium text-white hover:underline"
          onClick={() => {
            // TODO: support link
          }}
        >
          お困りの場合
        </button>
        <p className="max-w-md text-center text-xs text-white/55">
          ログインすることで、
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
