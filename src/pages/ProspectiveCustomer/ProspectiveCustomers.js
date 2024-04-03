import React from 'react';
import Delete from '../../components/Delete';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Stack, Skeleton } from '@mui/material';


export const ProspectiveCustomers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();

 

  const handleDelete = () => {
    dispatch(deleteCake(id));
    setShowDeleteModal(false);
    setId('');
  };

  const handleModal = (ID) => {
    setShowDeleteModal(true);
    setId(ID);
  };

//   useEffect(() => {
//     dispatch(getAllCakes());
//   }, []);

//   useEffect(() => {
//     if (isDeleted) {
//       dispatch(getAllCakes());
//     }
//   }, [isDeleted]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage Prospective Customers
            </h3>
            <p className="text-gray-600 mt-2">
              People who have shown interest in the service but not yet made a purchase decision.
            </p>
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
              {
              true ? 
              (
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
                // Array.isArray(cakeData) &&
                // cakeData.map((item, idx) => (
                    // key={idx}
                <tr >
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
                            <div>Price: {item2?.price}</div>
                          </div>
                        ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.isEggless ? 'True' : 'False'}
                    </td>
                    <td className="flex px-6 py-4 space-x-5 items-center">
                      <a
                        onClick={()=>navigate(`/updateCake/${item.id}`,{state:item})}
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
                // ))
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
