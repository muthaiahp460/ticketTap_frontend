import { useEffect, useState } from "react";
import { getWeekDay } from "../utils/date";

const ShowListing = ({ shows, selectedDate, setSelectedDate }) => {

  useEffect(()=>{
    const mapData = shows.get(0);
    const firstmonth=shows.entries().next().value
    const firstdate = firstmonth?.[1]?.values().next().value;
    console.log(firstdate)
    if(firstdate)
      setSelectedDate(firstdate)
  },[shows])

  if (!shows || shows.size === 0) {
    return <p className="text-center mt-6">No shows available</p>;
  }
  
  //setSelectedDate(firstdate)
  return (
    <div className="w-full px-3 sm:px-6 lg:px-12 pb-4 overflow-x-auto">
  <div className="flex gap-4 min-w-max">

    {Array.from(shows).map(([month, dateMap]) => (
      <div key={month} className="flex items-center gap-3">

        {/* Month */}
        <div className="
          h-14 w-6 sm:h-16 
          bg-gray-100 
          flex items-center justify-center 
          rounded-lg sm:rounded-xl
        ">
          <div className="-rotate-90 text-xs sm:text-sm font-semibold">
            {month.substring(0, 3)}
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-2">

          {Array.from(dateMap).map(([date, value]) => {
            const isSelected = value === selectedDate;

            return (
              <div
                key={date}
                onClick={() => setSelectedDate(value)}
                className={`
                  flex flex-col items-center justify-center
                  min-w-[48px] sm:min-w-[56px]
                  h-14 sm:h-16
                  px-2
                  rounded-lg sm:rounded-xl
                  text-xs sm:text-sm
                  transition-all duration-200
                  ${isSelected
                    ? "bg-[#202020] text-white shadow-md"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  }
                `}
              >
                {/* Date */}
                <div className="font-semibold">{date}</div>

                {/* Weekday */}
                <div className={isSelected ? "text-gray-200" : "text-gray-500"}>
                  {getWeekDay(value.day)}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    ))}

  </div>
</div>
  );
};

export default ShowListing;