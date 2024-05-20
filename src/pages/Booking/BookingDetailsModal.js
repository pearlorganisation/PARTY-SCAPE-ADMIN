import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { offlineBooking } from '../../features/actions/booking';
import { useNavigate } from 'react-router';

const BookingDetailsModal = ({ bookingData, bookingPrice }) => {
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successData, isLoading } = useSelector((state) => state?.booking);

  const handleSumit = () => {
    console.log(bookingPrice, 'bookingPriceee123');
    dispatch(offlineBooking({ ...bookingData, bookingPrice }));
  };
  useEffect(() => {
    console.log('successData', successData?.status);
    if (successData?.status) {
      navigate('/bookings');
    }
  }, [successData]);
  return (
    <div
      className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
      aria-labelledby="header-3a content-3a"
      aria-modal="true"
      tabindex="-1"
      role="dialog"
    >
      {/*    <!-- Modal --> */}
      <div
        ref={wrapperRef}
        className="flex max-h-[90vh] w-11/12 max-w-2xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
        id="modal"
        role="document"
      >
        {/*        <!-- Modal header --> */}
        <div class="p-3 space-y-2 max-w-4xl w-full mx-auto">
          <div className="flex justify-between items-start">
            <p class="text-lg font-medium">Preview</p>
            {isLoading ? (
              <button
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Loading...
              </button>
            ) : (
              <button
                disabled={isLoading}
                onClick={handleSumit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            )}
          </div>
          <div class="w-full overflow-x-auto">
            <table
              class="w-overflow-x-auto w-full rounded text-left"
              cellspacing="0"
            >
              <tbody class="space-y-1">
                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Theater
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.theater?.label}
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Slot
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.bookedSlot?.label}
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Cake
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.cake?.label}
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Ceremony
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.ceremonyType?.label}
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Booking Date
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.date}
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Total people
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.totalPeople?.label}
                  </td>
                </tr>
                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Name
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.name}
                  </td>
                </tr>
                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    email
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.email}
                  </td>
                </tr>
                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Whatsapp Number
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.whatsappNumber}
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Add Ons
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingData?.addOns?.map((it, i) => {
                      if (i < bookingData?.addOns.length - 1) {
                        return it?.label + ',';
                      }
                      return it?.label;
                    })}
                  </td>
                </tr>
                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Total Price
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingPrice}
                  </td>
                </tr>
                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Advance Payment
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    750
                  </td>
                </tr>

                <tr class="flex ">
                  <td
                    scope="col"
                    class="flex h-12 items-center justify-start bg-slate-100 stroke-slate-700 px-6 text-sm font-medium text-slate-700 w-96"
                  >
                    Remaining Payment
                  </td>
                  <td class="flex h-12 w-full items-center justify-start border-slate-200 bg-slate-50 stroke-slate-500 px-6 text-sm text-slate-500 transition duration-300">
                    {bookingPrice - 750}
                  </td>
                </tr>
              </tbody>
              <div>
                You will be charged 700 rupees plus a convenience fee of 50
                rupees. The remaining amount will be collected during the event.
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
