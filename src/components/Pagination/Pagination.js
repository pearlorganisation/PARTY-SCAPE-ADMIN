import { useEffect, useState } from 'react';

const Pagination = ({ searchParams, setSearchParams, totalPages }) => {
  let page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(page ?? 1);
  useEffect(() => {
    setSearchParams(`page=${currentPage}`);
  }, [currentPage]);

  return (
    <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
        <button
          onClick={() => {
            setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1);
          }}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => {
            setCurrentPage(
              currentPage === totalPages ? currentPage : currentPage + 1
            );
          }}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
