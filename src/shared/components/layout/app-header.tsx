"use client";

import Image from "next/image";
import { Link } from "react-aria-components";
import "./app-header.css";

/** 黒 chrome ヘッダー: 左 = Ours ロゴ（/store へ）/ 右 = アバター。 */
export function AppHeader() {
  return (
    <header className="app-header">
      <Link href="/store" className="app-header__logo" aria-label="Ours ホーム">
        <Image src="/ours-logo.png" alt="Ours" width={101} height={38} priority />
      </Link>
      <div className="app-header__avatar" aria-hidden="true" />
    </header>
  );
}
