import { toast } from "react-toastify"

const handleSelect = (selectedSeats,setSelectedseats,setselectedSeatIds,s, isAvailable) => {
    if (!s || !s.rowNo || !s.seatNO || !isAvailable) return

    if (selectedSeats.includes(s.id)) {
      setSelectedseats(prev => prev.filter(x => x !== s.id))
      setselectedSeatIds(prev => prev.filter(x => x !== s.seatId))
    } else {
      if (selectedSeats.length >= 10) {
        toast.warn("Maximum 10 seats allowed")
      } else {
        setselectedSeatIds(prev => [...prev, s.seatId])
        setSelectedseats(prev => [...prev, s.id])
      }
    }
}

export default handleSelect;