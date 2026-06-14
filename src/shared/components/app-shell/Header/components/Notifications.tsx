"use client";

// 通知（公式サンプル app/Notifications.tsx の移植）。各行は公式 Comment
// （Typography.tsx）と同じ avatar / name(title-sm) / date(detail-sm) / body の構成。
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { ActionButton, NotificationBadge } from "@react-spectrum/s2/ActionButton";
import { Avatar } from "@react-spectrum/s2/Avatar";
import { DialogTrigger } from "@react-spectrum/s2/Dialog";
import { Popover } from "@react-spectrum/s2/Popover";
import Bell from "@react-spectrum/s2/icons/Bell";
import { NOTIFICATIONS } from "@/shared/mock/notifications";

const list = style({
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  overflow: "auto",
  flexGrow: 1,
  minHeight: 0,
});
const heading = style({
  font: "title-lg",
  color: { default: "title", forcedColors: "ButtonText" },
  marginY: 0,
});
const comment = style({
  display: "grid",
  gridTemplateAreas: ["avatar name", "avatar date", ". .", "body body"],
  gridTemplateColumns: ["auto", "1fr"],
  gridTemplateRows: ["auto", "auto", 8, "auto"],
  columnGap: 8,
  alignItems: "center",
});
const commentAvatar = style({ gridArea: "avatar" });
const commentName = style({
  gridArea: "name",
  font: "title-sm",
  color: { default: "title", forcedColors: "ButtonText" },
});
const commentDate = style({
  gridArea: "date",
  font: "detail-sm",
  color: { default: "detail", forcedColors: "ButtonText" },
});
const commentBody = style({
  gridArea: "body",
  font: "body",
  color: { default: "body", forcedColors: "ButtonText" },
});

export function Notifications() {
  return (
    <DialogTrigger>
      <ActionButton isQuiet aria-label={`${NOTIFICATIONS.length}件の通知`}>
        <Bell />
        <NotificationBadge value={NOTIFICATIONS.length} />
      </ActionButton>
      <Popover styles={style({ maxWidth: 300 })}>
        <div className={list}>
          <h3 className={heading}>通知</h3>
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className={comment}>
              <Avatar alt="" src={n.avatar} size={32} styles={commentAvatar} />
              <span className={commentName}>{n.author}</span>
              <span className={commentDate}>{n.date}</span>
              <span className={commentBody}>{n.body}</span>
            </div>
          ))}
        </div>
      </Popover>
    </DialogTrigger>
  );
}
