import type { PasswordFormValues, ProfileFormValues } from "../types/validation";

// TODO: BE - PUT /api/users/profile
export async function updateProfile(_data: ProfileFormValues): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
}

// TODO: BE - PUT /api/users/password
export async function updatePassword(_data: PasswordFormValues): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
}
