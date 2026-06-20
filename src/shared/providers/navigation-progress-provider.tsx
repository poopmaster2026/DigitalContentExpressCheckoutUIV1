"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Ctx = { start: () => void };
const NavigationProgressContext = createContext<Ctx>({ start: () => {} });
export const useNavigationStart = () => useContext(NavigationProgressContext).start;

export function NavigationProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = usePathname();

  const complete = useCallback(() => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    setProgress(100);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);
  }, []);

  const start = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    setVisible(true);
    setProgress(15);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 80) { clearInterval(intervalRef.current); return p; }
        return p + (80 - p) * 0.08;
      });
    }, 200);
  }, []);

  useEffect(() => {
    if (visible) complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function onLinkClick(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("a[href]");
      if (!el) return;
      const href = el.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") || href.startsWith("//") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      start();
    }
    document.addEventListener("click", onLinkClick);
    return () => document.removeEventListener("click", onLinkClick);
  }, [start]);

  return (
    <NavigationProgressContext.Provider value={{ start }}>
      {visible && (
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-[200] h-0.5 bg-cta transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      )}
      {children}
    </NavigationProgressContext.Provider>
  );
}
