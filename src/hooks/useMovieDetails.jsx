import axios from 'axios'
import { useEffect, useState } from "react";
import TransformShows from '../utils/TransformShows';
import { API_BASE_URL } from '../utils/apiConfig';

export const useMovieDetails = (id) => {
  const [movie,setMovie]=useState({})
  const [shows,setShows]=useState(new Map())
  try{
  useEffect(()=>{
    const fetchData=async()=>{
    const movieDetails=await axios.get(`${API_BASE_URL}/movies/id/${id}`)
    const showDetails=await axios.get(`${API_BASE_URL}/movies/${id}/shows`)
    console.log(showDetails.data.data)
    setMovie(movieDetails.data.data)
    setShows(TransformShows(showDetails.data.data))
  }
  fetchData();
  },[id])
  }
  catch(err){
    console.log(err)
  }
  return [movie,shows]
}
