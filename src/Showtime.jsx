import { useNavigate } from "react-router";

const Showtime = ({ shows }) => {
    const navigate=useNavigate()
    console.log(shows)
    return (
        <div className="px-6 px-70 py-10 ">
            <div className="flex flex-col gap-10">
                {
                    Array.from(shows).map(([theaterName, shows]) => {
                        return (
                            <div className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                                
                                {/* Theater Name */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-1">
                                        <img className="h-12 w-12 bg-black rounded-3xl object-cover" src={shows[0].img}></img>
                                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-wide">
                                            {theaterName}
                                        </h2>
                                    </div>

                                    <span className="text-sm text-gray-500 group-hover:text-gray-700 transition">
                                        {shows.length} shows
                                    </span>
                                </div>

                                {/* Divider */}
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5"></div>

                                {/* Show Timings */}
                                <div className="flex flex-wrap gap-4">
                                    {
                                        shows.map((show, index) => (
                                            <button onClick={()=>{navigate(`/show/${show.id}/seatLayout`)}}
                                                key={index}
                                                className="
                                                    px-16 py-3 
                                                    rounded-xl 
                                                    border border-gray-300 
                                                    bg-white
                                                    text-gray-700 font-medium

                                                    hover:bg-black 
                                                    hover:text-white 
                                                    hover:border-black

                                                    active:scale-95
                                                    transition-all duration-200

                                                    shadow-sm hover:shadow-md
                                                "
                                            >
                                                {show.startTime.substring(0, 5)}
                                            </button>
                                        ))
                                    }
                                </div>

                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Showtime;