import React, { useEffect, useState } from "react";
import { useForm ,Controller,useFieldArray} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { createCake } from "../../features/actions/cake";
import { ClipLoader } from "react-spinners";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';



export const CreateCake = () => {
  const dispatch =useDispatch();
  const navigate= useNavigate();

  const {cakeData,isLoading} = useSelector((state)=>state.cake)

  const {register,handleSubmit,formState: { errors },control}=useForm({
    defaultValues:{
      name:"",
      price:[ {weight:"", price:""},]
      
    }
  })
  const[ selectedPhoto,setSelectedPhoto]= useState("")

  const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
    control,
    name: "price"
  });

  const onSubmit = data =>{
    console.log('data',data)

    const {isEggless}= data
   const isEgglessValue= isEggless.value;

  


   const formData = new FormData();
   formData.append("name",data?.name)
   formData.append("isEggless",isEgglessValue)
   formData.append("price",JSON.stringify(data?.price))
    Array.from(data?.image).forEach((img) => {
          formData.append("image",img)
          })
          console.log("formData",formData.getAll("isEggless"))
  dispatch(createCake(formData))

  }


 
  const [photo, setPhoto] = useState("");
  
   const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
    setSelectedPhoto(e.target.files)
        if (selectedPhoto) {
          // Get the base64 representation of the selected photo
          const reader = new FileReader();
          reader.readAsDataURL(selectedPhoto);
          reader.onloadend = () => {
            setPhoto(reader.result);
          };
        }
      };

      const defaultPhoto =
    "https://via.placeholder.com/130?text=No+Image+Selected";


    useEffect(()=>{
      if(cakeData?.status){
        navigate("/cakes")
      }
    },[cakeData])

  return (
    <div>
        <div className="bg-gray-800">
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Create cake details
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-6 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex space-y-6 sm:space-y-0 justify-between gap-10">
          <div className="w-full">
            <label className="font-medium">Cake Name</label>
            <input 
            {...register('name', { required: 'Cake Name is required' })}
              type="text"
              
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors && errors.name && (
  <span className="text-red-500">
    {errors.name.message}
  </span>
)}
          </div>
          <div className="w-full">
            <label className="font-medium">Is Eggless</label>
            <Controller 
                                      control={control}
                                      name="isEggless"
                                      render={({ field, fieldState:{error} }) => (
                                          <Select
                                              value={field.value}
                                              options={[  { value: true, label: "True" },{ value: false, label: "False" },
                                            ]}
                                              onChange={(selectedOption) => field.onChange(selectedOption)}
                                              className="mt-2 "
                                              placeholder=" Choose Type "
                                             
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
                                 {errors && errors.isEggless && (
  <span className="text-red-500">
    {errors.isEggless.message}
  </span>
)}
          </div>

            </div>

            <div>
          
          <div htmlFor="file" className="font-medium space-y-6"> Photo 
           
          <img class="w-20 h:20 sm:w-35 sm:h-35 rounded" src={photo || defaultPhoto} alt="No Image"/>
          <label htmlFor="file_input" className="flex
            " ><InsertPhotoOutlinedIcon/>
            <div className="w-full sm:w-[443px] px-2 border rounded-md border-slate-300 ">Click here to upload</div></label>
         
          <input
           {...register('image', { required: 'Photo is required',onChange:(e)=>{handlePhotoChange(e)} })}
           
           className="hidden w-54 sm:w-[443px] border-slate-300 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
          </div>
        
        </div>

            <div className="sm:flex space-y-6 sm:space-y-0 justify-between ">

          
            <label className="font-bold  text-black">Weight and Price</label>
            <button
        type="button"
        className=" border rounded-md  bg-pink-700 text-white font-semibold text-xl px-2 hover:bg-slate-950"
        onClick={() => appendPrice({ price: ""})}
      >
        +
      </button>
            </div>
            <ul>
        {priceFields.map((item, index) => (
          <li key={item.id}>
         
<div className="sm:flex gap-10 ">
<div className="w-full">

            <input
            {...register(`price.${index}.weight`, { required: 'Weight is required' })}
              type="text"
              placeholder=" Weight "
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
  
          </div>
          <div className="w-full">
          
          <input
            {...register(`price.${index}.price`, { required: 'Price is required' })}
              type="text"
              placeholder=" Price "
              className="w-full mt-2  px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
  
          </div>
          </div>
          { index>0 && (
            <button className=" border rounded-md bg-rose-500 text-white text-xs px-2 hover:bg-slate-950" type="button" onClick={() => removePrice(index)}>Delete</button>)
}
          </li>
          
        ))}
      </ul>
      {errors.price && (
            <span className="text-red-500">
              Both Fields are required
            </span>
          )}
            
           
         
          <div style={{ marginTop: '4rem' }}>
              <button className="w-full px-4 py-2 text-white font-medium bg-pink-700 hover:bg-slate-950 active:bg-indigo-600 rounded-lg duration-150">
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
