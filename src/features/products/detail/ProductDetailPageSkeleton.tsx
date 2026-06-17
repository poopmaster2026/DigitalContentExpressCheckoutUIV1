import { style } from "@react-spectrum/s2/style" with { type: "macro" };

// ヘッダー
const page = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
});
const backRow = style({ marginBottom: 8 });
const backBlock = style({
  width: 80,
  height: 16,
  backgroundColor: "gray-100",
  borderRadius: "sm",
});
const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
});
const titleBlock = style({
  width: 200,
  height: 28,
  backgroundColor: "gray-200",
  borderRadius: "sm",
});
const badgeBlock = style({
  width: 56,
  height: 20,
  backgroundColor: "gray-100",
  borderRadius: "pill",
});
const statusBlock = style({
  width: 48,
  height: 16,
  backgroundColor: "gray-100",
  borderRadius: "sm",
});
const spacer = style({ flexGrow: 1 });
const actionsRow = style({ display: "flex", gap: 12 });
const btn = style({
  width: 56,
  height: 32,
  backgroundColor: "gray-100",
  borderRadius: "sm",
});
const divider = style({
  height: 2,
  backgroundColor: "gray-200",
  marginTop: 12,
  marginBottom: 24,
});

// フォームカラム
const scrollArea = style({
  flexGrow: 1,
  minHeight: 0,
  overflow: "auto",
  paddingTop: 24,
  paddingBottom: 24,
});
const formColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 40,
  maxWidth: 640,
});
const section = style({ display: "flex", flexDirection: "column", gap: 16 });
const sectionLabel = style({
  width: 80,
  height: 12,
  backgroundColor: "gray-200",
  borderRadius: "sm",
});
const field = style({ display: "flex", flexDirection: "column", gap: 4 });
const fieldLabel = style({
  width: 60,
  height: 12,
  backgroundColor: "gray-100",
  borderRadius: "sm",
});
const fieldInput = style({
  height: 36,
  backgroundColor: "gray-100",
  borderRadius: "sm",
});
const fieldInputTall = style({
  height: 80,
  backgroundColor: "gray-100",
  borderRadius: "sm",
});

export function ProductDetailPageSkeleton() {
  return (
    <div className={page}>
      {/* ヘッダー */}
      <div className={backRow}>
        <div className={backBlock} />
      </div>
      <div className={titleRow}>
        <div className={titleBlock} />
        <div className={badgeBlock} />
        <div className={statusBlock} />
        <div className={spacer} />
        <div className={actionsRow}>
          <div className={btn} />
          <div className={btn} />
          <div className={btn} />
        </div>
      </div>
      <div className={divider} />

      {/* フォーム本体 */}
      <div className={scrollArea}>
        <div className={formColumn}>
          {/* BasicInfoSection */}
          <div className={section}>
            <div className={sectionLabel} />
            <div className={field}>
              <div className={fieldLabel} />
              <div className={fieldInput} />
            </div>
            <div className={field}>
              <div className={fieldLabel} />
              <div className={fieldInputTall} />
            </div>
          </div>
          {/* PricingSection */}
          <div className={section}>
            <div className={sectionLabel} />
            <div className={field}>
              <div className={fieldLabel} />
              <div className={fieldInput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
