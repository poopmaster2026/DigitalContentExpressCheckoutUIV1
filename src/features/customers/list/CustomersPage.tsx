"use client";

import { Suspense } from "react";

import { CustomersContent } from "./CustomersContent/CustomersContent";
import { CustomersPageSkeleton } from "./CustomersPageSkeleton";

export function CustomersPage() {
  return (
    <Suspense fallback={<CustomersPageSkeleton />}>
      <CustomersContent />
    </Suspense>
  );
}
