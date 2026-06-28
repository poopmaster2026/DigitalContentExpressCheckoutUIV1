import { Suspense } from "react";

import { IncomeContent } from "@/features/income/list/IncomeContent/IncomeContent";
import { IncomePageSkeleton } from "@/features/income/list/IncomePageSkeleton";

export default function IncomePage() {
  return (
    <Suspense fallback={<IncomePageSkeleton />}>
      <IncomeContent />
    </Suspense>
  );
}
