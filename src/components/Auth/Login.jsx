import { toast, ToastContainer } from 'react-toastify'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../utils/apiConfig'

import { supabase } from "../../utils/supabase"
const googleLogin = async () => {

 await supabase.auth.signInWithOAuth({
      provider:"google",
      options:{
          redirectTo:`${import.meta.env.VITE_FRONTEND_URL}/auth/callback`
      }
 })

}


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const location = useLocation()

  const validateData = () => {
    const newErrors = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      newErrors.email = "Email is required"
    } 
    else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } 
    else if (password.length < 6) {
      newErrors.password = "Min 6 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleLogin = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      toast.success("Login Success")

      // Verify logged in user
      const result = await axios.get(
        `${API_BASE_URL}/auth/verify`,
        {
          withCredentials: true
        }
      )

      const user = result.data.user

      const from = location.state?.from?.pathname || "/"

      // Prevent normal user entering admin routes
      if (from.startsWith("/admin") && user.role !== "admin") {
        navigate("/", { replace: true })
      } 
      else {
        navigate(from, { replace: true })
      }

    } 
    catch (e) {
      toast.error("Login failed")
    }
  }

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
              peer-focus:top-2 
              peer-focus:text-sm 
              peer-focus:text-yellow-600">

              Email
            </label>
          </div>

          <div className='px-1 text-sm text-red-600'>
            {errors.email}
          </div>
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
              peer-focus:top-2 
              peer-focus:text-sm 
              peer-focus:text-yellow-600">

              Password
            </label>
          </div>

          <div className='px-1 text-sm text-red-600'>
            {errors.password}
          </div>
        </div>

        <button
          className='bg-yellow-400 p-1.5 font-semibold hover:cursor-pointer'
          onClick={() => {
            if (validateData()) {
              handleLogin()
            }
          }}
        >
          Login
        </button>
        <button onClick={googleLogin} className='flex justify-between px-42 border-2 border-gray-200 p-2 rounded-xl'>
        <img src="https://developers.google.com/identity/images/g-logo.png" className='w-6 h-6'></img>
        <p>Continue with Google</p>
        </button>
        <p>No account? <span className="text-blue-500 hover:cursor-pointer" onClick={()=>navigate(`/register`)}>Create one</span></p>
      </div>
    </div>
  )
}

export default Login