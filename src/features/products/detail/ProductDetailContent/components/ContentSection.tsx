"use client";

import { Upload, FileText, X } from "lucide-react";
import { useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BLOCKED_CONTENT_MIME_TYPES,
  CONTENT_FILE_MAX_SIZE,
  type ProductFormValues,
} from "../../../types/validation";

import { SectionHeading } from "./SectionHeading";

function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "—";
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) return `${gb.toFixed(gb % 1 === 0 ? 0 : 1)} GB`;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function ContentSection() {
  const { control, setValue, trigger, formState: { errors } } = useFormContext<ProductFormValues>();
  const contentFile = useWatch({ control, name: "contentFile" });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if ((BLOCKED_CONTENT_MIME_TYPES as readonly string[]).includes(file.type)) return;
    setValue("contentFile", { name: file.name, size: file.size, type: file.type }, { shouldDirty: true });
    trigger("contentFile");
  };

  const fileError = (errors.contentFile as { message?: string } | undefined)?.message;

  return (
    <section className="flex flex-col gap-3">
      <SectionHeading>コンテンツ（デジタル配信）</SectionHeading>

      {contentFile ? (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
          <FileText className="h-8 w-8 shrink-0 text-muted-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{contentFile.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(contentFile.size)}</p>
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
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => setValue("contentFile", null, { shouldDirty: true })}
            >
              <X className="h-4 w-4" />
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
            "flex w-full max-w-md flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-8",
            "text-muted-foreground transition-colors",
            "hover:border-primary/40 hover:bg-accent hover:text-foreground"
          )}
        >
          <Upload className="h-8 w-8" />
          <div className="text-center">
            <p className="text-sm font-medium">ファイルをドラッグ&ドロップ</p>
            <p className="mt-1 text-xs">
              PDF・動画・音声・ZIP など（最大{" "}
              {formatFileSize(CONTENT_FILE_MAX_SIZE)}）
            </p>
          </div>
          <span className="text-sm font-medium text-primary">ファイルを選択</span>
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
      {fileError && <p className="text-xs text-destructive">{fileError}</p>}
    </section>
  );
}
