"use client";

import { INCOME_ENTRIES } from "../../mock";

import { useIncomeFilter } from "./hooks/useIncomeFilter";
import { IncomeContentUI } from "./IncomeContentUI";

export function IncomeContent() {
  const {
    entries,
    totalRevenue,
    totalRefunded,
    statusCounts,
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
      allEntries={INCOME_ENTRIES}
      totalRevenue={totalRevenue}
      totalRefunded={totalRefunded}
      statusCounts={statusCounts}
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
