import { useMemo, useState } from "react";

/**
 * Hook untuk membuat fake pagination (client-side pagination)
 * @param data - array data asli
 * @param pageSize - jumlah item per halaman (default 5)
 */
export const useFakePagination = <T>(data: T[] = [], pageSize: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
  };
};
