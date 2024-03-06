import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddTheater = () => {
  //   {
  //     "status": true,
  //     "data": [
  //         {
  //             "occupancyDetails": {
  //                 "minOccupancy": 4,
  //                 "extraCharges": 200
  //             },
  //             "_id": "65def3f5e380e5004399a5e8",
  //             "theaterName": "HEAVEN",
  //             "theaterCharges": 1299,
  //             "decorationCharges": 1899,
  //             "logo": {
  //                 "fieldname": "logo",
  //                 "originalname": "2018 (1).webp",
  //                 "encoding": "7bit",
  //                 "mimetype": "image/webp",
  //                 "path": "https://res.cloudinary.com/dnixhctcf/image/upload/v1709110260/Design%20Destination/no9udixvgbwgykzh0plx.webp",
  //                 "size": 79980,
  //                 "filename": "Design Destination/no9udixvgbwgykzh0plx"
  //             },
  //             "gallery": [
  //                 {
  //                     "fieldname": "gallery",
  //                     "originalname": "2018 (1).webp",
  //                     "encoding": "7bit",
  //                     "mimetype": "image/webp",
  //                     "path": "https://res.cloudinary.com/dnixhctcf/image/upload/v1709110260/Design%20Destination/zvnyg9lwpb05r0xt4nke.webp",
  //                     "size": 79980,
  //                     "filename": "Design Destination/zvnyg9lwpb05r0xt4nke"
  //                 },
  //                 {
  //                     "fieldname": "gallery",
  //                     "originalname": "2018 (1).webp",
  //                     "encoding": "7bit",
  //                     "mimetype": "image/webp",
  //                     "path": "https://res.cloudinary.com/dnixhctcf/image/upload/v1709110260/Design%20Destination/qlolxktu8xhhutiva0sk.webp",
  //                     "size": 79980,
  //                     "filename": "Design Destination/qlolxktu8xhhutiva0sk"
  //                 }
  //             ],
  //             "features": [
  //                 "Food & Beverages can be ordered at the theatre",
  //                 "Mega 150 inch enhanced 4k Video. Powerful 1000W Dolby atmos sound system (In-wall speakers). Ideal for family and friends.",
  //                 "Sound System",
  //                 "120 Inch Full HD Screen"
  //             ],
  //             "slots": [
  //                 {
  //                     "start": "10:00 AM",
  //                     "end": "11:30 AM ",
  //                     "isBooked": true,
  //                     "_id": "65def3f5e380e5004399a5e9"
  //                 },
  //                 {
  //                     "start": "12:00 pm",
  //                     "end": "2:00 AM ",
  //                     "isBooked": true,
  //                     "_id": "65def3f5e380e5004399a5ea"
  //                 }
  //             ],
  //             "location": "hyderabad",
  //             "createdAt": "2024-02-28T08:51:01.636Z",
  //             "updatedAt": "2024-02-28T08:51:01.636Z",
  //             "__v": 0
  //         }
  //     ]
  // }

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      price: 0,
    },
  });
  const onSubmit = (data) => {
    console.log('data', data);
    return;
    reset({
      name: '',
      price: '',
      photo: '',
      location: '',
    });
  };

  const [photos, setPhotos] = useState([]);

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      // Get the base64 representation of the selected photo
      const reader = new FileReader();
      for (let i = 0; i < e.target.files.length; i++) {
        reader.readAsDataURL(e.target.files[i]);
        reader.onloadend = () => {
          setPhotos([...photos, e.target.files[i]]);
        };
      }
    }
    console.log(photos);
  };

  return (
    <div>
      <div className="px-18 bg-gray-800 h-screen">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Add Theater
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6 sm:p-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
          <form className="max-w-2/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between w-full gap-2">
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Theater Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Theater Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    {...register('price', { required: 'Price is required' })}
                    placeholder="0"
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    {...register('location', {
                      required: 'Location is required',
                    })}
                    placeholder="Location"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="isEggless"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Eggless?
                  </label>
                  <select
                    {...register('isEggless')}
                    id="isEggless"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={true}>Yes</option>
                    <option value={false} selected>
                      No
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="cake_image"
                  >
                    Upload image
                  </label>
                  <input
                    {...register('photo', { required: 'Photo is required' })}
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-[#404040] border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-[#404040] focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="cake_image_help"
                    id="cake_image"
                    type="file"
                    multiple
                  />
                </div>
                <div className="flex flex-row gap-2 flex-wrap w-1/2">
                  <span className="flex flex-col border border-slate-200 w-30">
                    {/* <img src={photo} alt="no-img" className="h-full max-h-30" /> */}
                    <button className="bg-red-500 hover:bg-red-700 text-white">
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 w-full flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Theater
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTheater;
