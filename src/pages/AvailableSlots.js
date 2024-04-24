// AdminPanel.js

import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Stack, Skeleton } from '@mui/material';
import { getAllAvailableSlots } from '../features/actions/availableSlots';

const AvailableSlots = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAvailableSlots());
  }, []);

  const { data, isLoading } = useSelector((state) => state.availableSlots);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Available slots
            </h3>
            <p className="text-gray-600 mt-2">
              This page is for handle Theater data by Create, View, Edit and
              Delete
            </p>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">THEATER NAME</th>
                <th className="py-3 px-6 text-center">START</th>
                <th className="py-3 px-6 text-center">END</th>
                <th className="py-3 px-6 text-center">THEATER PRICE</th>
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
                Array.isArray(data?.availableSlotsData) &&
                data?.availableSlotsData?.map(
                  (item, idx) =>
                    Array.isArray(item?.slots) &&
                    item?.slots?.map((item2) => {
                      return (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.theater}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item2?.start}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item2?.end}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item2?.theaterPrice}
                          </td>
                        </tr>
                      );
                    })
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AvailableSlots;
