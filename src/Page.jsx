import axios from "axios";
import {useState } from "react";
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
        <div>
            <MovieBanner movie={movie}/>
            <ShowListing shows={shows} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

            <div className="bg-gray-200 h-6 mx-64 my-2 px-3 py-4 flex items-center gap-8">
                <div className="flex items-center">
                    <div className="h-2 w-2 rounded-2xl bg-green-500"></div>
                    <p className="text-gray-600 px-0.5">Available</p>
                </div>
                <div className="flex items-center">
                    <div className="h-2 w-2 rounded-2xl bg-orange-400"></div>
                    <p className="text-gray-600 px-0.5">Filling fast</p>
                </div>
                <div className="flex items-center">
                    <div className="h-2 w-2 rounded-2xl bg-red-500"></div>
                    <p className="text-gray-600 px-0.5">Filled</p>
                </div>
            </div>

            <div>{selectedDate && <Showtime shows={selectedDate}/>}</div>
        </div>
    )
}

export default Page;