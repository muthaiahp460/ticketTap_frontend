import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router"
import { Plus } from "lucide-react"

const ViewScreens = () => {
  const { theaterId } = useParams()
  const [screens, setScreens] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // ✅ Group shows by screenId
  const groupByScreen = (shows) => {
    console.log(shows)
    const map = new Map()

    for (let show of shows) {
      console.log("SHOW:", show) // 🔍 debug

      const screenId = show.screenNo

      if (!map.has(screenId)) {
        map.set(screenId, {
          screenId: screenId,
          screenNo: show.screenNo,
          rows: show.rows,
          cols: show.cols,
          shows: []
        })
      }

      map.get(screenId).shows.push(show)
    }

    const result = Array.from(map.values())
    console.log("GROUPED:", result) // 🔍 debug

    return result
  }

  // ✅ Fetch data
  const fetchScreens = async () => {
    if (!theaterId) return

    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/show?theaterId=${theaterId}`,
        { withCredentials: true }
      )

      console.log("RAW DATA:", res.data.data) // 🔍 debug

      if (res.data.message === "success") {
        const groupedData = groupByScreen(res.data.data)
        setScreens(groupedData)
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
          🎬 Screens & Shows
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
        <div className="text-center text-gray-500">Loading...</div>
      ) : screens.length === 0 ? (
        <div className="text-center text-gray-500">
          No screens available
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {screens.map((screen) => (
            <div
              key={screen.screenId} 
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition border"
            >
              {/* Screen Header */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Screen {screen.screenNo}
              </h3>

              <button
                onClick={() =>
                  navigate(`/admin/seat/${screen.screenId}`)
                }
                className="flex justify-center mt-2 w-full bg-yellow-400 text-white py-1 rounded-md hover:bg-yellow-500 transition hover:cursor-pointer"
              >
                <Plus />Add Seat Layout
              </button>

              

              {/* Shows */}
              <div className="space-y-2">
                {screen.shows.map((show, index) => {
                  const movieId =
                    show.movieId ?? show.movie_id ?? "N/A"

                  const showDate = show.showDate
                    ? new Date(show.showDate).toLocaleDateString()
                    : "No Date"

                  return (
                    <div
                      key={`${show.id}-${index}`} // ✅ stable key
                      className="bg-gray-100 p-3 rounded-lg text-sm hover:bg-gray-200 transition"
                    >
                      <p>🎬 Movie ID: {movieId}</p>

                      <p>
                        ⏰ {show.startTime || "-"} -{" "}
                        {show.endTime || "-"}
                      </p>

                      <p>📅 {showDate}</p>

                      <button
                        onClick={() =>
                          navigate(`/show/${show.id}/seatLayout`)
                        }
                        className="mt-2 w-full bg-blue-600 text-white py-1 rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
      
                      >
                        View Seats
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewScreens