const TablePagination = (props) => {
    const { onPageChange, totalPage, currentPage } = props;

    const onNext = (e) => {
        e.preventDefault();
        onPageChange(currentPage + 1);
    };

    const onPrevious = (e) => {
        e.preventDefault();
        onPageChange(currentPage - 1);
    };

    return (
        <ul className={`flex border rounded-lg overflow-hidden divide-x`}>
            <li>
                <button
                    disabled={currentPage === 1}
                    onClick={onPrevious}
                    className="flex items-center justify-center w-8 h-8 text-primary disabled:text-gray-400 disabled:hover:bg-transparent transition-colors duration-150 bg-white focus:shadow-outline hover:bg-primary/10"
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
            <li>
                <p
                    className={`w-8 h-8 flex items-center justify-center transition-all font-medium`}
                >
                    {currentPage}
                </p>
            </li>
            <li>
                <button
                    disabled={currentPage === totalPage}
                    onClick={onNext}
                    className="flex items-center justify-center w-8 h-8 text-primary disabled:text-gray-400 disabled:hover:bg-transparent transition-colors duration-150 bg-white focus:shadow-outline hover:bg-primary/10"
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
