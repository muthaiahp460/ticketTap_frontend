import axios from 'axios'
import { Theater, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ListTheaters = ({setScreen,setSelectedTheaterId}) => {
  const [theaters,setTheaters]=useState([])  
  useEffect(()=>{
    const getTheaters=async()=>{
        const result=await axios.get("http://localhost:3000/theater/mine",{withCredentials:true})
        setTheaters(result.data.data)
        console.log(result.data.data)
    }
    getTheaters()
  },[])
  return (
    <div className="p-6">
        <div className="flex flex-col gap-4">

            {theaters.map((theater) => (
            <div
                key={theater.id}
                className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition border"
            >
                {/* Left Section */}
                <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800">
                    {theater.name}
                </h2>
                <p className="text-sm text-gray-500">
                    📍 {theater.location}
                </p>
                </div>

                {/* Right Section (Actions) */}
                <div className="flex items-center gap-3">

                {/* View */}
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition">
                    View
                </button>

                {/* Add Screen */}
                <button className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition" onClick={()=>{setSelectedTheaterId(theater.id);setScreen(true)}}>
                    + Screen
                </button>

                {/* Delete */}
                <button className="p-2 text-red-500 hover:bg-red-100 rounded-md transition">
                    <X size={18} />
                </button>

                </div>
            </div>
            ))}

        </div>
    </div>
  )
}

export default ListTheaters
