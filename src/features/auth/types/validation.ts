import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  password: z.string().min(1, "パスワードを入力してください"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "氏名を入力してください"),
  storeName: z.string().min(1, "会社・ストア名を入力してください"),
  username: z
    .string()
    .min(3, "3文字以上で入力してください")
    .max(16, "16文字以下で入力してください")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "小文字英数字とハイフンのみ使えます（先頭・末尾は英数字）"
    ),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "8文字以上で入力してください")
    .regex(/[A-Z]/, "大文字を1つ以上含めてください")
    .regex(/[0-9]/, "数字を1つ以上含めてください")
    .regex(/[^a-zA-Z0-9]/, "記号を1つ以上含めてください"),
  agreedToTerms: z
    .boolean()
    .refine((v) => v === true, "利用規約に同意してください"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
