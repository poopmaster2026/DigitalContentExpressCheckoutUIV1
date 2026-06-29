"use client";

export function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">設定</h1>
        <p className="mt-1 text-sm text-muted-foreground">アカウントとプロフィールの管理</p>
      </div>

      {/* TODO: セクションを追加する
          - ProfileSection: 氏名・アイコン変更
          - SecuritySection: パスワード変更・2FA
          - NotificationSection: 通知設定
      */}
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        設定画面（実装予定）
      </div>
    </div>
  );
}
