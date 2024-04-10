import React from 'react';
import Delete from '../../components/Delete';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Stack, Skeleton } from '@mui/material';
import { deleteCake, getAllCakes } from '../../features/actions/cake';

export const ViewCake = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cakeData, isLoading, isDeleted } = useSelector((state) => state.cake);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();

  const handleAddCake = () => {
    navigate('/createCake');
  };

  const handleDelete = () => {
    dispatch(deleteCake(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

  useEffect(() => {
    dispatch(getAllCakes());
  }, []);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllCakes());
    }
  }, [isDeleted]);

  return (
    <>
      <div className="max-w-screen-xl ">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage cakes
            </h3>
            <p className="text-gray-600 mt-2">
            This page is for handle cakes by Create, Update and Delete
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
              onClick={handleAddCake}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Cake
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Cake Name</th>
                <th className="py-3 px-6">Logo</th>
                <th className="py-3 px-6">Weight & Price</th>
               
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
                Array.isArray(cakeData) &&
                cakeData.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.name}
                    </td>
                    <td className="px-5 py-3">
                      <img
                        src={item?.image}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {Array.isArray(item?.price) &&
                        item.price.map((item2, idx) => (
                          <div className="flex border justify-between border-slate-300 rounded-lg p-2 gap-2">
                            <div>Weight: {item2?.weight}</div>
                            <div>Regular Price: {item2?.price}</div>
                            <div>Eggless Price: {item2?.egglessPrice}</div>
                          </div>
                        ))}
                    </td>
                  
                    <td className="flex px-6 py-4 space-x-5 items-center">
                      <a
                        onClick={()=>navigate(`/updateCake/${item._id}`,{state:item})}
                        className="py-2 text-green-600 font-medium"
                      >
                        Edit
                      </a>
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
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
    </>
  );
};
