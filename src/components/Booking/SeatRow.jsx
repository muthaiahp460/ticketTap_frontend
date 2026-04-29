import SeatItem from "./SeatItem"

const SeatRow = ({ rowNo, seatList, selectedSeats, setSelectedseats, setselectedSeatIds, now }) => {
  return (
    <div
      className="grid gap-1 sm:gap-2"
      style={{
        gridTemplateColumns: `repeat(${seatList.length}, minmax(26px, 1fr))`
      }}
    >
      {seatList.map((s, index) => (
        <SeatItem
          key={s?.id ?? `${rowNo}-${index}`}
          seat={s}
          index={index}
          rowNo={rowNo}
          selectedSeats={selectedSeats}
          setSelectedseats={setSelectedseats}
          setselectedSeatIds={setselectedSeatIds}
          now={now}
        />
      ))}
    </div>
  )
}

export default SeatRow