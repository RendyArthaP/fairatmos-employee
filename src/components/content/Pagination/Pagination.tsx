import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-end gap-2 mt-6">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border text-sm transition-all ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400 border-gray-200 bg-gray-100"
            : "hover:bg-gray-100 border-gray-300 text-gray-700"
        }`}
      >
        « Previous
      </button>

      {/* Number buttons */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded border text-sm font-medium transition-all ${
            currentPage === num
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border text-sm transition-all ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400 border-gray-200 bg-gray-100"
            : "hover:bg-gray-100 border-gray-300 text-gray-700"
        }`}
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
