/** ページャに並べる要素。数値はページ番号、'ellipsis' は省略記号。 */
export type PageItem = number | 'ellipsis'

/**
 * ページャに表示する要素列を組み立てる。
 * 先頭・末尾・現在ページ周辺を残し、間隔が空く箇所を 'ellipsis' に畳む。
 *
 * 例: total=5, current=1 → [1, 2, 3, 'ellipsis', 5]
 *     total=16, current=1 → [1, 2, 3, 'ellipsis', 16]
 */
export function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 1) return [1]

  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
  const sorted = Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  const items: PageItem[] = []
  let previous = 0
  for (const page of sorted) {
    if (page - previous > 1) items.push('ellipsis')
    items.push(page)
    previous = page
  }
  return items
}

/** 「全 N 件中 a–b 件」のレンジ（1 始まり、両端含む）を算出する。 */
export function pageRange(
  totalItems: number,
  pageSize: number,
  currentPage: number,
): { from: number; to: number } {
  if (totalItems === 0) return { from: 0, to: 0 }
  const from = (currentPage - 1) * pageSize + 1
  const to = Math.min(currentPage * pageSize, totalItems)
  return { from, to }
}
