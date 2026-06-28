"use client";

import { Suspense } from "react";

import { CustomerDetailContent } from "./CustomerDetailContent/CustomerDetailContent";
import { CustomerDetailPageSkeleton } from "./CustomerDetailPageSkeleton";

interface CustomerDetailPageProps {
  customerId: string;
}

export function CustomerDetailPage({ customerId }: CustomerDetailPageProps) {
  return (
    <Suspense fallback={<CustomerDetailPageSkeleton />}>
      <CustomerDetailContent customerId={customerId} />
    </Suspense>
  );
}
