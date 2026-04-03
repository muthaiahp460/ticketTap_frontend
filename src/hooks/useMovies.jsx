import axios from 'axios'
import { useState,useEffect } from 'react'
export const useMovies = (search) => {
  const [movies,setMovies]=useState([])
  useEffect(()=>{
    const fetchMovies=async()=>{
    try{
        let result
        if(search && search.trim()!==""){
            result=await axios.get("http://localhost:3000/movies",{
                params:{
                name:search
                }
            })
        }
        else{
            result=await axios.get("http://localhost:3000/movies")
        }
        setMovies(result.data.data)
    }
    catch(err){
        console.log(err)
    }
    }
    fetchMovies()
  },[search])
  return movies;
}

