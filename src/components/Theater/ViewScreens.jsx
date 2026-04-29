import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate, useParams } from "react-router"
import { useMovies } from "../../hooks/useMovies"

const ViewScreens = () => {
  const { theaterId } = useParams()
  const [screens, setScreens] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const movies = useMovies()

  //  Schedule states
  const [openSchedule, setOpenSchedule] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState(null)
  const [movieId, setMovieId] = useState(null)

  //  Pricing modal states
  const [openPricing, setOpenPricing] = useState(false)
  const [selectedShowId, setSelectedShowId] = useState(null)

  const [pricingForm, setPricingForm] = useState({
    normalPrice: "",
    premiumPrice: "",
    loungePrice: "",
  })

  const setPricing = async () => {
    try {
      const a=await axios.post(
        `http://localhost:3000/seat/price?showId=${selectedShowId}`,
        pricingForm,
        { withCredentials: true }
      )
      toast.success("Pricing set successfully")
      setOpenPricing(false)

      // reset form
      setPricingForm({
        normalPrice: "",
        premiumPrice: "",
        loungePrice: "",
      })
    } catch {
      toast.error("Failed to set pricing")
    }
  }

  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
    showDate: "",
    movie: "",
    screenId: null,
  })

  useEffect(() => {
    setForm((prev) => ({ ...prev, screenId: selectedScreen }))
  }, [selectedScreen])

  //  Add show API
  const addShow = async () => {
    try {
      await axios.post(
        "http://localhost:3000/show",
        {
          movieId,
          screenId: form.screenId,
          startTime: form.startTime,
          endTime: form.endTime,
          showDate: form.showDate,
        },
        { withCredentials: true }
      )
      toast.success("Show added Successfully")
      setTimeout(() => {
        fetchScreens()
      }, 1000)
    } catch {
      toast.error("Unable to add show")
    }
  }

  const [search, setSearch] = useState("")

  const filteredMovies = movies?.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const groupByScreen = (shows) => {
    const map = new Map()

    for (let show of shows) {
      const screenId = show.id

      if (!map.has(screenId)) {
        map.set(screenId, {
          screenId: screenId,
          screenNo: show.screenNo,
          rows: show.rows,
          cols: show.cols,
          shows: [],
        })
      }

      map.get(screenId).shows.push(show)
    }

    return Array.from(map.values())
  }

  const fetchScreens = async () => {
    if (!theaterId) return

    setLoading(true)
    try {
      const res = await axios.get(
        `http://localhost:3000/show?theaterId=${theaterId}`,
        { withCredentials: true }
      )

      if (res.data.message === "success") {
        console.log(res.data.data)
        const groupedData = groupByScreen(res.data.data)
        setScreens(groupedData)
        console.log(groupedData)
      }
    } catch {
      toast.error("Failed to load screens")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchScreens()
  }, [theaterId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <ToastContainer position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎬 Screens & Shows</h2>

        <button
          onClick={fetchScreens}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:cursor-pointer"
        >
          Refresh
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p>Loading...</p>
      ) : screens.length === 0 ? (
        <p>No screens available</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4">
            {screens.map((screen,index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow">          
                <h3 className="font-semibold mb-2">
                  Screen {screen.screenNo}
                </h3>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() =>{
                      navigate(`/admin/seat/${screen.screenId}`)
                    }
                    }
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:cursor-pointer"
                  >
                    Layout
                  </button>
                  <button
                    onClick={() => {
                      setSelectedScreen(screen.screenId)
                      setOpenSchedule(true)
                    }}
                    className="bg-green-600 text-white px-2 py-1 rounded hover:cursor-pointer"
                  >
                    Schedule
                  </button>
                </div>
                {screen.shows.map((show) => (
                  <div key={show.showId} className="bg-gray-100 p-2 mb-2 rounded">
                    <p>🎬 {show.name}</p>
                    <p>⏰ {show.startTime?.slice(0,5)||""} - {show.endTime?.slice(0,5)}</p>
                    <p>
                      📅{" "}
                      {show.showDate
                        ? new Date(show.showDate).toLocaleDateString()
                        : "--:--"}
                    </p>
                    {/* Add Pricing Button */}
                    <button
                      onClick={() => {
                        setSelectedShowId(show.showId)
                        setOpenPricing(true)
                      }}
                      className="border-2 border-blue-500 text-blue-600 px-4 py-1.5 rounded hover:bg-blue-500 hover:text-white transition hover:cursor-pointer"
                    >
                      Add Pricing
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/*  Schedule Modal */}
      {openSchedule && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[350px]">
            
            <h2 className="font-semibold mb-4">Schedule Show</h2>
            <input
              type="date"
              value={form.showDate}
              onChange={(e) =>
                setForm({ ...form, showDate: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="time"
              value={form.startTime}
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="time"
              value={form.endTime}
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Search movie..."
              value={search}
              onClick={() => setOpen(true)}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            {open && (
              <div className="border max-h-32 overflow-y-auto mb-3">
                {filteredMovies?.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setMovieId(m.id)
                      setSearch(m.name)
                      setOpen(false)
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {m.name}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setOpenSchedule(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={addShow}
                className="bg-green-600 text-white px-3 py-1 rounded hover:cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/*  Pricing Modal */}
      {openPricing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          
          <div className="bg-white p-6 rounded-xl w-[350px]">
            
            <h2 className="font-semibold mb-4">Set Pricing</h2>

            <input
              type="number"
              placeholder="Normal Price"
              value={pricingForm.normalPrice}
              onChange={(e) =>
                setPricingForm({ ...pricingForm, normalPrice: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="number"
              placeholder="Premium Price"
              value={pricingForm.premiumPrice}
              onChange={(e) =>
                setPricingForm({ ...pricingForm, premiumPrice: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="number"
              placeholder="Lounge Price"
              value={pricingForm.loungePrice}
              onChange={(e) =>
                setPricingForm({ ...pricingForm, loungePrice: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setOpenPricing(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={setPricing}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:cursor-pointer"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default ViewScreens