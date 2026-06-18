"use client";

import { PanelLeft } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export function PanelToggleButton({
  onToggle,
}: {
  onToggle: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="サイドバーを切り替え"
      className="h-8 w-8 self-start"
      onClick={onToggle}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
}
