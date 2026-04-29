import { useLocation, useNavigate, useParams } from "react-router-dom"

const SuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params=useParams()
  const bookingId = params.bookingId
  console.log(bookingId)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-[350px]">

        {/* Icon */}
        <div className="text-5xl mb-4">🎉</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Confirmed
        </h2>

        <p className="text-gray-600 mb-4">
          Your tickets have been booked successfully!
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500">Booking ID</p>
          <h3 className="font-semibold text-lg">{bookingId}</h3>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </button>

      </div>
    </div>
  )
}

export default SuccessPage