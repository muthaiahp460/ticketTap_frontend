import { getWeekDay } from "../utils/date";

const ShowListing = ({ shows, selectedDate, setSelectedDate }) => {
  if (!shows || shows.size === 0) {
    return <p className="text-center mt-6">No shows available</p>;
  }

  return (
    <div className="flex gap-3 px-70 pb-4">
      {Array.from(shows).map(([month, dateMap]) => (
        <div key={month} className="flex items-center gap-3">

          {/* Month */}
          <div className="h-16 w-6 bg-gray-100 flex items-center justify-center rounded-xl">
            <div className="-rotate-90 font-semibold">
              {month.substring(0, 3)}
            </div>
          </div>

          {/* Dates */}
          <div className="flex gap-1">
            {Array.from(dateMap).map(([date, value]) => {
              const isSelected = date === selectedDate;

              return (
                <div
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={
                    isSelected
                      ? "flex flex-col items-center bg-[#202020] text-white justify-center h-16 w-13 m-1 rounded-xl"
                      : "flex flex-col items-center border-2 border-gray-100 justify-center h-16 w-13 m-1 rounded-xl hover:cursor-pointer"
                  }
                >
                  {/* Date */}
                  <div className="font-semibold">{date}</div>

                  {/* Weekday */}
                  <div className={isSelected ? "" : "text-gray-500"}>
                    {getWeekDay(value.day)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowListing;