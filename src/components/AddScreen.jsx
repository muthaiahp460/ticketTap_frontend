import React, { useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { X } from "lucide-react"

const AddScreen = ({ theaterId, setScreen}) => {
  const [screenNo, setScreenNo] = useState("")
  const [rows, setRows] = useState("")
  const [cols, setCols] = useState("")

  const handleSubmit = async () => {
    if (!screenNo || !rows || !cols) {
      toast.error("All fields required")
      return
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/screen/",
        {
            theaterId:theaterId,
            screenNo:screenNo,
            rows:Number(rows),
            cols:Number(cols)
        },  
        { withCredentials: true }
      )
      toast.success("Screen added successfully")
      setTimeout(()=>setScreen(false),2000)
    } catch (err) {
      console.log(err)
      toast.error("Failed to add screen")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] relative">
        <ToastContainer position="top-right"></ToastContainer>
        <div className="flex justify-between">
          <div></div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Add Screen
          </h2>
          <X className="hover:cursor-pointer" onClick={()=>{setScreen(false)}}/>
        </div>
        <div className="flex flex-col gap-4">

          <input
            type="number"
            placeholder="Screen Number"
            value={screenNo}
            onChange={(e) => setScreenNo(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Columns"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-yellow-400 py-2 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Add Screen
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddScreen