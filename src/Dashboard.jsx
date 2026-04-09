import { Home, Film, Building2, Layout, Ticket, Users, CircleUserRound, Theater} from "lucide-react";
import AddTheater from "./components/AddTheater"
import { useState } from "react";
import Search from "./Search";
import ListTheaters from "./components/ListTheaters";
import AddScreen from "./components/AddScreen";

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
        <CircleUserRound size={26} className="hover:cursor-pointer"/>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-2xl shadow">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  const [open,setOpen]=useState(false);
  const [screen,setScreen]=useState(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null)

  return (
    <div className="flex">
      <Sidebar />
      {
        open && <div className="fixed mx-227 my-55">
        <AddTheater setOpen={setOpen}/>
        </div>
      }
      {
        screen && <div className="fixed mx-227 my-55">
        <AddScreen setScreen={setScreen} theaterId={selectedTheaterId}/>
        </div>
      }
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatsCard title="Total Movies" value="24" />
            <StatsCard title="Total Theaters" value="8" />
            <StatsCard title="Bookings Today" value="120" />
            <StatsCard title="Revenue" value="₹45,000" />
          </div>

          {/* Main Sections */}
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Theater Management</h1>
            <div className="flex gap-6">
            <Search/>
          </div>
            <button className="bg-yellow-400 p-2 rounded-md hover:cursor-pointer hover:shadow-xs" 
            onClick={()=>{setOpen(true)}} >Add Theater</button>
          </div>
          <div>
            <ListTheaters setScreen={setScreen} setSelectedTheaterId={setSelectedTheaterId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
