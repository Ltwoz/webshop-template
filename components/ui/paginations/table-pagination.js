import { DOTS, usePagination } from "../../../utils/hooks/usePagination";

const TablePagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // If there are less than 2 times in pagination range we shall not render the component
    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={`flex gap-1`}>
            {/* Left navigation arrow */}
            <li>
                <button
                    disabled={currentPage === 1}
                    onClick={onPrevious}
                    className="flex items-center justify-center w-9 h-9 text-primary disabled:text-gray-400 disabled:hover:bg-transparent transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
            </li>
            {paginationRange.map((pageNumber, i) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return (
                        <li key={i} className="pagination-item dots">
                            &#8230;
                        </li>
                    );
                }

                // Render our Page Pills
                return (
                    <li key={i}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`w-9 h-9 transition-all rounded-full hover:bg-primary/20 ${
                                pageNumber === currentPage ? "bg-primary" : ""
                            }`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li>
                <button
                    disabled={currentPage === lastPage}
                    onClick={onNext}
                    className="flex items-center justify-center w-9 h-9 text-primary disabled:text-gray-400 disabled:hover:bg-transparent transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </li>
        </ul>
    );
};

export default TablePagination;
