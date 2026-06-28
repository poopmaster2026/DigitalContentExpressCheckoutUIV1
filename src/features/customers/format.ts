export function formatSpent(yen: number): string {
  if (yen === 0) return "¥0";
  return `¥${yen.toLocaleString("ja-JP")}`;
}

export function formatSince(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
