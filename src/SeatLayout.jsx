import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import transformSeats from './utils/transformSeats'
import { toast, ToastContainer } from 'react-toastify'

const SeatLayout = () => {
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
    const interval = setInterval(fetchSeats, 3000)
    return () => clearInterval(interval)
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
      await axios.post(
        `http://localhost:3000/booking`,
        { showId: id, seatIds: selectedSeatIds },
        { withCredentials: true }
      )
      toast.success("Seats Locked")
      await fetchSeats()
      setSelectedseats([])
      setselectedSeatIds([])
    } catch {
      toast.error("Unable to lock seats")
    }
  }

  return (
    <div>
      <ToastContainer position='top-right' />

      {seats.size <= 0 && (
        <div className='text-center text-2xl mt-10'>Seat Layout not Found</div>
      )}

      <div className='flex flex-col gap-6 items-center m-4'>
        {Array.from(seats).map(([rowNo, seatList]) => (
          <div
            key={rowNo}
            className='grid gap-3 items-center'
            style={{
              gridTemplateColumns: `40px repeat(${seatList.length}, 32px)`
            }}
          >
            <p className='w-6 font-semibold'>{rowNo}</p>

            {seatList.map((s, index) => {
              if (!s || !s.rowNo) {
                return <div key={`${rowNo}-gap-${index}`} className='w-8 h-8' />
              }

              

              const expiryTime = s.expiresAt
  ? new Date(s.expiresAt).getTime()
  : null;

              if(rowNo=="K")
              console.log(`Seat ${s.seatNO} - Status: ${s.status}, Expiry: ${expiryTime}, Now: ${now} ,expiresAr:${s.expiresAt}`)
              const isExpired =
                s.status === "pending" &&
                expiryTime !== null &&
                expiryTime < now

              const isAvailable = s.status === "available" || isExpired
              // ----------------------

              return (
                <div
                  key={s.id ?? `${rowNo}-${index}`}
                  className={
                    selectedSeats.includes(s.id)
                      ? 'w-8 h-8 flex items-center justify-center text-sm rounded-md bg-green-500 text-white cursor-pointer'
                      : isAvailable
                        ? "w-8 h-8 flex items-center justify-center text-sm rounded-md border-2 border-green-300 cursor-pointer hover:bg-green-50"
                        : "w-8 h-8 flex items-center justify-center text-sm rounded-md bg-gray-600 text-white pointer-events-none"
                  }
                  onClick={() => handleSelect(s, isAvailable)}
                >
                  {s.seatNO}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <button
          className='bg-red-500 py-2 px-4 rounded-md my-8 mx-auto block text-white hover:cursor-pointer hover:bg-red-600 transition-colors'
          onClick={lockSeats}
        >
          {`Proceed to pay ₹${price}`}
        </button>
      )}
    </div>
  )
}

export default SeatLayout