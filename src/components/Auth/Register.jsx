import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const navigate=useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword]=useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [role,setRole]=useState("user")
  const [Secret,setSecret]=useState("")
  const [errors,setErrors]=useState({})
  const [click,setClick]=useState(false)

  
  const validateData=()=>{
    const newErrors={}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

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

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneNo) {
      newErrors.phoneNo = "Phone is required"
    } else if (!phoneRegex.test(phoneNo)) {
      newErrors.phoneNo = "Must be 10 digits"
    }

    if (role === "admin" && !Secret) {
      newErrors.secret = "Secret key required"
    }

    if(Object.keys(newErrors).length>0){
      setErrors(newErrors)
      return false;
    }
    setErrors({})
    return true;
  }

  const handleRegister=async()=>{
    try{
    
    console.log(role)
    if(role=="admin"){
      const result=await axios.post(`http://localhost:3000/auth/register/admin`,{
        name:name,
        email:email,
        password:password,
        phoneNo:phoneNo,
        Secret:Secret
      })
      console.log(result)
    }
    if(role=="user"){
      const result=await axios.post(`http://localhost:3000/auth/register/user`,{
        name:name,
        email:email,
        password:password,
        phoneNo:phoneNo,
    })
    console.log(result)
    toast.success("Registered sucessfully")
    navigate("/")
    }}
    catch(err){
      
      console.log(err.status)
      toast.error("Registerion failed")
    }
  }

  useEffect(() => {
  if (click) validateData()
}, [name, email, password, phoneNo, Secret, role])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col gap-8 w-[600px] px-8 py-16 bg-white rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        <div>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-600">
              Name
            </label>
          </div>
          <div className='px-1 text-sm text-red-600'>{errors.name}</div>
        </div>

        <div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
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

        <div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
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

        <div>
          <div className="relative">
            <input
              type="tel"
              value={phoneNo}
              onChange={(e)=>{setPhoneNo(e.target.value)}}
              className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3
              peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-600">
              Phone Number
            </label>
          </div>
          <div className='px-1 text-sm text-red-600'>{errors.phoneNo}</div>
        </div>
        <select onChange={(e) => setRole(e.target.value)} className='outline-none border-1 border-gray-500 p-2 rounded-md text-gray-400 focus:border-2 text-sm focus:border-yellow-400'>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {
          (role=="admin")?<div className="relative">
          <input
            type="text"
            value={Secret}
            onChange={(e)=>setSecret(e.target.value)}
            className="peer w-full border border-gray-300 rounded-lg p-3 pt-5 outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder=" "
          />
          <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all 
            peer-placeholder-shown:top-3 
            peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-400
            peer-focus:top-2 peer-focus:text-sm peer-focus:text-yellow-600">
            Secret Key
          </label>
        </div>:<div></div>
        }
        <button className="bg-yellow-400 hover:bg-yellow-500 transition p-3 rounded-lg font-semibold shadow-md hover:cursor-pointer"
        onClick={()=>{setClick(true);const flag=validateData();if(flag)handleRegister()}}>
          Sign Up
        </button>

      </div>
    </div>
  )
}


export default Register