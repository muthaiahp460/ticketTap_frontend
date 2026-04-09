import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useParams } from "react-router"

const ViewScreens = () => {
  const { theaterId } = useParams()
  const [screens, setScreens] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchScreens = async () => {
    if (!theaterId) return

    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/screen?theaterId=${theaterId}`,
        { withCredentials: true }
      )

      if (res.data.message === "success") {
        setScreens(res.data.data)
      }
    } catch (err) {
      console.log(err.response?.data || err.message)
      toast.error("Failed to load screens")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScreens()
  }, [theaterId])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          🎬 Screens
        </h2>

        <button
          onClick={fetchScreens}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-500">Loading screens...</div>
      ) : screens.length === 0 ? (
        <div className="text-center text-gray-500">
          No screens available
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {screens.map((screen) => {

            return (
              <div
                key={screen.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300 border"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Screen {screen.screenNo}
                  </h3>

                  
                </div>

                {/* Info */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    🎟 Rows:{" "}
                    <span className="font-medium">
                      {screen.rows ?? "-"}
                    </span>
                  </p>
                  <p>
                    📏 Columns:{" "}
                    <span className="font-medium">
                      {screen.cols ?? "-"}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition">
                    View
                  </button>

                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Setup
                    </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ViewScreens