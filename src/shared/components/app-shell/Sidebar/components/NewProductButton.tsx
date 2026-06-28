"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewProductButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/store/products/new/digital")}
      aria-label="新規作成"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-cta-foreground transition-colors hover:bg-cta-hover"
    >
      <Plus className="h-5 w-5" />
    </button>
  );
}
