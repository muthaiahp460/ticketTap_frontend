import axios from 'axios'
import { useState,useEffect } from 'react'
import { API_BASE_URL } from '../utils/apiConfig'
export const useMovies = (search) => {
  const [movies,setMovies]=useState([])
  useEffect(()=>{
    const fetchMovies=async()=>{
    try{
        let result
        if(search && search.trim()!==""){
            result=await axios.get(`${API_BASE_URL}/movies`,{
                params:{
                name:search
                }
            })
        }
        else{
            result=await axios.get(`${API_BASE_URL}/movies`)
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

