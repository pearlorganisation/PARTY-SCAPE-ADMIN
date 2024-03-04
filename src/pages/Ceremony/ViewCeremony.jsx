import React from 'react';
import Delete from '../../components/Delete';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { useState } from 'react';

import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import icons from React Icons library
import { deleteCake, getAllCakes } from '../../features/actions/cake';

export const tableItems = [
  {
      "id":"1",
      "name":"Jason",
      "photo":"https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"2",
      "name":"Jack",
      "photo":"https://randomuser.me/api/portraits/men/86.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"3",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"4",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"5",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"6",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"7",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"8",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"9",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"10",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  },
  {
      "id":"11",
      "name":"Jackson",
      "photo":"https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      "price":"1000",
      "otherDetails":
        [{"name":"john"},{"name":"cena"}]
      
  }
];
export const ViewCeremony = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCakes());
    
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState();
  
  const handleAddCake = () => {
    navigate('/createCeremony');
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
  const { cakeData, isLoading } = useSelector((state) => state.cake);
  
  const [pages, setPages] = useState(["1", "2", "3", , "...", "8", "9", "10",])
  const [currentPage, setCurrentPage] = useState("1")

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Manage ceremony
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a
             onClick={handleAddCake}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add Ceremony
            </a>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Logo</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Other details</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className='px-5 py-3'><img src={item.photo} className="w-10 h-10 rounded-full" /></td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap"> {item.otherDetails.map((detail, index) => (
    <div key={index}>{detail.name}</div>
  ))}</td>
                <td className='flex px-5 py-3 space-x-5 items-center'>
                
                <a href={`/updateCeremony/${item.id}`} className='py-2 text-green-600 font-medium'>Edit</a>
                <a href='#' className='py-2 text-red-500 font-medium'>Delete</a>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <Delete setModal={setShowDeleteModal} handleDelete={handleDelete} />
      )}
      
      {/* // pagination  */}

     <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="hidden items-center justify-between sm:flex" aria-label="Pagination">
                <a href="javascript:void(0)" className="hover:text-indigo-600 flex items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
                    </svg>
                    Previous
                </a>
                <ul className="flex items-center gap-1">
                    {
                        pages.map((item, idx) => (
                            <li key={item} className="text-sm">
                                {
                                    item == "..." ? (
                                        <div>
                                            {item}
                                        </div>
                                    ) : (

                                        <a href="javascript:void(0)" aria-current={currentPage == item ? "page" : false} className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage == item ? "bg-indigo-50 text-indigo-600 font-medium" : ""}`}>
                                            {item}
                                        </a>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
                <a href="javascript:void(0)" className="hover:text-indigo-600 flex items-center gap-x-2">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>
            {/* On mobile version */}
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
                <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</a>
                <div className="font-medium">
                    Page {currentPage} of {pages.length}
                </div>
                <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</a>
            </div>
        </div>
    </>
  )
}
