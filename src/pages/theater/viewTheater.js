// AdminPanel.js

import React from 'react';
import Delete from '../../components/Delete';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { useState } from 'react';

import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import icons from React Icons library
import { deleteTheater, getAllTheaters } from '../../features/actions/theater';

const ViewTheater = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTheaters());
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  const { theaterData, isLoading } = useSelector((state) => state.theater);
  console.log(theaterData, 'theaterData');
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col gap-4">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Theaters
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              href="javascript:void(0)"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Theater
            </a>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-500 dark:text-white text-center">
            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-500 dark:text-red">
              <tr>
                <th scope="col" className="py-3">
                  S.No
                </th>
                <th scope="col" className="px-16 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Features
                </th>
                <th scope="col" colSpan={2} className="py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <p className="text-lg font-bold ">Loading</p>
              ) : (
                theaterData?.map((item, idx) => (
                  <tr
                    className="odd:bg-white even:bg-[#E6E6E6] border-b dark:odd:bg-[#2f333b] dark:even:bg-[#272c38] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={idx}
                  >
                    <td className="px-6 py-4 font-semibold text-[#000] dark:text-white">
                      {idx+1}
                    </td>
                    <td className="p-4 flex justify-center">
                      <img
                        src={item?.logo?.path}
                        className="w-24 md:w-32 max-w-full max-h-full"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#000] dark:text-white">
                      {item?.theaterName}
                    </td>
                    <td
                      className="px-2 py-4 text-[#000] font-semibold dark:text-white"
                      title={item?.features}
                    >
                      {item?.features[0].slice(0, 50)}...
                    </td>
                    <td className=" py-4">
                      <button
                        className="font-medium px-4 py-1 w-full rounded bg-blue-600 hover:bg-blue-800 text-white dark:text-white"
                        onClick={() => {
                          navigate('/editTheater', { state: item });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="pr-1 py-4">
                      <button
                        href="#"
                        className="font-medium px-3 py-1 w-full rounded bg-red-600 hover:bg-red-800 text-white dark:text-white cursor-pointer"
                        onClick={() => {
                          handleModal(item?._id);
                        }}
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
    </>
  );
};

export default ViewTheater;
