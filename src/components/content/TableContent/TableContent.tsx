import { useEmployeesWithPagination } from "../../../services/resolver";
import type { Employee } from "../../../services/type";
import TableEmployee from "../../ui/TableEmployee/TableEmployee";
import Pagination from "../Pagination/Pagination";

const TableContent = () => {
  const { employees, paginatedData, currentPage, totalPages, goToPage } =
    useEmployeesWithPagination(5);

  const employeeData = paginatedData as Employee[];
  const totalEmployees = employees?.length || 0;

  const getPaginationLabel = (page: number, limit: number, total: number) => {
    if (total === 0)
      return (
        <h1 className="m-0 text-xs text-gray-400">No employees to display</h1>
      );

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
      <h1 className="m-0 text-xs text-gray-400">
        Displaying {start}-{end} of <b className="text-black">{total}</b>{" "}
        employees
      </h1>
    );
  };

  return (
    <div className="mt-4">
      {getPaginationLabel(1, 5, totalEmployees)}
      <TableEmployee paginatedData={employeeData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default TableContent;
