"use client";

import { CUSTOMERS, ORDERS, SUBSCRIPTIONS } from "../../mock";

import { CustomerDetailContentUI } from "./CustomerDetailContentUI";

interface CustomerDetailContentProps {
  customerId: string;
}

export function CustomerDetailContent({ customerId }: CustomerDetailContentProps) {
  const customer = CUSTOMERS.find((c) => c.id === customerId);
  if (!customer) return null;

  const orders = ORDERS.filter((o) => o.customerId === customerId);
  const subscription = SUBSCRIPTIONS.find((s) => s.customerId === customerId) ?? null;

  return (
    <CustomerDetailContentUI
      customer={customer}
      orders={orders}
      subscription={subscription}
    />
  );
}
