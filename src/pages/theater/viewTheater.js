// AdminPanel.js

import React, { useEffect, useState } from 'react';
import Delete from '../../components/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Stack, Skeleton } from '@mui/material';
import { deleteTheater, getAllTheaters } from '../../features/actions/theater';
import ViewModalTheater from './ViewModalTheater';

const ViewTheater = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theaterData, isLoading, isDeleted } = useSelector(
    (state) => state.theater
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAllTheaters());
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllTheaters());
    }
  }, [isDeleted]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState();

  const [id, setId] = useState();
  const handleDelete = () => {
    dispatch(deleteTheater(id));
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
  const handleAddTheater = () => {
    navigate('/createTheater');
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Theaters
            </h3>
            <p className="text-gray-600 mt-2">
              This page is for handle Theater data by Create, View, Edit and
              Delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              onClick={handleAddTheater}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add theater
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6 text-center">Theater Name</th>
                <th className="py-3 px-6 text-center">Logo</th>
                <th className="py-3 px-6 text-center">Features</th>
                <th className="py-3 px-6 text-center ">Actions</th>
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
                Array.isArray(theaterData) &&
                theaterData?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.theaterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img className="rounded-lg" src={`${item?.logo?.path}`} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.features[0]?.slice(0, 69)}...
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <a
                        onClick={() => {
                          handleViewModal(item);
                        }}
                        className="py-2 px-3 font-medium text-blue-500 hover:text-blue-600 duration-150 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        View
                      </a>
                      <a
                        onClick={() =>
                          navigate(`/updateTheater/${item._id}`, {
                            state: item,
                          })
                        }
                        className="py-2 px-3 font-medium text-green-600 hover:text-green-500 duration-150 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => {
                          handleModal(item?._id);
                        }}
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg cursor-pointer"
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
        <ViewModalTheater setModal={setShowViewModal} viewData={viewData} />
      )}
    </>
  );
};

export default ViewTheater;
