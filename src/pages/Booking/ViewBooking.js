import React, { useEffect, useRef, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Stack, Skeleton } from '@mui/material';
import {
  deleteBooking,
  fetchNextPageBookings,
  getAllBookings,
} from '../../features/actions/booking';
import ViewModalBooking from './ViewModalBooking';
import { MdOutlineFileDownload } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/Spinner';
const ViewBookings = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const { bookingData, isDeleted,isLoading,  totalPages } = useSelector(
    (state) => state.booking
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getBookings = useDebouncedCallback(() => {
    dispatch(getAllBookings({ filter, search, page: 1 }));
    setCurrentPage(2);
  }, 500);

  // This useEffect will run whenever the search, filter or currentPage changes.
  // It will call the getBookings function and update the URL parameters.
  useEffect(() => {
    if (!isFirstRender.current) {
      getBookings();
      setSearchParams({ filter, search });
    }
  }, [search, filter]);

  // This useEffect will run only on the first render.
  // It will call the getBookings function and update the URL parameters.
  useEffect(() => {
    dispatch(getAllBookings({ filter, search, page: 1 }));
    setSearchParams({ filter, search });
    isFirstRender.current = false;
    setCurrentPage(2);
  }, []);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllBookings({ filter, search, page: currentPage }));
    }
  }, [isDeleted]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState();

  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteBooking(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  const handleViewModal = (item) => {
    setShowViewModal(true);
    setViewData(item);
  };

  const handleAddBooking = () => {
    navigate('/createBooking');
  };

  const fetchNextPageData = () => {
    console.log('fetching next page data...');
    dispatch(fetchNextPageBookings({ filter, search, page: currentPage }));
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Bookings
            </h3>

            <p className="text-gray-600 mt-2">
              This page is for handle bookings by Create, View and Delete
            </p>
          </div>

          <div>
            <a
              href="
            https://api.partyscape.in/api/v1/bookings/sheet"
              target="_blank"
              className="flex justify-center items-center gap-1 px-4 py-2 bg-indigo-500 text-white font-medium rounded-md"
            >
              <MdOutlineFileDownload size={20} />
              Download
            </a>
          </div>
          <div className="bg-white rounded-lg p-1 px-4">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent outline-none"
              placeholder="Search"
            ></input>
            <SearchRoundedIcon />
          </div>
          <div>
            <input
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="p-1 px-4 rounded-lg outline-none"
              type="date"
            ></input>
          </div>
          <a
            onClick={handleAddBooking}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Booking
          </a>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg">
          <div className="w-full  text-sm text-left">
            <div className="bg-gray-50 text-gray-600 font-medium border-b flex justify-between overflow-x-auto no-scrollbar">
              <div className="py-3 text-center min-w-60 text-nowrap">
                Booking ID
              </div>
              <div className="py-3 text-center min-w-28 text-nowrap">Name</div>
              <div className="py-3 text-center min-w-34 text-nowrap">Date</div>
              <div className="py-3 text-center min-w-48 text-nowrap">
                Booked Slot
              </div>
              <div className="py-3 text-center min-w-28 text-nowrap">
                Theater Name
              </div>
              <div className="py-3 text-center min-w-60 text-nowrap">
                Actions
              </div>
            </div>
              { bookingData && Array.isArray(bookingData) && bookingData.length || !isLoading ? (
                <>
                <InfiniteScroll
                  className=" flex flex-col no-scrollbar"
                  dataLength={bookingData?.length || 0}
                  next={fetchNextPageData}
                  hasMore={totalPages >= currentPage}
                  loader={
                    <div className="w-full flex justify-center my-5">
                      <Spinner />
                    </div>
                  }
                  height={ totalPages > 1 ? 500 : 0 }
                >
                  {bookingData?.map((item, idx) => (
                    <div className="flex justify-between border-b w-full" key={idx}>
                      <div className="text-center py-4 whitespace-nowrap min-w-60">
                        {item?.bookingId}
                      </div>
                      <div className="text-center py-4 whitespace-nowrap min-w-28">
                        {item?.bookedBy?.name}
                      </div>
                      <div className="text-center py-4 whitespace-nowrap min-w-34">
                        {item?.bookedDate}
                      </div>
                      <div className="text-center py-4 whitespace-nowrap min-w-48">
                        {item?.bookedSlot}
                      </div>
                      <div className="text-center py-4 whitespace-nowrap min-w-28">
                        {item?.theater?.theaterName}
                      </div>

                      <div className=" justify-center flex gap-2 whitespace-nowrap min-w-60">
                        <button
                          onClick={() => {
                            handleViewModal(item);
                          }}
                          className="py-2 leading-none font-semibold text-blue-500 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            // navigate(`/updateBooking/${item?._id}`, {
                            //   state: item,
                            // });
                          }}
                          className="py-2 flex gap-1 leading-none items-center font-semibold text-green-500 hover:text-green-400 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit <FiEdit />
                        </button>
                        <button
                          onClick={() => {
                            handleModal(item?._id);
                          }}
                          className="py-2 leading-none px- font-semibold text-red-500 hover:text-red-600 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
                {bookingData.length === 0 && (
                  <p className="text-center py-4 text-gray-500">
                    No results found. Please try a different search or filter.
                  </p>
                )}
                </>
              ) : (
                  <div colSpan="6" className="text-center px-6 py-8">
                    <Stack spacing={4}>
                      <Skeleton variant="rounded" height={30} />
                      <Skeleton variant="rounded" height={25} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                    </Stack>
                  </div>
              )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
      {showViewModal && (
        <ViewModalBooking setModal={setShowViewModal} viewData={viewData} />
      )}
    </>
  );
};

export default ViewBookings;
