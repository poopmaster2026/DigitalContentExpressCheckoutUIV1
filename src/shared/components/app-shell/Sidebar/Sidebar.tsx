"use client";

import { useState } from "react";

import { SidebarUI } from "./SidebarUI";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <SidebarUI
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded((v) => !v)}
    />
  );
}
