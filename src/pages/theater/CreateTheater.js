import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useForm ,useFieldArray, Controller} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import Select from 'react-select'
import { ClipLoader } from "react-spinners";
import { createTheater } from "../../features/actions/theater";


const CreateTheater = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();


  
  const {theaterData,isLoading} = useSelector((state)=>state.theater)

    const {register,handleSubmit,control,formState: { errors },}=useForm({
      defaultValues:{
        slots: [{ start: "", end:"",theaterPrice:"", decorationPrice:"",offerPrice:"",price:""}],
        features: [],
          occupancyDetails: { max: "", maxPaid: "", extraCharges:"" },
      }
    })

      const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
  control,
  name: "features"
});

const { fields: slotFields, append: appendSlot, remove: removeSlot } = useFieldArray({
  control,
  name: "slots"
});


      const onSubmit = data =>{
        // console.log('data',data)
        // const temp = data?.slots?.map(item => {
        //   const {startTime,startTimePeriod,endTimePeriod, endTime,totalPrice,...rest} = item
        //   return {
        //     ...rest,price:totalPrice,start: startTime+ ` ` + startTimePeriod,end: endTime+ ` ` + endTimePeriod
        //   }
        // })
        // console.log(temp)


        // console.log(timeData)

        const temp = data?.slots.map(item=>{
          let [startHours,startMins]= item.start.split(":")
          let startTime; 

          if(startHours > 0 && startHours < 12) {
            startTime = `${startHours}:${startMins} AM` 
          } else if(startHours > 12 && startHours < 24) {
            startTime = `${startHours - 12}:${startMins} PM`
          }
          else if(startHours === "00"){
            startTime = `12:${startMins} AM`
          }
          else {
            startTime = `${startHours}:${startMins} PM`
          }
       
          // console.log("start time converted::", startTime)

          let [endHours,endMins]= item.end.split(":")
          let endTime;

          if(endHours > 0 && endHours < 12) {
            endTime = `${endHours}:${endMins} AM` 
          } else if(endHours > 12 && endHours < 24) {
            endTime = `${endHours - 12}:${endMins} PM`
          }
          else if(endHours === "00"){
            endTime = `12:${endMins} AM`
          }
          else {
            endTime = `${endHours}:${endMins} PM`
          }

          const {start,end,...rest} = item
 
          return {
                ...rest,start: startTime,end: endTime
              }

        })
        // let [startHours, startMins] = data?.slots[0].start.split(':')
        
        // let startTime; 

        // console.log(startHours)

        // if(startHours > 0 && startHours < 12) {
        //   startTime = `${startHours}:${startMins} AM` 
        // } else if(startHours > 12 && startHours < 24) {
        //   startTime = `${startHours - 12}:${startMins} PM`
        // }
        // else if(startHours === "00"){
        //   startTime = `12:${startMins} AM`
        // }
        // else {
        //   startTime = `${startHours}:${startMins} PM`
        // }
        // console.log("start time converted::", startTime)

        // return

        const {showCake} =data
        const showCakeValue = showCake.value
        const formData = new FormData()
        formData.append("theaterName",data?.theaterName)
        formData.append("location",data?.location)
        formData.append("videoUrl",data?.videoUrl)
        formData.append("showCake",showCakeValue)
        formData.append("features",JSON.stringify(data?.features))
        formData.append("slots",JSON.stringify(temp))
        formData.append("occupancyDetails",JSON.stringify(data?.occupancyDetails))
        Array.from(data?.logo).forEach((img) => {
          formData.append("logo",img)
          })
          Array.from(data?.gallery).forEach((img) => {
            formData.append("gallery", img);
          });
        console.log(typeof (showCakeValue))
  
  // console.log("formdata", formData.getAll('showCake'));
  // console.log("formdata", formData.getAll('features'));
  // console.log("showcake::",showCakeValue)
          dispatch(createTheater(formData));
      }

      const [selectedPhoto,setSelectedPhoto]=useState("")
const [selectedGallery,setSelectedGallery]=useState([])

      const [photo, setPhoto] = useState("");
  const defaultPhoto =
    "https://via.placeholder.com/130?text=No+Image+Selected";

    const [gallery, setGallery] = useState([]);
  
   const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        setSelectedPhoto(e.target.files)
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
          // Create an array to store file objects
          const imagesArray = [];
    
          Array.from(selectedImages).forEach((image) => {
            // Create a new File object
            const fileObject = new File([image], image.name, {
              type: image.type,
            });
    
            imagesArray.push(fileObject);
          });
    
          // Update the state with the array of file objects
          setSelectedGallery((prevGallery) => [...prevGallery, ...imagesArray]);
    // Convert the file objects to base64 for UI display
const base64Array = [];

// Create a counter to keep track of when all images are processed
let counter = 0;

imagesArray.forEach((fileObject) => {
const reader = new FileReader();
reader.readAsDataURL(fileObject);
reader.onloadend = () => {
base64Array.push(reader.result);

// Increment the counter
counter++;

// Check if all images are processed
if (counter === imagesArray.length) {
  // Update the state with the base64Array
  setGallery(base64Array
    );
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

      useEffect(()=>{
        if(theaterData?.status){
          navigate("/theaters")
        }
      },[theaterData])
  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create Theater details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Theater Name</label>
            <input 
            {...register('theaterName', { required: 'Theater Name is required' })}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors && errors.theaterName && (
  <span className="text-red-500">
    {errors.theaterName.message}
  </span>
)}
          </div>
          <div className="w-full">
            <label className="font-medium">Location</label>
            <input
            {...register('location')}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
     
          </div>
            </div>
          
        
           
            <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
            <div className="w-full">
            <label className="font-medium">Video URL</label>
            <input 
            {...register('videoUrl')}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            <div className="w-full">
            <label className="font-medium">Show Cake</label>
            <Controller 
                                      control={control}
                                      name="showCake"
                                      render={({ field, fieldState:{error} }) => (
                                          <Select
                                              value={field.value}
                                              options={[  { value: true, label: "True" },{ value: false, label: "False" },
                                            ]}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder="Show Cake "
                                             
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
                                      rules={{ required: true }}
                                      
                                  />
                                 {errors && errors.showCake && (
  <span className="text-red-500">
    {errors.showCake.message}
  </span>
)}
                                 
          </div>
            
          </div>
          
          <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
          
            <div className="font-medium space-y-6"> Logo
             
            <img class="mt-2 w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo || defaultPhoto} alt="No Image"/>
            <label htmlFor="file_input" className="flex
            " ><InsertPhotoOutlinedIcon/>
            <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
           
            <input
             {...register('logo', { required: 'Photo is required',onChange:(e)=>{handlePhotoChange(e)} })}
           
             className="hidden w-54 sm:w-[455px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
              {errors.logo && (
                    <span className="text-red-500">
                      Photo is required
                    </span>
                  )}
            </div>
           
            </div>
          <div className="w-full">
          
            <div className="font-medium space-y-6 "> Gallery 
             <div className="flex mt-2 flex-wrap sm:h-[140px] overflow-auto">
            
             {gallery.map((image, index) => (
          <div key={index} className="relative mr-5">
           <div className="w-full mt-2"> <img
              className="w-20 h-20 sm:w-18 sm:h-16 mr-5 rounded cursor-pointer"
              src={image}
              alt={`Gallery Image ${index + 1}`}
              onClick={() => removeImage(index)}
            />
            </div>
            <div
              className="absolute top-0 right-0 px-1 cursor-pointer bg-rose-400 rounded-md hover:bg-red-600"
              onClick={() => removeImage(index)}
            >
              <span className="text-white text-sm">X</span>
            </div>
          </div>
        ))}
            </div>
    
            <label htmlFor="gallery_input" className="flex" >
    <InsertPhotoOutlinedIcon/>
    <div className="w-full px-2 border rounded-md border-slate-300 ">Click here to upload</div>
  </label>
            <input
             {...register('gallery', {onChange:(e)=>{handleGalleryChange(e)} })}
             
             className="hidden w-54 sm:w-[475px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
             id="gallery_input" 
             type="file"
             multiple
             />
             
            </div>
            </div>
            </div>
            <div className="w-full">
              <div className=" flex justify-between">
            <label className="font-bold sm:me-[387px] text-black">Features</label>
            <button
        type="button"
        className=" border rounded-md  bg-pink-700 text-white font-semibold text-xl px-2 hover:bg-slate-950"
        onClick={() => appendFeature("")}
      >
        +
      </button>
            </div>
            <ul>
        {featureFields.map((item, index) => (
          <li key={item.id}>
            <input className="w-full mt-2 px-5 sm:px-4 py-2 border-slate-300 text-gray-500 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg" type="text"
             {...register(`features.${index}`,{required:"Features is Required"})}/>
            { index>0 && (
            <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() =>removeFeature(index)}>Delete</button>)
}
          </li>
        ))}
      </ul>
      {errors.features && (
                    <span className="text-red-500">
                      Features is required
                    </span>
                  )}
      
              </div>
           
             < div className="flex justify-between">
            <label className="font-bold text-black">Slots</label>
            <button
        type="button"
        className=" border rounded-md  bg-pink-700 text-white font-semibold text-xl px-2 hover:bg-slate-950"
        onClick={() => appendSlot({ slots: ""})}
      >
        +
      </button>
            </div>
            <ul>
        {slotFields.map((item, index) => (
          <li key={item.id}>
         
<div className="space-y-5 ">
<div className="sm:flex justify-between gap-10">
  <div className="w-full">
    <label className="font-medium">Start Time</label>
    <div className="flex items-center mt-2">
      <input 
        {...register(`slots.${index}.start`,{ required: 'Start Time is required' })}
        placeholder="0:00 Format"
        type="time"
       
        className="w-full px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
      />
      {/* <select
        className="w-20 px-2 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg ml-2"
        {...register(`slots.${index}.startTimePeriod`,{ required: 'Start Time Period is required' })}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select> */}
    </div>
  </div>
  <div className="w-full">
    <label className="font-medium">End Time</label>
    <div className="flex items-center mt-2">
      <input 
        {...register(`slots.${index}.end`,{ required: 'End Time is required' })}
        placeholder="0:00 Format"
        type="time"
        
        className="w-full px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
      />
      {/* <select
        className="w-20 px-2 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg ml-2"
        {...register(`slots.${index}.endTimePeriod`,{ required: 'End Time Period is required' })}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select> */}
    </div>
  </div>
</div>

<div className="sm:flex justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Theater Price</label>
            <input 
             {...register(`slots.${index}.theaterPrice`,{ required: 'Theater Price is required' })}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="w-full">
            <label className="font-medium">Decoration Price</label>
            <input
            {...register(`slots.${index}.decorationPrice`,{ required: 'Decoration Price is required' })}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
            </div>

<div className="sm:flex justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Offer Price</label>
            <input 
             {...register(`slots.${index}.offerPrice`,{ required: 'Offer Price is required' })}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
          <div className="w-full">
            <label className="font-medium">Total Price</label>
            <input
            {...register(`slots.${index}.price`,{ required: 'Total Price is required' })}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>

          </div>

            </div>
                 
            { index>0 && (
            <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() => removeSlot(index)}>Delete</button>)
}
          </li>
          
        ))}
      </ul>
      {errors.slots && (
            <span className="text-red-500">
              All Slots Fields are required
            </span>
          )}
             < div className="flex justify-between">
            <label className="font-bold text-black">Occupancy Details</label>
      
            </div>
            <ul>
        
         
<div className="space-y-5 ">
<div className="sm:flex justify-between gap-10">
  <div className="w-full">
    <label className="font-medium">Max</label>
    <div className="flex items-center mt-2">
      <input 
        {...register(`occupancyDetails.max`)}
        type="text"
    
        className="w-full px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
      />
    
    </div>
  </div>
  <div className="w-full">
    <label className="font-medium">Max Paid</label>
    <div className="flex items-center mt-2">
      <input 
        {...register(`occupancyDetails.maxPaid`)}
        type="text"
        
        className="w-full px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
      />
     
    </div>
  </div>
</div>



<div>
          <div className="sm:w-[467px]">
            <label className="font-medium">Extra Charges</label>
            <input 
             {...register(`occupancyDetails.extraCharges`)}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
          </div>
         

          </div>

            </div>
                 
       
         
      </ul>
      
            
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-pink-800 active:bg-indigo-600 rounded-lg duration-150">
              {isLoading ? (
                <ClipLoader color="#c4c2c2" />
              ) : (<>Create</>)}
              </button>
            </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default CreateTheater