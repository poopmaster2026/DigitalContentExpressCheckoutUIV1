import { z } from "zod";

export const AVATAR_MAX_SIZE = 2 * 1024 * 1024;
export const AVATAR_ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

const avatarImageSchema = z
  .object({
    url: z.string(),
    file: z.any().optional(),
  })
  .refine(
    (f) => !f.file || (AVATAR_ACCEPTED_TYPES as readonly string[]).includes(f.file.type),
    "JPG・PNG・WebP・GIF のみ対応しています"
  )
  .refine(
    (f) => !f.file || f.file.size <= AVATAR_MAX_SIZE,
    "画像は2MB以下にしてください"
  )
  .nullable();

export const profileSchema = z.object({
  name: z.string().min(1, "氏名は必須です"),
  username: z.string().min(1, "ユーザー名は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  avatarImage: avatarImageSchema,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "現在のパスワードは必須です"),
    newPassword: z.string().min(8, "8文字以上入力してください"),
    confirmPassword: z.string().min(1, "パスワードの確認は必須です"),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword && val.confirmPassword && val.newPassword !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "パスワードが一致しません",
        path: ["confirmPassword"],
      });
    }
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
