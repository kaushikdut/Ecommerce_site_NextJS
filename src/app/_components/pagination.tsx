import {
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
  TfiAngleLeft,
  TfiAngleRight,
} from "react-icons/tfi";

interface PaginationProps {
  noOfPages: number[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({
  noOfPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const selectedPageHandler = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const getVisibleRange = (currentPage: number, totalPages: number) => {
    const visiblePages = 5;
    let startIndex = Math.max(
      Math.min(currentPage, totalPages - visiblePages + 2),
      1,
    );
    let endIndex = Math.min(startIndex + visiblePages - 1, totalPages);

    if (startIndex > 2) {
      startIndex -= 1;
    }
    if (endIndex < totalPages - 1) {
      endIndex += 1;
    }

    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = getVisibleRange(
    currentPage,
    noOfPages.length,
  );

  return (
    <div className="flex w-full items-center justify-center gap-x-2">
      <span
        className={`${currentPage === 1 ? "cursor-default opacity-0" : "cursor-pointer"} text-gray-500 hover:text-black`}
        onClick={() => selectedPageHandler(1)}
      >
        <TfiAngleDoubleLeft className="border-1 h-4 w-4" />
      </span>
      <span
        className={`${currentPage === 1 ? "cursor-default opacity-0" : "cursor-pointer"} text-gray-500 hover:text-black`}
        onClick={() => selectedPageHandler(Math.max(currentPage - 1, 1))}
      >
        <TfiAngleLeft className="border-1 h-4 w-4" />
      </span>

      {startIndex > 2 && (
        <span className="cursor-default text-gray-500">...</span>
      )}
      {noOfPages.slice(startIndex - 1, endIndex).map((_, i) => (
        <span
          className={`cursor-pointer px-1 text-lg font-medium ${
            currentPage === startIndex + i
              ? "font-semibold text-black"
              : "text-gray-500"
          }`}
          onClick={() => selectedPageHandler(startIndex + i)}
          key={i}
        >
          {startIndex + i}
        </span>
      ))}
      {endIndex < noOfPages.length - 1 && (
        <span className="cursor-default text-gray-500">...</span>
      )}

      <span
        className={` ${currentPage === noOfPages.length ? "cursor-default opacity-0" : "cursor-pointer"} text-gray-500 hover:text-black`}
        onClick={() =>
          selectedPageHandler(Math.min(currentPage + 1, noOfPages.length))
        }
      >
        <TfiAngleRight className="border-1 h-4 w-4" />
      </span>
      <span
        className={`${currentPage === noOfPages.length ? "cursor-default opacity-0" : "cursor-pointer"} text-gray-500 hover:text-black`}
        onClick={() => selectedPageHandler(noOfPages.length)}
      >
        <TfiAngleDoubleRight className="border-1 h-4 w-4" />
      </span>
    </div>
  );
}

export default Pagination;
