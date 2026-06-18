import Image from "next/image";

import { StoreSwitcher } from "./StoreSwitcher";

export function Brand() {
  return (
    <div className="flex shrink-0 items-center gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/setlink-logo.png"
          alt=""
          width={36}
          height={36}
          className="block shrink-0"
          priority
        />
        <span className="text-base font-bold">SetLink</span>
      </div>
      <div className="hidden h-4 w-px shrink-0 bg-border sm:block" role="separator" aria-orientation="vertical" />
      <div className="hidden sm:block">
        <StoreSwitcher />
      </div>
    </div>
  );
}
