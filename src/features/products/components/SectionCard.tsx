import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * 編集フォームの 1 セクション = 1 枚の白カード。
 * 各セクション（基本情報 / コンテンツ / 価格・公開）で共通の器にする。
 */
interface SectionCardProps {
  title: string;
  description?: string;
  /** 見出し右の補助要素（バッジなど）。 */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  description,
  aside,
  children,
  className,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-card-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
