import { useNavigate } from "react-router";

const Showtime = ({ shows }) => {
  const navigate = useNavigate();

  // 🔥 Safety checks
  if (!shows || shows.size === 0) {
    return <p className="text-center mt-6">No shows available</p>;
  }

  return (
    <div className="px-70 py-10">
      <div className="flex flex-col gap-10">

        {Array.from(shows).map(([theaterName, showList]) => {
          
          // 🔥 Skip empty groups
          if (!showList || showList.length === 0) return null;

          return (
            <div
              key={theaterName}
              className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Theater Header */}
              <div className="flex items-center justify-between mb-4">
                
                <div className="flex items-center gap-2">
                  <img
                    className="h-12 w-12 rounded-3xl object-cover"
                    src={showList[0]?.img || ""}
                    alt={theaterName}
                  />

                  <h2 className="text-xl font-semibold text-gray-800">
                    {theaterName}
                  </h2>
                </div>

                <span className="text-sm text-gray-500">
                  {showList.length} shows
                </span>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gray-300 mb-5"></div>

              {/* Show Timings */}
              <div className="flex flex-wrap gap-4">
                {showList.map((show) => (
                  <button
                    key={show.id}
                    onClick={() =>
                      navigate(`/show/${show.id}/seatLayout`)
                    }
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
                ))}
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Showtime;