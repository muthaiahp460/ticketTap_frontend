import axios from "axios";
import { useEffect, useState } from "react";
import Showtime from "./Showtime";
import { useParams } from "react-router";

const Page=()=>{
    const {id}=useParams()
    const [movie,setMovie]=useState({})
    const [shows,setShows]=useState(new Map())
    const [selectedDate,setSelectedDate]=useState(null)
    const transformData = (shows) => {
        const data = new Map();
        for (let show of shows) {
            const { month, date, theaterName } = show;

            if (!data.has(month)) {
            data.set(month, new Map());
            }
            const monthMap = data.get(month)

            if (!monthMap.has(date)) {
            monthMap.set(date, new Map())
            }
            const dateMap = monthMap.get(date)

            if (!dateMap.has(theaterName)) {
            dateMap.set(theaterName, []);
            }

            dateMap.get(theaterName).push(show)
        }
        return data;
    }
    
    const getMovieById=()=>{
        axios.get(`http://localhost:3000/movies/${id}`).then(
            (movie)=>setMovie(movie.data.data)
        ).catch(
            (e)=>console.log(e)
        )
    }
    const getShows=()=>{
        axios.get(`http://localhost:3000/movies/${id}/shows`).then(
            (shows)=>{
                
                shows=shows.data.data
                setShows(transformData(shows))
                console.log(shows)
        }
        ).catch(
            (e)=>console.log(e)
        )
    }

    useEffect(()=>{
        getMovieById()
        getShows()
    },
    [id])

    const weekDay=(day)=>{
        if(day==0) return "Mon"
        else if(day==1) return "Tue"
        else if(day==2) return "Wed"
        else if(day==3) return "Thu"
        else if(day==4) return "Fri"
        else if(day==5) return "Sat"
        else return "sun"
    }

    return (
        <div>
            <div className="flex flex-col gap-6 ">
                <div className="flex px-70 pt-10">
                    <div className="h-[195px] w-[140px]">
                        <img src={movie.movieImg} className="h-full w-full rounded-2xl"></img>
                    </div>
                    <div className="my-10 mx-6">
                        <h1 style={{ fontFamily: 'Inter, sans-serif' }}className="text-3xl font-semibold ">{movie.name}</h1>
                        <div className="my-4 flex gap-2">
                            <span className="text-sm text-gray-600 px-1">{movie.certificate} | {movie.language} | {movie.genre} | {`${Math.floor(movie.duration/60)}hr ${Math.floor(movie.duration%60)}min`}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 px-70 pb-4">
                {
                    Array.from(shows).map(([month,dateMap]) => (
                        <div key={month} className="flex items-center gap-3">
                            <div
                            className="h-16 w-6 bg-gray-100 flex items-center justify-center rounded-xl">
                                <div className="-rotate-90 font-semibold">
                                    {month.substring(0,3)}
                                </div>
                            </div>
                            <div className="flex gap-1">
                            {
                                Array.from(dateMap).map(([date,theaterMap])=>(
                                    <div key={date} onClick={()=>setSelectedDate(theaterMap)}
                                     className={(theaterMap==selectedDate)?"flex flex-col items-center  bg-[#202020] text-white justify-center h-16 w-13 m-1 rounded-xl"
                                     :"flex flex-col items-center border-2 border-gray-100 justify-center h-16 w-13 m-1 rounded-xl hover:cursor-pointer"}>
                                        <div className="font-semibold">{date}</div>
                                        <div className={(theaterMap==selectedDate)?"":"text-gray-500"}>{weekDay(theaterMap.day)}</div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
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
            <div className="">
                    {selectedDate && <Showtime shows={selectedDate}/>}
            </div>
        </div>
    )
}

export default Page;