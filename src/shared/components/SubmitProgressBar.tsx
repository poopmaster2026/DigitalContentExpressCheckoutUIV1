"use client";

import { Progress } from "@/shared/components/ui/progress";

export function SubmitProgressBar({ pending, progress }: { pending: boolean; progress: number }) {
  if (!pending) return null;
  return (
    <Progress
      value={progress}
      className="fixed inset-x-0 top-0 z-50 h-0.5 rounded-none bg-transparent [&>div]:bg-cta [&>div]:transition-all [&>div]:duration-200"
    />
  );
}
