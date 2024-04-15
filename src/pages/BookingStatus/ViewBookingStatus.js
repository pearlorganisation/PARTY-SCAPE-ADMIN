import React, { useEffect } from 'react'
import { Stack,Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBookings } from '../../features/actions/booking';

const ViewBookingStatus = () => {
    const { bookingData, isLoading} = useSelector((state) => state.booking);
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
   }, []);

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
       
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Booking ID</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Booked Slot</th>
              <th className="py-3 px-6">Theater Name</th>
              <th className="py-3 px-6">Status</th>
             
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
          {isLoading ? (
          <tr>
          <td colSpan="6" className="text-center px-6 py-8">
            <Stack spacing={4}>
              <Skeleton variant="rounded" height={30} />
              <Skeleton variant="rounded" height={25}/>
              <Skeleton variant="rounded" height={20}/>
              <Skeleton variant="rounded" height={20}/>
              <Skeleton variant="rounded" height={20}/>
            </Stack>
          </td>
        </tr>
        ) : (
          
             Array.isArray(bookingData) && bookingData?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{item?._id}</td>
                
                  <td className="px-6 py-4 whitespace-nowrap">
                  {item?.bookedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {item?.bookedSlot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {item?.theater.theaterName}
                  </td>
                  
                  
                </tr>
              ))
            
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default ViewBookingStatus