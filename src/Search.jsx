import React from 'react'
import { useEffect,useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import axios from 'axios'
const Search = ({search,setSearch}) => {

  return (
    <div>
        <div className="flex items-center w-[600px] px-1 py-0.5 border-1 border-gray-300 rounded-sm">
                <IoMdSearch size={22} className="text-blue-800"/>
                <input type="text" placeholder="Search for movies and theaters" value={search} onChange={(e)=>setSearch(e.target.value)} className="px-0.5 outline-none w-full"></input>
        </div>
    </div>
  )
}

export default Search
