import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { tableItems } from './ViewCake';
import { useForm } from "react-hook-form";
const UpdateCake = () => {
  const { id } = useParams();

  // Find the cake with the matching id in tableItems
  const selectedCake = tableItems.find((cake) => cake.id === id);

  const { register, handleSubmit, reset } = useForm();

  // Use selectedCake data for initializing state or rendering  

 
  const [photo, setPhoto] = useState(selectedCake?.photo || "");
  
  useEffect(() => {
    if (selectedCake) {
      reset({
      name:selectedCake.name || "",
      price:selectedCake.price || "",
      photo:selectedCake.photo || ""
    })
    }

  }, [selectedCake,reset]);
  
  const onSubmit = (data) => {
 
    console.log("Form submitted", data);
    reset();
  };

  const handlePhotoChange = (e) => {
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
    <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Edit cake details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2"  onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex justify-between">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              required
              {...register("name", { defaultValue: selectedCake?.name })}
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <label className="font-medium">Price</label>
            <input
              type="text"
              required
              {...register("price", { defaultValue: selectedCake?.price })}
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            </div>
            <div>
          
            <label htmlFor="file" className="font-medium space-y-6"> Photo 
             
            <img class="w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo} alt="Cake"/>
        
           
            <input
            {...register("photo", { defaultValue: selectedCake?.photo })}
            onChange={handlePhotoChange}
             className="block w-54 sm:w-[443px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </label>
          
          </div>
         
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
                Edit
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCake;
