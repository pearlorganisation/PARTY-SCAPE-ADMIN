import React, { useState } from "react";
import { useForm } from "react-hook-form";


export const CreateCake = () => {
  const {register,handleSubmit,reset}=useForm({
    defaultValues:{
      name:"",
      price:"",
      
    }
  })
  const onSubmit = data =>{
    console.log('data',data)
    reset({
      name: "",
      price: "",
      photo: "",
    });
  }


 
  const [photo, setPhoto] = useState("");
  
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
    <div>
        <div className="px-18 bg-gray-800 h-screen">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create cake details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6 sm:p-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8" onSubmit={handleSubmit(onSubmit)}>
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
          
            <label htmlFor="file" className="font-medium space-y-6"> Photo 
             
            <img class="w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo} alt="No Image"/>
        
           
            <input
             {...register('photo', { required: 'Photo is required' })}
             onChange={handlePhotoChange}
             className="block w-54 sm:w-[253px] text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </label>
          
          </div>
         
          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
