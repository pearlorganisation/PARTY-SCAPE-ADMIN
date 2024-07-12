import { useEffect, useState } from 'react';

const Pagination = ({ searchParams, setSearchParams, totalPages }) => {
  const [pages, setPages] = useState(['1', '2', '3', , '...', '8', '9', '10']);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    let page = searchParams.get('page');
    if (page) {
      setSearchParams(`page=${currentPage}`);
    } else {
      setSearchParams('');
    }
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
