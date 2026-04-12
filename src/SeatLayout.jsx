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

  const handleSelect = (s) => {
    // 🔥 ignore gaps
    if (!s || !s.rowNo || !s.seatNO) return

    if (s.status === "available") {
      if (selectedSeats.includes(s.id)) {
        setSelectedseats(selectedSeats.filter((x) => x !== s.id))
        setselectedSeatIds(selectedSeatIds.filter((x) => x !== s.seatId))
      } else {
        if (selectedSeats.length >= 10) {
          console.log("max limit reached")
        } else {
          setselectedSeatIds([...selectedSeatIds, s.seatId])
          setSelectedseats([...selectedSeats, s.id])
        }
      }
    }
  }

  // 🔥 price calculation
  useEffect(() => {
    const calculatePrice = async () => {
      if (selectedSeatIds.length === 0) {
        setPrice(0)
        return
      }

      const result = await axios.post(
        `http://localhost:3000/show/${id}/seats/price`,
        {
          seatIds: selectedSeatIds,
          showId: id
        }
      )
      
      setPrice(result.data.price)
    }

    calculatePrice()
  }, [selectedSeatIds])

  // 🔥 fetch seats
  useEffect(() => {
    const func = async () => {
      const result = await axios.get(
        `http://localhost:3000/show/${id}/seats`
      )
      console.log(result.data.data)
      setSeats(transformSeats(result.data.data))
    }

    func()
  }, [])

  const lockSeats = () => {
    try{
    axios.post(
      `http://localhost:3000/booking`,
      {
        showId: id,
        seatIds: selectedSeatIds
      },
      { withCredentials: true }
    )
    toast.success("Seats Locked")
  }
  catch{
    toast.error("Unable to lock seats")
  }

  }

  return (
    <div>
      <ToastContainer position='top-right'></ToastContainer>
      {(seats.size<=0)?<div className='text-center text-2xl'>Seat Layout not Found</div>:""}
      <div className='flex flex-col gap-6 items-center m-4'>

        {
          Array.from(seats).map(([rowNo, seat]) => (
            <div
              key={rowNo}
              className='grid gap-3 items-center'
              style={{
                gridTemplateColumns: `40px repeat(${seat.length}, 32px)`
              }}
            >
              
              {/* Row Label */}
              <p className='w-6 font-semibold'>{rowNo}</p>

              {
                seat.map((s, index) => {

                  // 🔥 GAP (empty space)
                  if (!s || !s.rowNo) {
                    return (
                      <div
                        key={`${rowNo}-gap-${index}`}
                        className='w-8 h-8  rounded-md'
                      />
                    )
                  }

                  return (
                    <div
                      key={s.id ?? `${rowNo}-${index}`}
                      className={
                        (selectedSeats.includes(s.id))
                          ? 'w-8 h-8 flex items-center justify-center text-sm rounded-md bg-green-500 text-white cursor-pointer'
                          : (s.status === "available")
                            ? "w-8 h-8 flex items-center justify-center text-sm rounded-md border-2 border-green-300 cursor-pointer"
                            : "w-8 h-8 flex items-center justify-center text-sm rounded-md bg-gray-600 text-white"
                      }
                      onClick={() => handleSelect(s)}
                    >
                      {s.seatNO}
                    </div>
                  )
                })
              }

            </div>
          ))
        }

      </div>

      {
        selectedSeats.length > 0 &&
        <button
          className='bg-red-500 py-2 px-4 rounded-md my-8 mx-auto block text-white hover:cursor-pointer'
          onClick={() => lockSeats()}
        >
          {`Proceed to pay ₹${price}`}
        </button>
      }

    </div>
  )
}

export default SeatLayout