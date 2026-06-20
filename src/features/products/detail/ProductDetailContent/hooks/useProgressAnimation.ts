"use client";

import { useCallback, useState } from "react";

interface ProgressState {
  pending: boolean;
  isSaving: boolean;
  progress: number;
}

export function useProgressAnimation() {
  const [state, setState] = useState<ProgressState>({
    pending: false,
    isSaving: false,
    progress: 0,
  });

  const runWithProgress = useCallback((onComplete: () => void, saving = false) => {
    setState({ pending: true, isSaving: saving, progress: 0 });
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(85, (elapsed / 600) * 85);
      setState((prev) => ({ ...prev, progress: p }));
      if (p < 85) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => {
      setState((prev) => ({ ...prev, progress: 100 }));
      setTimeout(() => {
        setState({ pending: false, isSaving: false, progress: 0 });
        onComplete();
      }, 200);
    }, 800);
  }, []);

  return {
    pending: state.pending,
    isSaving: state.isSaving,
    progress: state.progress,
    runWithProgress,
  };
}
