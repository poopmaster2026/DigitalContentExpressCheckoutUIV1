"use client";

import { useState } from "react";

export function useSubmitProgress() {
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState(0);

  async function run(fn: (onProgress: (p: number) => void) => Promise<void>) {
    setPending(true);
    setProgress(0);
    try {
      await fn((p) => setProgress(p));
      setProgress(100);
    } finally {
      setPending(false);
      setProgress(0);
    }
  }

  return { pending, progress, run, setPending };
}
