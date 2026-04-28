import { Home, Film, Building2, Layout, Ticket, Users, CircleUserRound } from "lucide-react";
import AddTheater from "./components/AddTheater";
import { useEffect, useState } from "react";
import Search from "./Search";
import ListTheaters from "./components/ListTheaters";
import AddScreen from "./components/AddScreen";
import axios from "axios";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", icon: <Home /> },
    { name: "Movies", icon: <Film /> },
    { name: "Theaters", icon: <Building2 /> },
    { name: "Screens", icon: <Layout /> },
    { name: "Shows", icon: <Ticket /> },
    { name: "Users", icon: <Users /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li key={index} className="flex items-center gap-3 cursor-pointer hover:text-yellow-400">
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <input
        type="text"
        placeholder="Search movies, theaters..."
        className="border px-3 py-2 rounded w-1/3"
      />
      <div className="flex items-center gap-4">
        <span className="font-semibold">Admin</span>
        <CircleUserRound size={26} className="hover:cursor-pointer" />
      </div>
    </div>
  );
};

const StatsCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-2xl font-bold">{value || 0}</p>
  </div>
);

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [analytics, setAnalytics] = useState({});

  const [filter, setFilter] = useState("1m");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      let start = startDate;
      let end = endDate;

      const today = new Date();

      if (filter === "1m") {
        const d = new Date();
        d.setMonth(today.getMonth() - 1);
        start = d.toISOString().split("T")[0];
        end = today.toISOString().split("T")[0];
      }

      if (filter === "3m") {
        const d = new Date();
        d.setMonth(today.getMonth() - 3);
        start = d.toISOString().split("T")[0];
        end = today.toISOString().split("T")[0];
      }

      if (filter === "1y") {
        const d = new Date();
        d.setFullYear(today.getFullYear() - 1);
        start = d.toISOString().split("T")[0];
        end = today.toISOString().split("T")[0];
      }

      const res = await axios.get(
        `http://localhost:3000/analysis/theater?startDate=${start}&endDate=${end}`,
        { withCredentials: true }
      );

      setAnalytics(res.data);
    };

    fetchAnalytics();
  }, [filter, startDate, endDate]);

  return (
    <div className="flex">
      <Sidebar />

      {open && (
        <div className="fixed mx-227 my-55">
          <AddTheater setOpen={setOpen} />
        </div>
      )}

      {screen && (
        <div className="fixed mx-227 my-55">
          <AddScreen setScreen={setScreen} theaterId={selectedTheaterId} />
        </div>
      )}

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6 space-y-6">

          <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">
            <h2 className="font-semibold text-gray-700">Analytics</h2>

            <div className="flex items-center gap-3">
              {[
                { label: "1M", value: "1m" },
                { label: "3M", value: "3m" },
                { label: "1Y", value: "1y" },
                { label: "Custom", value: "custom" }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                  ${
                    filter === item.value
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {filter === "custom" && (
                <div className="flex items-center gap-2 ml-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border px-2 py-1 rounded-md text-sm"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border px-2 py-1 rounded-md text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatsCard title="Total Movies" value={analytics.movieCount} />
            <StatsCard title="Total Theaters" value={analytics.totalTheaters} />
            <StatsCard title="Bookings" value={analytics.bookingCount} />
            <StatsCard title="Revenue" value={analytics.totalRevenue} />
          </div>

          {/* Theater Section */}
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Theater Management</h1>

            <div className="flex gap-6">
              <Search />
            </div>

            <button
              className="bg-yellow-400 p-2 rounded-md hover:cursor-pointer hover:shadow-xs"
              onClick={() => setOpen(true)}
            >
              Add Theater
            </button>
          </div>

          <div>
            <ListTheaters
              setScreen={setScreen}
              theaterId={selectedTheaterId}
              setSelectedTheaterId={setSelectedTheaterId}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;