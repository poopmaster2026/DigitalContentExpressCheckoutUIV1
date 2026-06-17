"use client";

import { ButtonGroup, Button } from "@react-spectrum/s2/ButtonGroup";
import {
  DropZone,
  IllustratedMessage,
  Heading,
  Content,
} from "@react-spectrum/s2/DropZone";
import { FileTrigger } from "@react-spectrum/s2/FileTrigger";
import CloudUpload from "@react-spectrum/s2/illustrations/gradient/generic2/CloudUpload";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useFormContext, useWatch } from "react-hook-form";

import type { ProductFormValues } from "../hooks/useProductDetailForm";

import { SectionHeading } from "./SectionHeading";

const section = style({ display: "flex", flexDirection: "column", gap: 12 });
const dropZone = style({ width: "full", maxWidth: 480 });
const fileInfo = style({ font: "ui", color: "neutral-subdued", marginY: 0 });

/** バイト数を MB / KB に整形。 */
function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "—";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function ContentSection() {
  const { control, setValue } = useFormContext<ProductFormValues>();
  const contentFile = useWatch({ control, name: "contentFile" });
  const setFile = (name: string, size: number) =>
    setValue("contentFile", { name, size }, { shouldDirty: true });

  return (
    <section className={section}>
      <SectionHeading>コンテンツ（デジタル配信）</SectionHeading>
      <DropZone
        aria-label="配信ファイル"
        styles={dropZone}
        getDropOperation={() => "copy"}
        onDrop={async (event) => {
          const item = event.items.find((i) => i.kind === "file");
          if (item && item.kind === "file") {
            const file = await item.getFile();
            setFile(file.name, file.size);
          }
        }}
      >
        <IllustratedMessage>
          <CloudUpload />
          <Heading>ファイルをドラッグ&ドロップ</Heading>
          <Content>または、コンピュータから選択</Content>
          <ButtonGroup>
            <FileTrigger
              onSelect={(files) => {
                const file = files?.[0];
                if (file) setFile(file.name, file.size);
              }}
            >
              <Button variant="accent">ファイルを選択</Button>
            </FileTrigger>
          </ButtonGroup>
        </IllustratedMessage>
      </DropZone>
      {contentFile && (
        <p className={fileInfo}>
          現在のファイル: {contentFile.name}（{formatFileSize(contentFile.size)}
          ）
        </p>
      )}
    </section>
  );
}
