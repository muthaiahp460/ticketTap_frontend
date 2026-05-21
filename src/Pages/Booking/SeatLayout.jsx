import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import transformSeats from '../../utils/transformSeats'
import { toast, ToastContainer } from 'react-toastify'
import { calculatePrice } from '../../utils/calculatePrice'
import SeatGrid from "../../components/Booking/SeatGrid"
import BookingFooter from "../../components/Booking/BookingFooter"
import { API_BASE_URL } from '../../utils/apiConfig'

const SeatLayout = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const [seats, setSeats] = useState(new Map())
  const [selectedSeats, setSelectedseats] = useState([])
  const [selectedSeatIds, setselectedSeatIds] = useState([])
  const [price,setPrice]=useState(0)
  const [locking, setLocking] = useState(false)
  const now = new Date()

  // fetch seats
  const fetchSeats = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/show/${id}/seats`)
      setSeats(transformSeats(result.data.data))
    } catch (_error) {
      // Error handled silently
    }
  }

  useEffect(() => {
    fetchSeats()
    // Setup interval inside the same effect or keep separate
    // const interval = setInterval(fetchSeats, 3000)
    // return () => clearInterval(interval)
  }, [id])

  // price calculation
  useEffect(() => {
    const getPrice = async () => {
      const total = await calculatePrice(id, selectedSeatIds)
      setPrice(total)
    }
    getPrice()
  }, [selectedSeatIds, id])

  // lock seats
  const lockSeats = async () => {
    if (selectedSeatIds.length === 0) {
      toast.error("Please select seats first")
      return
    }

    if (locking) return
    
    setLocking(true)
    try {
      const res = await axios.post(
        `${API_BASE_URL}/booking`,
        { showId: id, seatIds: selectedSeatIds },
        { withCredentials: true }
      )

      const { bookingId, amount, expiresAt } = res.data?.data || res.data

      if (!bookingId) {
        toast.error("Invalid response from server")
        setLocking(false)
        return
      }

      toast.success("Seats Locked Successfully!")

      //  Navigate to payment page
      setTimeout(() => {
        navigate(`/payment/${bookingId}`, {
          state: { amount, expiresAt }
        })
      }, 500)

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Unable to lock seats. Please try again."
      toast.error(errorMsg)
      console.error("Seat locking error:", error)
      setLocking(false)
    }
  }

  return (
  <div className="w-full flex justify-center min-h-screen bg-gray-50 p-8">
    <ToastContainer position='top-right'></ToastContainer>
    <div className="w-full max-w-4xl px-3 sm:px-6 flex flex-col pb-24">

      <SeatGrid
        seats={seats}
        selectedSeats={selectedSeats}
        setSelectedseats={setSelectedseats}
        setselectedSeatIds={setselectedSeatIds}
        now={now}
      />

    </div>

    <BookingFooter
      selectedSeats={selectedSeats}
      price={price}
      lockSeats={lockSeats}
      locking={locking}
    />

  </div>
)
}

export default SeatLayout