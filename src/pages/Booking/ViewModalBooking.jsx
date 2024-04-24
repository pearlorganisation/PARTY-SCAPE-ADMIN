import React from 'react';
import { useSelector } from 'react-redux';

export default function ViewModalBooking({ setModal, viewData }) {
  const updatedAtDate = viewData?.createdAt
    ? new Date(viewData?.createdAt)
    : null;
  const formattedDate = updatedAtDate
    ? updatedAtDate.toISOString().split('T')[0]
    : '';

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
        className="flex h-[90%] w-[80%] sm:w-[70%]  flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
        id="modal"
        role="document"
      >
        {/*        <!-- Modal header --> */}
        <header id="header-3a" className="flex items-center gap-4">
          <h3 className="flex-1 text-xl font-medium text-slate-700">
            View Booking Details
          </h3>

          <button
            onClick={() => setModal(false)}
            className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
            aria-label="close dialog"
          >
            <span className="relative only:-mx-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                role="graphics-symbol"
                aria-labelledby="title-79 desc-79"
              >
                <title id="title-79">Icon title</title>
                <desc id="desc-79">
                  A more detailed description of the icon
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </header>
        {/*        <!-- Modal body --> */}
        <div id="content-3a" className="flex-1 overflow-auto">
          <table className="w-full table-auto text-sm">
            <tbody className="text-gray-600">
              <tr>
                <td className="py-2 px-4 border border-gray-300">Booked By</td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData && viewData?.bookedBy ? (
                    <p className="space-x-3">
                      <span className="bg-slate-100 mb-2 rounded-md px-2 ">
                        Name : {viewData?.bookedBy?.name}
                      </span>
                      <span className="bg-slate-100 mb-2 rounded-md px-2 ">
                        Email : {viewData?.bookedBy?.email}
                      </span>
                      <span className="bg-slate-100 mb-2 rounded-md px-2 ">
                        Phone Number : {viewData?.bookedBy?.whatsappNumber}
                      </span>{' '}
                    </p>
                  ) : (
                    'No Booked By details available'
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Booked On</td>
                <td className="py-2 px-4 border border-gray-300">
                  {formattedDate}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Event Date</td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.bookedDate}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Booked Slot
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.bookedSlot}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Total People
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.totalPeople}
                </td>
              </tr>

              <tr>
                <td className="py-2 px-4 border border-gray-300">Ceremony</td>

                <td className="py-2 px-4 border border-gray-300">
                  <div>{viewData?.ceremonyType?.type}</div>
                  <div>
                    {viewData && viewData?.ceremonyTypeLabels
                      ? viewData?.ceremonyTypeLabels?.map((item, idx) => (
                          <div
                            className="border border-slate-300 mb-2 rounded-md px-2 py-2 space-x-2"
                            key={idx}
                          >
                            <span className="bg-slate-100 mb-2 rounded-md px-2 ">
                              {item?.label} : {item?.value}
                            </span>{' '}
                          </div>
                        ))
                      : 'No Ceremony Label available'}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">Theater</td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.theater?.theaterName}
                </td>
              </tr>

              <tr>
                <td className="py-2 px-4 border border-gray-300">Add Ons</td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData && viewData?.addOns
                    ? viewData.addOns.map((item, idx) => (
                        <div
                          className="border border-slate-300 mb-2 rounded-md px-2 flex gap-2"
                          key={idx}
                        >
                          <div className="flex items-center">
                            Add On {idx + 1} :{' '}
                          </div>
                          <div className="p-3 space-x-2">
                            <span className="bg-slate-100 mb-2 rounded-md px-2 ">
                              Title : {item?.title}
                            </span>{' '}
                            <span className="bg-slate-100 mb-2 rounded-md px-2 ">
                              Price : {item?.price}
                            </span>
                          </div>
                        </div>
                      ))
                    : 'No AddOns available'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Total Amount
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.remainingPrice + 700}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Advance Received
                </td>
                <td className="py-2 px-4 border border-gray-300">700 </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  Balance Amount
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {' '}
                  {viewData?.remainingPrice}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-gray-300">
                  RazorPay Order Id
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.razorpay_order_id}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border border-b-2 border-gray-300">
                  RazorPay Payment Id
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {viewData?.razorpay_payment_id}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
