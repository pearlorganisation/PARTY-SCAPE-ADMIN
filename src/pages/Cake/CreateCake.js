import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CreateCake = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      price: '',
    },
  });
  const onSubmit = (data) => {
    console.log('data', data);
    reset({
      name: '',
      price: '',
      photo: '',
    });
  };

  const [photo, setPhoto] = useState('');

  const handlePhotoChange = (e) => {
    console.log(e)
    const selectedPhoto = e.target.files[0];

    if (selectedPhoto) {
      // Get the base64 representation of the selected photo
      const reader = new FileReader();
      reader.readAsDataURL(selectedPhoto);
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
    }
  };
  return (
    <div>
      <div className="px-18 bg-gray-800 h-screen">
        <div className=" flex justify-center">
          <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
            Create cake details
          </h3>
        </div>
        <div className="bg-white rounded-lg shadow p-4 py-6 sm:p-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
          {/* <form className="space-y-6 mx-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex justify-between">
          <div>
            <label className="font-medium">Name</label>
            <input 
            {...register('name', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 px-5 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <label className="font-medium">Price</label>
            <input
            {...register('price', { required: 'Price is required' })}
              type="text"
              required
              className="w-full mt-2 px-5 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
            </div>
            <div>
          
            <label htmlhtmlFor="file" className="font-medium space-y-6"> Photo 
             
            <img className="w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo} alt="No Image"/>
        
           
            <input
             {...register('photo', { required: 'Photo is required' })}
             onChange={handlePhotoChange}
             className="block w-54 sm:w-[253px] text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </label>
          
          </div>
         
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create
          </button>
        </form> */}

          <form className="max-w-2/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between w-full gap-2">
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cake Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    {...register('price', { required: 'Price is required' })}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-1/2">
                <div>
                  <label
                    {...register('photo', { required: 'Photo is required' })}
                    onChange={() => handlePhotoChange}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="cake_image"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-[#404040] border border-gray-300 rounded-lg cursor-pointer bg-white dark:text-[#404040] focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="cake_image_help"
                    id="cake_image"
                    type="file"
                  />
                </div>
                <div className="flex justify-center w-full">
                  <img src={photo} alt="no-img" className="w-full" />
                </div>
              </div>
            </div>
            <div className="mt-3 w-full flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
