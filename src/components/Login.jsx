import { toast, ToastContainer } from 'react-toastify'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState("")
  const [password,setPassword]=useState("")
  const [errors,setErrors]=useState({})
  const [click,setClick]=useState(false)
  const navigate=useNavigate()
  const validateData=()=>{
    const newErrors={}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Min 6 characters"
    }

    if(Object.keys(newErrors).length>0){
      setErrors(newErrors)
      return false;
    }
    setErrors({})
    return true;
  }

  const handleLogin=async()=>{
    try{
      const result=await axios.post("http://localhost:3000/auth/login",{
      email:email,
      password:password
      },{
        withCredentials:true,
      })
      toast.success("Login Success")
      navigate("/")
    }
    catch(err){
      toast.error("Login failed")
      console.log(err)
    }
  }

  useEffect(()=>{
    if(click){
      validateData()
    }
  }
  ,[email,password])
  return (
    <div className='min-h-screen flex items-center justify-center'>
      
  <ToastContainer position="top-right" autoClose={3000} />

  <div className="flex flex-col gap-8 w-[600px] px-8 py-16 bg-white rounded-2xl shadow-xl">
    <h2 className="text-2xl font-bold text-center text-gray-800">
      Login
    </h2>
    {/* EMAIL */}
    <div>
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder=" "
        />
        <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-600">
          Email
        </label>
      </div>
      <div className='px-1 text-sm text-red-600'>{errors.email}</div>
    </div>

    {/* PASSWORD */}
    <div>
      <div className="relative">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder=" "
        />
        <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-600">
          Password
        </label>
      </div>
      <div className='px-1 text-sm text-red-600'>{errors.password}</div>
    </div>
    <button className='bg-yellow-400 p-1.5 font-semibold hover:cursor-pointer'
    onClick={()=>{setClick(true);(validateData())?handleLogin():()=>{}}}>LogIn</button>
  </div>
</div>
  )
}

export default Login
