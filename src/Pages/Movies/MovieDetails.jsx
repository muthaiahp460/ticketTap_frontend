import {useEffect, useState } from "react";
import Showtime from "../../components/Movie/Showtime";
import { useParams } from "react-router";
import { useMovieDetails } from "../../hooks/useMovieDetails";

import ShowListing from "../../components/Movie/ShowListing";
import MovieBanner from "../../components/Movie/MovieBanner";
import ShimmerMoviePage from "../../Shimmer/ShimmerMoviePage";
import BarLine from "./BarLine";
const MovieDetails=()=>{
    const {id}=useParams()
    const [selectedDate,setSelectedDate]=useState(null)
    const [movie,shows]=useMovieDetails(id)
    if(!movie)
      return <ShimmerMoviePage/>
    return (
      <div className="w-full flex justify-center">

          <div className="w-full max-w-5xl px-3 sm:px-6 lg:px-8">
            <MovieBanner movie={movie} />
            <ShowListing
              shows={shows}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

          <BarLine/>
            {/* Showtime */}
              {selectedDate && <Showtime shows={selectedDate} />}

          </div>
    </div>
    )
}

export default MovieDetails;


