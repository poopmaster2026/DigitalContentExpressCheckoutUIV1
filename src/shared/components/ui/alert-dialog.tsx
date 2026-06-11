"use client";

import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import type { ReactNode } from "react";
import { Button } from "./button";
import "./alert-dialog.css";

export interface AlertDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  children: ReactNode;
  /** destructive アクションのラベル（例: 削除） */
  actionLabel: string;
  onAction: () => void;
}

/** destructive 確認ダイアログ（削除など）。 */
export function AlertDialog({
  isOpen,
  onOpenChange,
  title,
  children,
  actionLabel,
  onAction,
}: AlertDialogProps) {
  return (
    <ModalOverlay
      className="ui-modal-overlay"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
    >
      <Modal className="ui-modal">
        <Dialog role="alertdialog" className="ui-alert-dialog">
          {({ close }) => (
            <>
              <Heading slot="title" className="ui-alert-dialog__title">
                {title}
              </Heading>
              <p className="ui-alert-dialog__body">{children}</p>
              <div className="ui-alert-dialog__actions">
                <Button variant="secondary" onPress={close}>
                  キャンセル
                </Button>
                <Button
                  variant="negative"
                  onPress={() => {
                    onAction();
                    close();
                  }}
                >
                  {actionLabel}
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
