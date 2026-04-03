import axios from 'axios'
import { useEffect, useState } from "react";
import TransformShows from '../utils/TransformShows';

export const useMovieDetails = (id) => {
  const [movie,setMovie]=useState({})
  const [shows,setShows]=useState(new Map())
  try{
  useEffect(()=>{
    const fetchData=async()=>{
    const movieDetails=await axios.get(`http://localhost:3000/movies/${id}`)
    const showDetails=await axios.get(`http://localhost:3000/movies/${id}/shows`)
    setMovie(movieDetails.data.data)
    setShows(TransformShows(showDetails.data.data))
  }
  fetchData();
  },[id])
  console.log(movie)
  }
  catch(err){
    console.log(err)
  }
  return [movie,shows]
}
