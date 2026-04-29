import handleSelect from "../../utils/handleSelect"

const SeatItem = ({ seat, index, rowNo, selectedSeats, setSelectedseats, setselectedSeatIds, now }) => {

  if (!seat || !seat.rowNo) {
    return <div className="w-5 h-5 sm:w-7 sm:h-7" />
  }

  const expiryTime = seat.expiresAt ? new Date(seat.expiresAt).getTime() : null

  const isExpired =
    seat.status === "pending" &&
    expiryTime !== null &&
    expiryTime < now

  const isAvailable =
    seat.status === "available" || isExpired

  const isSelected = selectedSeats.includes(seat.id)

  let seatClass =
    "flex items-center justify-center rounded-md text-[9px] sm:text-xs w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-150 "

  if (isSelected) {
    seatClass += "bg-green-500 text-white"
  } else if (isAvailable) {
    seatClass += "border border-green-400 text-green-700 hover:bg-green-100 cursor-pointer"
  } else {
    seatClass += "bg-gray-500 text-white cursor-not-allowed"
  }

  return (
    <div
      onClick={() =>
        handleSelect(
          selectedSeats,
          setSelectedseats,
          setselectedSeatIds,
          seat,
          isAvailable
        )
      }
      className={seatClass}
    >
      {seat.seatNO}
    </div>
  )
}

export default SeatItem