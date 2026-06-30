import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { passwordSchema, type PasswordFormValues } from "../../types/validation";

export function usePasswordForm() {
  return useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
}
