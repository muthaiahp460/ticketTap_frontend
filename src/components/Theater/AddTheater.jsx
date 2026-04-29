import axios from 'axios'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const AddTheater = ({setOpen}) => {
  const [name,setName]=useState("")
  const [location,setLocation]=useState("")
  const [errors,setErrors]=useState({})
  const [click,setClick]=useState(false)
  const newErrors={}
  const handleClick=async()=>{
    try{
      await axios.post(
      "http://localhost:3000/theater",{
        name:name,
        location:location
      },{
        withCredentials:true,
      }
      )
      toast.success("theater added sucessfully")
      setTimeout(()=>setOpen(false),2000)
    }
    catch(e){
      console.log(e)
      toast.error("unable to create theater")
    }    
  }

  const validateData=()=>{
    if(name=="")
      newErrors.name="Theater name cannot be empty"
    if(location=="")
      newErrors.location="Location cannot be empty"

    if(Object.entries(newErrors).length>0){
      setErrors(newErrors)
      return false;
    }
    setErrors({})
    return true;
  }
  useEffect(()=>{if(click)validateData()},[name,location])
  return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 relative">

      {/* Close Button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-black hover:cursor-pointer" onClick={()=>setOpen(false)}>
        <X size={20} />
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        Add Theater
      </h1>

      {/* Form */}
      <div className="flex flex-col gap-5">

        {/* Theater Name */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">
            Theater Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name}</span>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.location && (
            <span className="text-sm text-red-500">{errors.location}</span>
          )}
        </div>

        {/* Button */}
        <button
          className="mt-3 w-full py-2 bg-yellow-400 font-semibold rounded-md hover:cursor-pointer hover:bg-yellow-500 transition"
          onClick={() => {
            setClick(true)
            if (validateData()) handleClick()
          }}
        >
          Proceed
        </button>
      </div>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  </div>
  )
}

export default AddTheater
