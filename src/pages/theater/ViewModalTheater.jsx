import React from 'react'
import { useSelector } from 'react-redux'



export default function ViewModalTheater({ setModal, viewData}) {
  const updatedAtDate = viewData?.updatedAt ? new Date(viewData?.updatedAt) : null;
  const formattedDate = updatedAtDate ? updatedAtDate.toISOString().split('T')[0] : '';
  
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
          View Theater Details
        </h3>
        <div>Last Updated : {formattedDate} </div>
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
        <td className="py-2 px-4 border border-gray-300">Theater Name</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData.theaterName : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Logo</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? <img src={viewData.logo.path} alt="Theater Logo" className="rounded-lg h-30 w-50" /> : ''}</td>
      </tr>
      <tr>
  <td className="py-2 px-4 border border-gray-300">Gallery</td>
  <td className="py-2 px-4 border border-gray-300">
    <div className="flex flex-wrap gap-3">
      {viewData && viewData.gallery ? (
        viewData.gallery.map((item, idx) => (
          <div key={idx} className="sm:w-[26%] "> {/* Set width to 1/3 for 3 images per row */}
            <img src={item.path} alt={`Gallery Image ${idx}`} className="rounded-lg h-30 w-50 mb-2" />
          </div>
        ))
      ) : (
        'No gallery images available'
      )}
    </div>
  </td>
</tr>

      <tr>
        <td className="py-2 px-4 border border-gray-300">Features</td>
        <td className="py-2 px-4 border border-gray-300">
        
          {viewData && viewData.features ? (
            viewData.features.map((item, idx) => (
              <div className='my-2' key={idx}><span className='bg-slate-100 mb-2 rounded-md px-2 '>{item}</span></div>
            ))
          ) : (
            'No features available'
          )}
          
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Slots</td>
        <td className="py-2 px-4 border border-gray-300">
          {viewData && viewData.slots ? (
            viewData.slots.map((item, idx) => (
              <div className='border border-slate-300 flex mb-2 rounded-md px-2 gap-2' key={idx}>
                 <div className='flex items-center '><span className=''>Slot {idx+1} :</span> </div>
                 <div className='p-2 space-x-2'>
              <span className='bg-slate-100 mb-2 rounded-md px-2 '>Start Time : {item.start}</span>
              <span className='bg-slate-100 mb-2 rounded-md px-2 '>End Time : {item.end}</span> 
              <span className='bg-slate-100 mb-2 rounded-md px-2 '>Decoration Price : {item.decorationPrice}</span>
              <span className='bg-slate-100 mb-2 rounded-md px-2 '>Offer Price : {item.offerPrice}</span>
              <br/>
              <span className='bg-slate-100 mb-2 rounded-md px-2 '>Price : {item.price}</span>
              <span className='bg-slate-100 mb-2 rounded-md px-2 '>Theater Price : {item.theaterPrice}</span>
              </div>
              </div>
            ))
          ) : (
            'No slots available'
          )}
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Occupancy Details</td>
        <td className="py-2 px-4 border border-gray-300">
          {viewData && viewData.occupancyDetails ? (
            <p className='space-x-3'><span className='bg-slate-100 mb-2 rounded-md px-2 '>Max: {viewData.occupancyDetails.max}</span>
            <span className='bg-slate-100 mb-2 rounded-md px-2 '>Max Paid: {viewData.occupancyDetails.maxPaid}</span> 
            <span className='bg-slate-100 mb-2 rounded-md px-2 '>Extra Charges: {viewData.occupancyDetails.extraCharges}</span> </p>
          ) : (
            'No occupancy details available'
          )}
        </td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-gray-300">Video URL</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? viewData.videoUrl : ''}</td>
      </tr>
      <tr>
        <td className="py-2 px-4 border border-b-2 border-gray-300">Show Cake</td>
        <td className="py-2 px-4 border border-gray-300">{viewData ? (viewData.showCake ? 'True' : 'False') : ''}</td>
      </tr>
      
    </tbody>
  </table>
  
</div>

    </div>
  </div>
  )
}

