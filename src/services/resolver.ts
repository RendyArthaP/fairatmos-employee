import { useMutation, useQuery } from "@tanstack/react-query";
import { createEmployee, getEmployees } from "./services";
import { useMemo, useState } from "react";

export const useGetDataEmployee = () => {
  return useQuery({
    queryKey: ["Employee"],
    queryFn: getEmployees,
  });
};

export const useCreateDataEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,
  });
};

export const useEmployeesWithPagination = (pageSize: number = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data pakai React Query
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["Employee"],
    queryFn: getEmployees,
  });

  const employees = data?.data ?? [];
  const totalItems = employees.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Hitung data per halaman
  const paginatedData = useMemo(() => {
    const employees = data?.data ?? [];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return employees?.slice(startIndex, endIndex);
  }, [currentPage, data?.data, pageSize]);

  // Navigasi halaman
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const resetPage = () => setCurrentPage(1);

  return {
    employees,
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
    isLoading,
    isFetching,
    refetch,
    error,
  };
};
