// 商品編集（Figma 952:540 — 左フォーム + 右ライブプレビュー）は次のステップで実装する。
export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="page-stub">
      <h1>商品編集</h1>
      <p>商品 {id} の編集画面は準備中です。</p>
    </div>
  );
}
