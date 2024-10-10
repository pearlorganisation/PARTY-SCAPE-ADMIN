import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTheaters } from '../../features/actions/theater';

import { getAllCakes } from '../../features/actions/cake';
import { getAllCeremonyType } from '../../features/actions/ceremonyType';
import { useForm, Controller } from 'react-hook-form';
import { instance } from '../../services/axiosInterceptor';
import { offlineBooking } from '../../features/actions/booking';
import BookingDetailsModal from './BookingDetailsModal';
import { createPortal } from 'react-dom';

const CreateBooking = () => {
  const AddOnsData = [
    {
      _id: 1,
      img: 'https://images.unsplash.com/photo-1481456384069-0effc539ab7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA1fHxzbW9rZSUyMGVudHJ5fGVufDB8fDB8fHww',
      title: 'Smoke Entry',
      price: 399,
    },
    {
      _id: 2,
      img: 'https://images.unsplash.com/photo-1567857171318-944337972f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJ1YmJsZSUyMGVudHJ5fGVufDB8fDB8fHww',
      title: 'Bubble Entry',
      price: 199,
    },
    {
      _id: 5,
      img: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fFBob3RvJTIwY2xpcHBpbmd8ZW58MHx8MHx8fDA%3D',
      title: 'PhotoShoot(20 Mins)',
      price: 349,
    },
    {
      _id: 3,
      img: 'https://images.unsplash.com/photo-1655272190720-858f8e77fe92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fExFRCUyMCUyMG51bWJlcnxlbnwwfHwwfHx8MA%3D%3D',
      title: 'LED Age Number',
      price: 99,
    },
    {
      _id: 4,
      img: '/photoClipping.png',
      title: 'Photo Clippings(18 Pics)',
      price: 399,
    },

    {
      _id: 6,
      img: 'https://images.unsplash.com/photo-1578850141295-7fb35c301da6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHN0YWdlJTIwZmlyZXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Cold Fire Entry(for 2 shots)',
      price: 499,
    },
    {
      _id: 7,
      img: 'https://images.unsplash.com/photo-1578850141295-7fb35c301da6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHN0YWdlJTIwZmlyZXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Cold Fire Entry(for 4 shots)',
      price: 899,
    },
    {
      _id: 8,
      img: 'https://images.unsplash.com/photo-1578850141295-7fb35c301da6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHN0YWdlJTIwZmlyZXxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Cold Fire Entry(for 6 shots)',
      price: 1199,
    },
  ];

  const { register, handleSubmit, reset, control } = useForm({});

  const [theater, setSelectedTheater] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [finalTheater, setFinalTheater] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookedFilterData, setBookedFilterData] = useState([]);
  const [date, setDate] = useState(null);
  // const []
  const [otherDetails, setOtherDetails] = useState([]);
  const [cake, selectedCake] = useState(null);

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

  const onSubmit = (data) => {
    let newBookingPrice = bookingPrice;
    const { bookedSlot, addOns, quantity, cake } = data;

    if (quantity) {
      let tempData = JSON.parse(quantity);
      console.log(quantity);
      newBookingPrice += Number(tempData?.price);
    }

    addOns &&
      Array.isArray(addOns) &&
      addOns?.length >= 1 &&
      addOns?.forEach((it) => {
        console.log(newBookingPrice, 'new booking price');
        newBookingPrice += it?.value?.price;
      });

    setBookingPrice(newBookingPrice);
    // dispatch(offlineBooking(data));
    setBookingData(data);
    setBookingModal(true);
  };

  useEffect(() => {
    let filterData =
      Array.isArray(theaterData) &&
      theaterData?.find((i) => {
        return i?._id === theater?.value;
      });

    setFinalTheater(filterData);

    instance
      .get(`theater/${filterData?.theaterName}`)
      .then((data) => setBookedSlots(data?.data?.bookedSlots))
      .catch((e) => {
        console.log(e?.message);
      });
  }, [theater]);

  useEffect(() => {
    let newDate = new Date(date);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month = monthNames[newDate?.getMonth()];
    const day = newDate?.getDate();
    const year = newDate?.getFullYear();
    const formattedDate = month + ' ' + day + ', ' + year;
    const filterDate =
      Array.isArray(bookedSlots) &&
      bookedSlots?.find((item) => {
        return item?.date === formattedDate;
      });

    setBookedFilterData(filterDate?.slots);
  }, [date]);

  return (
    <div>
      <div className="bg-gray-800">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Create Booking details
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
          <form
            className="space-y-6 mx-8 sm:mx-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-2xl">Booking Details</div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Theater</label>
                <Controller
                  control={control}
                  name="theater"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={theaterData?.map((item) => ({
                        value: item?._id,
                        label: item?.theaterName,
                      }))}
                      value={value || null}
                      onChange={(val) => {
                        onChange(val);

                        setSelectedTheater(val);
                      }}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label className="font-medium">Slots</label>

                {date && finalTheater ? (
                  <Controller
                    control={control}
                    name="bookedSlot"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={
                          finalTheater &&
                          finalTheater?.slots?.map((item) => {
                            const tim = `${item?.start} - ${item?.end}`;

                            if (bookedFilterData?.includes(tim)) {
                              return {
                                value: item?._id,
                                label: tim,
                                isdisabled: true,
                              };
                            }
                            return {
                              value: {
                                id: item?._id,
                                price: item?.offerPrice,
                              },
                              label: tim,
                            };
                          })
                        }
                        value={value || null}
                        onChange={(val) => {
                          onChange(val);

                          setBookingPrice(bookingPrice + val?.value?.price);
                        }}
                        isOptionDisabled={(option) => option.isdisabled}
                      />
                    )}
                  />
                ) : (
                  <p>Please select theater and date first!!</p>
                )}
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full flex flex-col">
                <label className="font-medium mb-2">Date</label>

                {theater ? (
                  <input
                    type="date"
                    {...register('date', { required: 'date is required' })}
                    onChange={(e) => {
                      setDate(e?.target?.value);
                    }}
                    className="border p-1.5 border-slate-300 rounded-lg outline-none"
                  />
                ) : (
                  <p>Please select theater first!!</p>
                )}
              </div>
              <div className="w-full">
                <label className="font-medium">Ceremony Type</label>

                <Controller
                  control={control}
                  name="ceremonyType"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={dataList?.map((item) => {
                        return { value: item?._id, label: item?.type };
                      })}
                      value={value || null}
                      onChange={(val) => {
                        onChange(val);

                        dataList
                          .filter((item) => item?._id === val?.value)
                          .forEach((it) => {
                            setOtherDetails(it?.otherDetails);
                          });
                      }}
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
                  )}
                />
              </div>
            </div>
            <div>
              {otherDetails?.length > 0 &&
                otherDetails?.map((item, ind) => {
                  return (
                    <div className="w-full">
                      <label className="font-medium">{item?.label}</label>
                      <input
                        {...register(`otherDetails.${ind}`, {
                          required: 'Phone number is required!!',
                        })}
                        type="text"
                        className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                      />
                    </div>
                  );
                })}
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Cake</label>

                <Controller
                  control={control}
                  name="cake"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      isClearable
                      options={cakeData.map((item) => {
                        return {
                          value: { id: item?._id, price: item?.price },
                          label: item?.name,
                        };
                      })}
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
                      value={value || null}
                      onChange={(val) => {
                        onChange(val);
                        selectedCake(val);
                      }}
                    />
                  )}
                />

                {cake && (
                  <div className="flex gap-4 pt-1 pl-1 divide-x-2">
                    <div className="space-x-2">
                      <label className="font-semibold">Eggless</label>
                      <input type="checkbox" {...register('eggless')} />
                    </div>
                    <div className="flex gap-2 px-2">
                      <div className="font-semibold">Quantity</div>

                      {cake?.value?.price?.map((it) => {
                        let tempData = JSON.stringify({
                          weight: it?.weight,
                          price: it?.price,
                        });
                        return (
                          <label>
                            {it?.weight}
                            <input
                              type="radio"
                              value={tempData}
                              {...register('quantity')}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full">
                <label className="font-medium">Add Ons</label>

                <Controller
                  control={control}
                  name="addOns"
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      options={AddOnsData?.map((item) => ({
                        value: { title: item?.title, price: item?.price },
                        label: item?.title,
                      }))}
                      value={value || null}
                      onChange={(val) => {
                        onChange(val);
                      }}
                      isMulti
                    />
                  )}
                />
              </div>
            </div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-[48%]">
                <label className="font-medium">Total People</label>

                {finalTheater ? (
                  <Controller
                    control={control}
                    name="totalPeople"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        options={Array(finalTheater?.occupancyDetails?.maxPaid)
                          .fill(0)
                          .map((item, ind) => {
                            return { value: ind + 1, label: ind + 1 };
                          })}
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
                        value={value || null}
                        onChange={(val) => {
                          onChange(val);
                        }}
                      />
                    )}
                  />
                ) : (
                  <p>Please select theater first!!</p>
                )}
              </div>
            </div>

            <div className="text-2xl">Booked By</div>
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
              <div className="w-full">
                <label className="font-medium">Name</label>
                <input
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  type="text"
                  className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                />
              </div>
              <div className="w-full">
                <label className="font-medium">Email</label>
                <input
                  {...register('email', {
                    required: 'Theater Name is required',
                  })}
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
                  {...register('whatsappNumber', {
                    required: 'Phone number is required!!',
                  })}
                  className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <input
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            type="submit" value="Submit" />
          </form>
        </div>
      </div>

      {bookingModal &&
        createPortal(
          <BookingDetailsModal
            bookingData={bookingData}
            bookingPrice={bookingPrice}
          />,
          document.body
        )}
    </div>
  );
};

export default CreateBooking;
