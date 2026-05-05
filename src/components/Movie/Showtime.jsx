import { useNavigate } from "react-router";

const Showtime = ({ shows }) => {
  const navigate = useNavigate();

  if (!shows || !shows.shows || shows.shows.length === 0) {
    return <p className="text-center mt-6">No shows available</p>;
  }

  // Convert to grouped format
  const groupedShows = shows.shows.reduce((acc, show) => {
    const theaterName = show.theaterName || "Unknown Theater";

    if (!acc[theaterName]) {
      acc[theaterName] = [];
    }

    acc[theaterName].push(show);
    return acc;
  }, {});

  return (
    <div className="w-full px-3 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col gap-6 sm:gap-8">

        {Object.entries(groupedShows).map(([theaterName, showList]) => {

          if (!showList || showList.length === 0) return null;

          return (
            <div
              key={theaterName}
              className="
                group relative 
                bg-white/70 backdrop-blur-lg 
                border border-gray-200 
                rounded-2xl sm:rounded-3xl 
                p-4 sm:p-6 
                shadow-sm hover:shadow-xl 
                transition-all duration-300
              "
            >

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">

                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl object-cover"
                    src={showList[0]?.img || ""}
                    alt={theaterName}
                  />
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                    {theaterName}
                  </h2>
                </div>

                <span className="text-xs sm:text-sm text-gray-500">
                  {showList.length} shows
                </span>

              </div>

              <div className="h-[1px] w-full bg-gray-300 mb-4 sm:mb-5"></div>

              {/* Show timings */}
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">

                {showList.map((show) => (
                  <button
                    key={show.id}
                    onClick={() => navigate(`/show/${show.id}/seatLayout`)}
                    className="
                      px-4 sm:px-6 md:px-8 
                      py-2 sm:py-2.5 md:py-3
                      rounded-lg sm:rounded-xl 
                      border border-gray-300 
                      bg-white 
                      text-gray-700 
                      text-sm sm:text-base
                      font-medium 
                      hover:bg-black hover:text-white hover:border-black 
                      active:scale-95 
                      transition-all duration-200 
                      shadow-sm hover:shadow-md
                    "
                  >
                    {show.startTime?.substring(0, 5)}
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