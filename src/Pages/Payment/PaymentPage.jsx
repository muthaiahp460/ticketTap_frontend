import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { handlePayment } from "./handlePayment"
import { toast, ToastContainer } from "react-toastify"

const PaymentPage = () => {
  const { bookingId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { amount, expiresAt } = location.state || {}

  const [timeLeft, setTimeLeft] = useState(0)

  // Handle missing session safely
  useEffect(() => {
    if (!location.state) {
      toast.error("Session expired. Please try again.")
      navigate("/")
    }
  }, [location.state, navigate])

  // Countdown timer
  useEffect(() => {
    if (!expiresAt) return

    const expiry = new Date(expiresAt).getTime()

    const interval = setInterval(() => {
      const diff = Math.floor((expiry - Date.now()) / 1000)

      if (diff <= 0) {
        clearInterval(interval)
        toast.error("Time expired! Seats released.")
        navigate("/")
      } else {
        setTimeLeft(diff)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresAt, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500">
      <ToastContainer position="top-right"></ToastContainer>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[360px] text-center">

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          🎟️ Complete Payment
        </h2>

        {/* Timer */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">Time Remaining</p>
          <h1 className="text-3xl font-bold text-red-500 mt-1">
            {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </h1>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Total Amount</p>
          <h2 className="text-2xl font-semibold text-gray-800">
            ₹{amount}
          </h2>
        </div>

        {/* Pay Button */}
        <button
          onClick={() => handlePayment(bookingId, amount, navigate)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-lg hover:opacity-90 transition duration-300 hover:cursor-pointer"
        >
          💳 Pay Now
        </button>

      </div>
    </div>
  )
}

export default PaymentPage