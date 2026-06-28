"use client";

import {
  CalendarClock,
  CreditCard,
  FileText,
  ListChecks,
  Upload,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

import type { SaleType } from "../types";
import {
  BLOCKED_CONTENT_MIME_TYPES,
  CONTENT_FILE_MAX_SIZE,
  type ProductFormValues,
} from "../types/validation";

import { SectionCard } from "./SectionCard";

function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "—";
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) return `${gb.toFixed(gb % 1 === 0 ? 0 : 1)} GB`;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

const CONTENT_COPY: Record<SaleType, { title: string; description: string }> = {
  digital: {
    title: "コンテンツ",
    description: "購入者にダウンロードで届けるファイルを設定します。",
  },
  course: {
    title: "カリキュラム",
    description: "レッスンをまとめてコースとして提供します。",
  },
  booking: {
    title: "予約枠",
    description: "相談やセッションの提供日時を設定します。",
  },
  subscription: {
    title: "プラン",
    description: "継続課金のプランと提供内容を設定します。",
  },
};

export function ContentSection({ saleType, isRequired = false }: { saleType: SaleType; isRequired?: boolean }) {
  const copy = CONTENT_COPY[saleType];

  return (
    <SectionCard
      title={copy.title}
      description={copy.description}
      aside={isRequired && saleType === "digital"
        ? <span className="text-sm text-destructive">*</span>
        : undefined}
    >
      {saleType === "digital" ? (
        <DigitalContent />
      ) : (
        <NonDigitalContent saleType={saleType} />
      )}
    </SectionCard>
  );
}

function DigitalContent() {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  const contentFile = useWatch({ control, name: "contentFile" });
  const inputRef = useRef<HTMLInputElement>(null);

  const fileRef = useRef<File | null>(null);

  const handleFile = (file: File) => {
    if ((BLOCKED_CONTENT_MIME_TYPES as readonly string[]).includes(file.type)) return;
    fileRef.current = file;
    setValue(
      "contentFile",
      { name: file.name, size: file.size, type: file.type, file },
      { shouldDirty: true }
    );
    trigger("contentFile");
  };

  const fileError = (errors.contentFile as { message?: string } | undefined)?.message;

  return (
    <>
      {contentFile ? (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3">
          <FileText className="h-8 w-8 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{contentFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(contentFile.size)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              変更
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
              onClick={() => setValue("contentFile", null, { shouldDirty: true })}
            >
              <X />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className={cn(
            "flex w-full flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border px-6 py-10",
            "text-muted-foreground transition-colors",
            "hover:border-cta hover:bg-accent hover:text-foreground"
          )}
        >
          <Upload className="h-8 w-8" />
          <div className="text-center">
            <p className="text-sm font-medium">ファイルをドラッグ&ドロップ</p>
            <p className="mt-1 text-xs">
              PDF・動画・音声・ZIP など（最大 {formatFileSize(CONTENT_FILE_MAX_SIZE)}）
            </p>
          </div>
          <span className="text-sm font-medium text-foreground">ファイルを選択</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {fileError && <p className="mt-2 text-xs text-destructive">{fileError}</p>}
    </>
  );
}

const NON_DIGITAL_CONFIG: Record<
  Exclude<SaleType, "digital">,
  { icon: ReactNode; lead: string; items: string[]; cta: string }
> = {
  course: {
    icon: <ListChecks className="h-7 w-7 text-muted-foreground" />,
    lead: "セクションとレッスンを追加してカリキュラムを組み立てます。",
    items: ["レッスン動画・資料", "公開順とドリップ配信", "進捗トラッキング"],
    cta: "レッスンを追加",
  },
  booking: {
    icon: <CalendarClock className="h-7 w-7 text-muted-foreground" />,
    lead: "提供する日時と所要時間を設定して予約を受け付けます。",
    items: ["受付可能な曜日・時間帯", "1 枠の所要時間", "オンライン / 対面の指定"],
    cta: "予約枠を追加",
  },
  subscription: {
    icon: <CreditCard className="h-7 w-7 text-muted-foreground" />,
    lead: "継続課金のプランと、会員に届ける内容を設定します。",
    items: ["請求サイクル（月額 / 年額）", "プランに含む特典", "無料トライアル期間"],
    cta: "プランを追加",
  },
};

function NonDigitalContent({
  saleType,
}: {
  saleType: Exclude<SaleType, "digital">;
}) {
  const c = NON_DIGITAL_CONFIG[saleType];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-dashed border-border bg-surface px-5 py-6">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-card">
          {c.icon}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-foreground">{c.lead}</p>
          <ul className="flex flex-col gap-1.5">
            {c.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Button type="button" variant="outline" size="sm">
          {c.cta}
        </Button>
      </div>
    </div>
  );
}
