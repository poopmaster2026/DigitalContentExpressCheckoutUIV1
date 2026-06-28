"use client";

import { useIncomeFilter } from "./hooks/useIncomeFilter";
import { IncomeContentUI } from "./IncomeContentUI";

export function IncomeContent() {
  const {
    entries,
    totalRevenue,
    totalCount,
    filteredCount,
    statusFilter,
    onStatusChange,
    isFilterPending,
    page,
    pageCount,
    setPage,
  } = useIncomeFilter();

  return (
    <IncomeContentUI
      entries={entries}
      totalRevenue={totalRevenue}
      totalCount={totalCount}
      filteredCount={filteredCount}
      statusFilter={statusFilter}
      onStatusChange={onStatusChange}
      isFilterPending={isFilterPending}
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
    />
  );
}
