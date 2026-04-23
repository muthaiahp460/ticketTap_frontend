import {useEffect, useState } from "react";
import Showtime from "./Showtime";
import { useParams } from "react-router";
import { useMovieDetails } from "./hooks/useMovieDetails";

import ShowListing from "./components/ShowListing";
import MovieBanner from "./components/MovieBanner";
const Page=()=>{
    const {id}=useParams()
    const [selectedDate,setSelectedDate]=useState(null)
    const [movie,shows]=useMovieDetails(id)
    
    return (
        <div className="w-full flex justify-center">

      {/* Centered Container */}
      <div className="w-full max-w-5xl px-3 sm:px-6 lg:px-8">

        {/* Movie Banner */}
        <MovieBanner movie={movie} />

        {/* Date / Show Listing */}
        <ShowListing
          shows={shows}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {/* Status Legend */}
        <div className="mt-4">
          <div className="
            bg-gray-200
            rounded-lg
            py-3 px-4
            flex flex-wrap
            items-center
            gap-4 sm:gap-6 lg:gap-10
            text-sm sm:text-base
          ">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-gray-600">Available</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-400"></div>
              <p className="text-gray-600">Filling fast</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <p className="text-gray-600">Filled</p>
            </div>
          </div>
        </div>

        {/* Showtime */}
        <div className="mt-4">
          {selectedDate && <Showtime shows={selectedDate} />}
        </div>

      </div>
    </div>
    )
}

export default Page;