import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import transformSeats from './utils/transformSeats'
import { toast, ToastContainer } from 'react-toastify'

const SeatLayout = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const [seats, setSeats] = useState(new Map())
  const [selectedSeats, setSelectedseats] = useState([])
  const [selectedSeatIds, setselectedSeatIds] = useState([])
  const [price, setPrice] = useState(0)

  // Get current time once per render for consistent comparison across all seats
  const now = Date.now()

  // fetch seats
  const fetchSeats = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/show/${id}/seats`)
      setSeats(transformSeats(result.data.data))
    } catch (error) {
      console.error("Error fetching seats:", error)
    }
  }

  useEffect(() => {
    fetchSeats()
    
    //Setup interval inside the same effect or keep separate
    //const interval = setInterval(fetchSeats, 3000)
    //return () => clearInterval(interval)
  }, [id])

  // handle select
  const handleSelect = (s, isAvailable) => {
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

  // price calculation
  useEffect(() => {
    const calculatePrice = async () => {
      if (selectedSeatIds.length === 0) {
        setPrice(0)
        return
      }
      try {
        const result = await axios.post(
          `http://localhost:3000/show/${id}/seats/price`,
          { seatIds: selectedSeatIds, showId: id }
        )
        setPrice(result.data.price)
      } catch (error) {
        console.error("Price calculation failed", error)
      }
    }
    calculatePrice()
  }, [selectedSeatIds, id])

  // lock seats
  const lockSeats = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/booking`,
        { showId: id, seatIds: selectedSeatIds },
        { withCredentials: true }
      )

      const { bookingId, amount, expiresAt } = res.data

      toast.success("Seats Locked")

      // 🚀 Navigate to payment page
      navigate(`/payment/${bookingId}`, {
        state: { amount, expiresAt }
      })

    } catch {
      toast.error("Unable to lock seats")
    }
  }

  return (
  <div className="w-full flex justify-center min-h-screen bg-gray-50">
    <ToastContainer position="top-right" />

    <div className="w-full max-w-4xl px-3 sm:px-6 flex flex-col pb-24">

      {/* Empty State */}
      {seats.size <= 0 && (
        <div className="text-center text-lg sm:text-2xl mt-10">
          Seat Layout not Found
        </div>
      )}

      {/* Seat Area */}
      <div className="flex-1 flex flex-col justify-center mt-6">

        <div className="flex">

          {/* LEFT: ROW LABELS (FIXED) */}
          <div className="flex flex-col gap-2 sm:gap-3 pr-2">
            {Array.from(seats).reverse().map(([rowNo]) => (
              <div
                key={rowNo}
                className="h-5 sm:h-7 md:h-8 flex items-center justify-center text-[10px] sm:text-xs text-gray-500 font-medium"
              >
                {rowNo}
              </div>
            ))}
          </div>

          {/* RIGHT: SCROLLABLE SEATS */}
          <div className="overflow-x-auto w-full">
            <div className="flex flex-col gap-2 sm:gap-3 min-w-max">

              {Array.from(seats).reverse().map(([rowNo, seatList]) => (
                <div
                  key={rowNo}
                  className="grid gap-1 sm:gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${seatList.length}, minmax(26px, 1fr))`
                  }}
                >
                  {seatList.map((s, index) => {
                    if (!s || !s.rowNo) {
                      return (
                        <div
                          key={`${rowNo}-gap-${index}`}
                          className="w-5 h-5 sm:w-7 sm:h-7"
                        />
                      );
                    }

                    const expiryTime = s.expiresAt
                      ? new Date(s.expiresAt).getTime()
                      : null;

                    const isExpired =
                      s.status === "pending" &&
                      expiryTime !== null &&
                      expiryTime < now;

                    const isAvailable =
                      s.status === "available" || isExpired;

                    const isSelected = selectedSeats.includes(s.id);

                    let seatClass =
                      "flex items-center justify-center rounded-md text-[9px] sm:text-xs w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-150 ";

                    if (isSelected) {
                      seatClass += "bg-green-500 text-white";
                    } else if (isAvailable) {
                      seatClass +=
                        "border border-green-400 text-green-700 hover:bg-green-100 cursor-pointer";
                    } else {
                      seatClass +=
                        "bg-gray-500 text-white cursor-not-allowed";
                    }

                    return (
                      <div
                        key={s.id ?? `${rowNo}-${index}`}
                        onClick={() => handleSelect(s, isAvailable)}
                        className={seatClass}
                      >
                        {s.seatNO}
                      </div>
                    );
                  })}
                </div>
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

      {/* Legend */}
      <div className="flex justify-center gap-4 sm:gap-6 mt-3 text-[10px] sm:text-sm flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>Selected</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-green-400 rounded-sm"></div>
          <span>Available</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
          <span>Booked</span>
        </div>
      </div>

    </div>

    {/* Sticky CTA */}
    {selectedSeats.length > 0 && (
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-center shadow-md">
        <button
          className="bg-red-500 px-6 py-3 rounded-lg text-white font-medium w-full max-w-md hover:bg-red-600 active:scale-95 transition-all"
          onClick={lockSeats}
        >
          {`Proceed to pay ₹${price}`}
        </button>
      </div>
    )}
  </div>
);
}

export default SeatLayout