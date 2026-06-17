"use client";

import { Button } from "@react-spectrum/s2/Button";
import { ButtonGroup } from "@react-spectrum/s2/ButtonGroup";
import {
  Content,
  DropZone,
  Heading,
  IllustratedMessage,
} from "@react-spectrum/s2/DropZone";
import { FileTrigger } from "@react-spectrum/s2/FileTrigger";
import FileDocument from "@react-spectrum/s2/illustrations/gradient/generic2/Document";
import DropToUpload from "@react-spectrum/s2/illustrations/gradient/generic2/DropToUpload";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useFormContext, useWatch } from "react-hook-form";

import {
  BLOCKED_CONTENT_MIME_TYPES,
  CONTENT_FILE_MAX_SIZE,
  type ProductFormValues,
} from "../../../types/validation";

import { SectionHeading } from "./SectionHeading";

const section = style({ display: "flex", flexDirection: "column", gap: 12 });
const dropZone = style({ width: "full", maxWidth: 480 });
const errorText = style({ font: "ui", color: "negative", marginY: 0 });

function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "—";
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) return `${gb.toFixed(gb % 1 === 0 ? 0 : 1)} GB`;
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function ContentSection() {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  const contentFile = useWatch({ control, name: "contentFile" });

  const handleFile = (file: File) => {
    if ((BLOCKED_CONTENT_MIME_TYPES as readonly string[]).includes(file.type)) {
      return;
    }
    setValue(
      "contentFile",
      { name: file.name, size: file.size, type: file.type },
      { shouldDirty: true }
    );
    trigger("contentFile");
  };

  const handleRemove = () => {
    setValue("contentFile", null, { shouldDirty: true });
  };

  const fileError = (errors.contentFile as { message?: string } | undefined)
    ?.message;

  const isFilled = contentFile !== null;

  return (
    <section className={section}>
      <SectionHeading>コンテンツ（デジタル配信）</SectionHeading>
      <DropZone
        aria-label="配信ファイル"
        styles={dropZone}
        isFilled={isFilled}
        replaceMessage="ファイルを置き換える"
        getDropOperation={() => "copy"}
        onDrop={async (event) => {
          const item = event.items.find((i) => i.kind === "file");
          if (item && item.kind === "file") {
            handleFile(await item.getFile());
          }
        }}
      >
        {isFilled && contentFile ? (
          <IllustratedMessage orientation="horizontal" size="S">
            <FileDocument />
            <Heading>{contentFile.name}</Heading>
            <Content>{formatFileSize(contentFile.size)}</Content>
            <ButtonGroup>
              <Button
                variant="secondary"
                fillStyle="outline"
                onPress={handleRemove}
              >
                削除
              </Button>
              <FileTrigger
                onSelect={(files) => {
                  const file = files?.[0];
                  if (file) handleFile(file);
                }}
              >
                <Button variant="accent" UNSAFE_className="ours-accent-btn">変更</Button>
              </FileTrigger>
            </ButtonGroup>
          </IllustratedMessage>
        ) : (
          <IllustratedMessage orientation="horizontal" size="S">
            <DropToUpload />
            <Heading>ファイルをドラッグ&ドロップ</Heading>
            <Content>
              PDF・動画・音声・ZIP など（最大{" "}
              {formatFileSize(CONTENT_FILE_MAX_SIZE)}）
            </Content>
            <ButtonGroup>
              <FileTrigger
                onSelect={(files) => {
                  const file = files?.[0];
                  if (file) handleFile(file);
                }}
              >
                <Button variant="accent" UNSAFE_className="ours-accent-btn">ファイルを選択</Button>
              </FileTrigger>
            </ButtonGroup>
          </IllustratedMessage>
        )}
      </DropZone>
      {fileError && <p className={errorText}>{fileError}</p>}
    </section>
  );
}
