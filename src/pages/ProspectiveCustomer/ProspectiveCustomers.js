import React, { useRef } from 'react';
import Delete from '../../components/Delete';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Stack, Skeleton } from '@mui/material';
import {
  deleteProspectiveCustomer,
  getAllProspectiveCustomers,
} from '../../features/actions/prospectiveCustomer';
import { MdOutlineFileDownload } from 'react-icons/md';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';


export const ProspectiveCustomers = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const dispatch = useDispatch();

  const { prospectiveCustomerData, isLoading, isDeleted, totalPages } =
    useSelector((state) => state.prospectiveCustomer);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();

  const [currentPage, setCurrentPage] = useState(
    () => parseInt(searchParams.get('page')) || 1
  );

  const handleDelete = () => {
    dispatch(deleteProspectiveCustomer(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  useEffect(() => {
    dispatch(getAllProspectiveCustomers({ page:currentPage }));
    setSearchParams({ page: currentPage });
    isFirstRender.current = false;
  }, []);

  const getProspects = useDebouncedCallback(() => {
    dispatch(getAllProspectiveCustomers({ page: currentPage }));
  }, 500);

  useEffect(() => {
    if (!isFirstRender.current) {
      getProspects();
      setSearchParams({ page: currentPage });
    }
  }, [currentPage]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllProspectiveCustomers());
    }
  }, [isDeleted]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Prospective Customers
            </h3>
            <p className="text-gray-600 mt-2">
              People who have shown interest in the service but not yet made a
              purchase decision.
            </p>
          </div>

          <div>
            <a
              href="
            https://api.partyscape.co.in/api/v1/prospectiveCustomers/sheet"
              target="_blank"
              className="flex justify-center items-center gap-1 px-4 py-2 bg-indigo-500 text-white font-medium rounded-md"
            >
              <MdOutlineFileDownload size={20} />
              Download
            </a>
          </div>
          <div>
            <button>click here to download the latest wesites</button>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone Number</th>

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
                Array?.isArray(prospectiveCustomerData) &&
                prospectiveCustomerData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.name}
                    </td>
                    <td className="px-5 py-3">{item?.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.number}
                    </td>

                    <td className="flex px-6 py-4 space-x-5 items-center">
                      <a
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="px-6 py-7 text-red-500 font-medium"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
    </>
  );
};
