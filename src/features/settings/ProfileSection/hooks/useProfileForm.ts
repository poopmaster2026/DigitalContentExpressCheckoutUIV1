import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { profileSchema, type ProfileFormValues } from "../../types/validation";

export function useProfileForm() {
  return useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      // TODO: BE - fetch from /api/users/me
      name: "花子",
      username: "kumaaa1212",
      email: "hanako@ours.jp",
      avatarImage: null,
    },
  });
}
