"use client";

import { useTransition } from "react";

import { CUSTOMERS } from "../../mock";

import { CustomersContentUI } from "./CustomersContentUI";
import { useCustomersFilter } from "./hooks/useCustomersFilter";

export function CustomersContent() {
  const [isSearchPending, startSearchTransition] = useTransition();

  const {
    query,
    setQuery,
    statusFilter,
    onStatusChange,
    isFilterPending,
    customers,
    filteredTotal,
    total,
    totalSubscribed,
    isFiltered,
    page,
    pageCount,
    setPage,
  } = useCustomersFilter(CUSTOMERS);

  const handleQueryChange = (v: string) => {
    startSearchTransition(() => setQuery(v));
  };

  return (
    <CustomersContentUI
      customers={customers}
      total={total}
      totalSubscribed={totalSubscribed}
      filteredTotal={filteredTotal}
      query={query}
      onQueryChange={handleQueryChange}
      isSearchPending={isSearchPending}
      isFilterPending={isFilterPending}
      statusFilter={statusFilter}
      onStatusChange={onStatusChange}
      isFiltered={isFiltered}
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
    />
  );
}
