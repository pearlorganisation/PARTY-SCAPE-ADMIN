import React, { useState } from "react";
import { useForm ,useFieldArray} from "react-hook-form";
import { useLocation } from 'react-router-dom';

const UpdateTheater = ({ id }) => {

  const { state: item } = useLocation();

    const {register,handleSubmit,reset,control,}=useForm({
        defaultValues:{
          name: item?.theaterName || "",
          location: item?.location || "",
          theaterCharges: item?.theaterCharges || "",
          decorationCharges: item?.decorationCharges || "",
          features: item?.features.map((feature) => ({ name: feature })) || [{ name: "" }],
        }
        
      })

      const { fields, append, remove } = useFieldArray({
        control,
        name: "features"
      })

      const onSubmit = data =>{
        console.log('data',data)
        reset({
         
        });
      }

      const [photo, setPhoto] = useState(item?.logo?.path || '');
  const defaultPhoto =
    "https://via.placeholder.com/130?text=No+Image+Selected";

    const [gallery, setGallery] = useState([]);
  
   const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
    
        if (selectedPhoto) {
          
          const reader = new FileReader();
          reader.readAsDataURL(selectedPhoto);
          reader.onloadend = () => {
            setPhoto(reader.result);
          };
        }
      };
   const handleGalleryChange = (e) => {
    const selectedImages = e.target.files;

    if (selectedImages.length > 0) {
      // Create an array to store base64 representations of selected images
      const imagesArray = [];
  
      Array.from(selectedImages).forEach((image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          
          imagesArray.push(reader.result);
          
          // Check if all images have been processed
          if (imagesArray.length === selectedImages.length) {
            // Update the state with the array of base64 representations
            setGallery((prevGallery) => [...prevGallery, ...imagesArray]);
          }
        };
      });
    }
      };
      const removeImage = (index) => {
        setGallery((prevGallery) => {
          const updatedGallery = [...prevGallery];
          updatedGallery.splice(index, 1);
          return updatedGallery;
        });
      };
  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update theater details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex justify-between">
          <div>
            <label className="font-medium">Theater Name</label>
            <input 
            {...register('name', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 me-40 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <label className="font-medium">Location</label>
            <input
            {...register('location', { required: 'Price is required' })}
              type="text"
              required
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            </div>
          <div className="sm:flex justify-between">
          <div>
            <label className="font-medium">Theater Charges</label>
            <input 
            {...register('theaterCharges', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 me-35 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="mt-4 sm:mt-0">
            <label className="font-medium">Decoration Charges</label>
            <input
            {...register('decorationCharges', { required: 'Price is required' })}
              type="text"
              required
              className="w-full mt-2 me-30 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            </div>
        
           
            <div className="sm:flex justify-between">
            <div>
            <label className="font-medium">Occupancy Details</label>
            <input 
            {...register('name', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 me-31 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            <div className="">
              <div className="flex">
            <label className="font-medium sm:me-[387px]">Features</label>
            <button
        type="button"
        className=" border rounded-md bg-pink-700 text-white text-sm font-bold px-2 hover:bg-slate-950"
        onClick={() => append({ name: ""})}
      >
        +
      </button>
            </div>
            <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input className="w-full mt-2 px-5 sm:px-4 py-2 border-slate-300 text-gray-500 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" type="text"
              {...register(`features.${index}.name`)}/>
            { index>0 && (
            <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() => remove(index)}>Delete</button>)
}
          </li>
        ))}
      </ul>
      
              </div>
          </div>
          <div className="sm:flex justify-between">
          <div>
          
            <label htmlFor="file" className="font-medium space-y-6"> Logo 
             
            <img class="w-20 h:20 sm:w-35 sm:h-35 rounded-lg" src={photo || defaultPhoto} alt="No Image"/>
        
           
            <input
             {...register('photo', { required: 'Photo is required' })}
             onChange={handlePhotoChange}
             className="block w-54 sm:w-[468px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            </label>
            </div>
          <div>
          
            <label htmlFor="file" className="font-medium space-y-6"> Gallery 
             <div className="flex flex-wrap sm:w-[450px] sm:h-[140px] overflow-auto">
            
             {gallery.map((image, index) => (
          <div key={index} className="relative mr-5">
            <img
              className="w-20 h-20 sm:w-18 sm:h-16 mr-5 rounded cursor-pointer"
              src={image}
              alt={`Gallery Image ${index + 1}`}
              onClick={() => removeImage(index)}
            />
            <div
              className="absolute top-0 right-0 px-1 cursor-pointer bg-rose-400 rounded-md hover:bg-red-600"
              onClick={() => removeImage(index)}
            >
              <span className="text-white text-sm">X</span>
            </div>
          </div>
        ))}
            </div>
    
           
            <input
             {...register('gallery', { required: 'Photo is required' })}
             onChange={handleGalleryChange}
             className="block w-54 sm:w-[475px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="gallery_input" type="file"
             multiple
             />
            </label>
            </div>
            </div>
            <div>
            <label className="font-medium">Slots</label>
            <input 
            {...register('name', { required: 'Name is required' })}
              type="text"
              required
              className="w-full mt-2 me-40 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
                Update
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default UpdateTheater