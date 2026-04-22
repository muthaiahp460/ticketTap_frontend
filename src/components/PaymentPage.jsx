import { useEffect, useState } from "react"
import axios from "axios"
import { useLocation, useNavigate, useParams } from "react-router"

const PaymentPage = () => {
  
  const { bookingId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { amount, expiresAt } = location.state
  if (!location.state) {
  alert("Session expired. Please try again.")
  navigate("/")
  return null
  }
  const [timeLeft, setTimeLeft] = useState(0)

  // Timer based on backend expiry
  useEffect(() => {
    const expiry = expiresAt
    console.log(expiry)

    const interval = setInterval(() => {
      const diff = Math.floor((expiry - Date.now()) / 1000)

      if (diff <= 0) {
        clearInterval(interval)
        alert("Time expired! Seats released.")
        navigate("/")
      } else {
        setTimeLeft(diff)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [expiresAt])

  // Create order + open Razorpay
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/booking/create-order",
        { bookingId, amount },
        { withCredentials: true }
      )

      const { orderId } = res.data

      const options = {
        key: "rzp_test_SgbVDUEzNTIhd1", //  replace with your key
        amount: amount * 100,
        currency: "INR",
        name: "Ticket Booking",
        description: "Movie Ticket",

        order_id: orderId,

        handler: async function (response) {
          //  VERIFY PAYMENT
          await axios.post(
            "http://localhost:3000/booking/verify-payment",
            {
              ...response,
              bookingId,
            },
            { withCredentials: true }
          )

          alert("Payment Successful 🎉")
          console.log(bookingId)
          navigate(`/success/${bookingId}`)
        },

        modal: {
          ondismiss: function () {
            alert("Payment cancelled")
          },
        },

        theme: {
          color: "#3399cc",
        },
      }
      if (!window.Razorpay) {
        alert("Payment SDK not loaded")
        return
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error(err)
      alert("Payment failed to start")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500">
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

        {/* Button */}
        <button
          onClick={handlePayment}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-lg hover:opacity-90 transition duration-300 hover:cursor-pointer"
        >
          💳 Pay Now
        </button>

      </div>
    </div>
  )
}

export default PaymentPage