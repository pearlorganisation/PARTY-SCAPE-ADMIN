import React, { useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTheaters } from '../../features/actions/theater';
import { getAllCakes } from '../../features/actions/cake';
import { getAllCeremonyType } from '../../features/actions/ceremonyType';

const CreateBooking = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTheaters());
    dispatch(getAllCakes());
    dispatch(getAllCeremonyType());
  }, []);

  const { theaterData, isLoading, errorMessage } = useSelector(
    (state) => state.theater
  );

  const { cakeData } = useSelector((state) => state.cake);

  const { dataList } = useSelector((state) => state.ceremonyType);

  return (
    <div>
      <div className="bg-gray-800">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Create Booking details
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
          <form className="space-y-6 mx-8 sm:mx-2">
            <div className="text-2xl">Booking Details</div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Theater</label>

                <Select
                  options={
                    !isLoading &&
                    Array.isArray(theaterData) &&
                    theaterData?.length >= 1 &&
                    theaterData.map((item) => {
                      return { value: item?._id, label: item?.type };
                    })
                  }
                  className="mt-2 "
                  placeholder="Choose Theater"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: '1px solid #CBD5E1', // Set custom border style
                      borderRadius: '0.400rem', // Set custom border radius
                      height: '40px', // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#9CA3AF', // Set custom placeholder color
                    }),
                  }}
                />
              </div>
              <div className="w-full">
                <label className="font-medium">Slots</label>

                <Select
                  options={
                    Array.isArray(cakeData) &&
                    cakeData?.length >= 1 &&
                    cakeData.map((item) => {
                      return { value: item?._id, label: item?.name };
                    })
                  }
                  className="mt-2 "
                  placeholder="Choose Slots"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: '1px solid #CBD5E1', // Set custom border style
                      borderRadius: '0.400rem', // Set custom border radius
                      height: '40px', // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#9CA3AF', // Set custom placeholder color
                    }),
                  }}
                />
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full flex flex-col">
                <label className="font-medium mb-2">Date</label>

                <input
                  type="date"
                  className="border p-1.5 border-slate-300 rounded-lg outline-none"
                />
              </div>
              <div className="w-full">
                <label className="font-medium">Ceremony Type</label>

                <Select
                  options={
                    Array.isArray(dataList) &&
                    dataList?.length >= 1 &&
                    dataList.map((item) => {
                      return { value: item?._id, label: item?.ceremonyType };
                    })
                  }
                  className="mt-2 "
                  placeholder="Choose Ceremony Type"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: '1px solid #CBD5E1', // Set custom border style
                      borderRadius: '0.400rem', // Set custom border radius
                      height: '40px', // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#9CA3AF', // Set custom placeholder color
                    }),
                  }}
                />
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Cake</label>

                <Select
                  options={
                    Array.isArray(cakeData) &&
                    cakeData?.length >= 1 &&
                    cakeData.map((item) => {
                      return { value: item?._id, label: item?.name };
                    })
                  }
                  className="mt-2 "
                  placeholder="Choose Cake"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: '1px solid #CBD5E1', // Set custom border style
                      borderRadius: '0.400rem', // Set custom border radius
                      height: '40px', // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#9CA3AF', // Set custom placeholder color
                    }),
                  }}
                />
              </div>
              <div className="w-full">
                <label className="font-medium">Add Ons</label>

                <Select
                  options={[
                    { value: true, label: 'True' },
                    { value: false, label: 'False' },
                  ]}
                  className="mt-2 "
                  placeholder="Choose Add Ons"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: '1px solid #CBD5E1', // Set custom border style
                      borderRadius: '0.400rem', // Set custom border radius
                      height: '40px', // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#9CA3AF', // Set custom placeholder color
                    }),
                  }}
                />
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-[48%]">
                <label className="font-medium">Total People</label>

                <Select
                  options={[
                    { value: true, label: 'True' },
                    { value: false, label: 'False' },
                  ]}
                  className="mt-2 "
                  placeholder="Choose Total People"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: '1px solid #CBD5E1', // Set custom border style
                      borderRadius: '0.400rem', // Set custom border radius
                      height: '40px', // Add height here
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#9CA3AF', // Set custom placeholder color
                    }),
                  }}
                />
              </div>
            </div>

            <div className="text-2xl">Booked By</div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                />
              </div>
              <div className="w-full">
                <label className="font-medium">Email</label>
                <input
                  type="text"
                  className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-[48%]">
                <label className="font-medium">Phone Number</label>
                <input
                  type="text"
                  className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
