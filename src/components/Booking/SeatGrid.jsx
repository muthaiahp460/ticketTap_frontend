import SeatRow from "./SeatRow"
const SeatGrid = ({ seats, selectedSeats, setSelectedseats, setselectedSeatIds, now }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        {/* LEFT: ROW LABELS */}
        <div className="flex flex-col gap-2 sm:gap-3 pr-2">
          {Array.from(seats).reverse().map(([rowNo]) => (
            <div key={rowNo} className="h-5 sm:h-7 md:h-8 flex items-center justify-center text-[10px] sm:text-xs text-gray-500 font-medium">
              {rowNo}
            </div>
          ))}
        </div>
        {/* RIGHT: SEATS */}
        <div className="overflow-x-auto w-full">
          <div className="flex flex-col gap-2 sm:gap-3 min-w-max">
            {Array.from(seats).reverse().map(([rowNo, seatList]) => (
              <SeatRow
                key={rowNo}
                rowNo={rowNo}
                seatList={seatList}
                selectedSeats={selectedSeats}
                setSelectedseats={setSelectedseats}
                setselectedSeatIds={setselectedSeatIds}
                now={now}
              />
            ))}
          </div>
        </div>
      </div>
      {/* SCREEN */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-2/3 sm:w-1/2 h-5 sm:h-6 bg-gradient-to-t from-gray-400 to-gray-200 rounded-t-full shadow-md"></div>
        <div className="w-1/2 h-2 bg-gray-300 blur-sm opacity-60 mt-1 rounded-full"></div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2 tracking-widest">
        SCREEN THIS WAY
        </p>
      </div>
    </div>
  )
}

export default SeatGrid