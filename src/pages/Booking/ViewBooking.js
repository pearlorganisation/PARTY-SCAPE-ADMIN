import React, { useEffect, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Stack, Skeleton } from '@mui/material';
import { deleteBooking, getAllBookings } from '../../features/actions/booking';
import ViewModalBooking from './ViewModalBooking';
import Debouncing from '../../utils/Debouncing';
import axios from 'axios';
import { instance } from '../../services/axiosInterceptor';
import { MdOutlineFileDownload } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

const ViewBookings = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const { bookingData, isLoading, isDeleted } = useSelector(
    (state) => state.booking
  );
  const navigate = useNavigate();

  // const handleDownload = async () => {
  //   instance
  //     .get('/bookings/sheet')
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const dispatch = useDispatch();

  const getBookings = () => {
    dispatch(getAllBookings({ filter, search }));
  };

  useEffect(() => {
    setSearch('');
    let fun = Debouncing(getBookings);
    fun();
  }, [filter]);

  useEffect(() => {
    setFilter('');
    let fun = Debouncing(getBookings);
    fun();
  }, [search]);

  useEffect(() => {
    dispatch(getAllBookings({ filter, search }));
  }, []);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllBookings({ filter, search }));
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
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Booking ID</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Booked Slot</th>
                <th className="py-3 px-6">Theater Name</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center px-6 py-8">
                    <Stack spacing={4}>
                      <Skeleton variant="rounded" height={30} />
                      <Skeleton variant="rounded" height={25} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                      <Skeleton variant="rounded" height={20} />
                    </Stack>
                  </td>
                </tr>
              ) : (
                Array.isArray(bookingData) &&
                bookingData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.bookedBy.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.bookedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.bookedSlot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.theater.theaterName}
                    </td>

                    <td className=" px-6 flex gap-2 whitespace-nowrap">
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
                          navigate(`/updateBooking/${item?._id}`, {
                            state: item,
                          });
                        }}
                        className="py-2 flex gap-1 leading-none px- font-semibold text-green-500 hover:text-green-400 duration-150 hover:bg-gray-50 rounded-lg"
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
