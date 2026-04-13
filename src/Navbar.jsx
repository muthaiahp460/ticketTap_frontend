import {useEffect, useState } from "react";
import logo from "./assets/tickettap_logo.png"
import { CiLocationOn } from "react-icons/ci";
import Search from "./Search";
import { useNavigate } from "react-router";
import axios from "axios";


const Navbar = ({search,setSearch}) => {
  const navigate=useNavigate()
  const [movies,setMovies]=useState([])
  const [authorized,setAuthorized]=useState(false)
  useEffect(()=>{
    const func=async()=>{
      try{
        await axios.get(`http://localhost:3000/auth/verify`,{withCredentials:true})
        setAuthorized(true)
      }
      catch(err){
        console.log(err)
        setAuthorized(false)
      }
    }
    func()
  },[])
  return (
    <div className="flex items-center justify-between h-16 bg-white min-w-screen overflow-hidden px-16 py-2 shadow-2xs">

        <div className="flex gap-6">
          <div className="flex justify-center items-center hover:cursor-pointer">
            <img src={logo} className="object-contain h-10 w-10 "></img>
            <h1 className="text-xl font-sans font-semibold text-blue-950">Ticket</h1>
            <h1 className="bg-linear-to-r from-yellow-300 to-orange-500
            bg-clip-text text-transparent
            text-xl font-bold font-sans p-1">Tap</h1>
          </div>
          <Search search={search} setSearch={setSearch}/>
        </div>
        <div className="flex gap-10">
          <div className="flex items-center">
            <CiLocationOn size={18}  className="text-blue-800"/>
            <p className="hover:cursor-pointer">select your location</p>
          </div>
          <button className="bg-[#fc7474] px-2 py-0.5 rounded-sm text-white hover:cursor-pointer" 
          onClick={()=>{
            const func=async()=>{
            if(authorized){
              await axios.post("http://localhost:3000/auth/logout",{},{withCredentials:true})
              setAuthorized(false)
            }
            else
              navigate(`/login`)
          }
          func()
          }}>
            {authorized?"sign  out":"sign in"}
          </button>
        </div>
    </div>
  )
};

export default Navbar;