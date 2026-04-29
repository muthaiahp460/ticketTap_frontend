
import AddTheater from "../../components/Theater/AddTheater";
import { useEffect, useState } from "react";
import AddScreen from "../../components/Theater/AddScreen";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Analytics from "./Analytics/Analytics";
import ViewTheaters from "./Theaters/ViewTheaters";
import Filter from "./Filter";
import { useAnalytics } from "../../hooks/useAnalytics";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);
  const [filter, setFilter] = useState("1m");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const {analytics}=useAnalytics(filter, startDate, endDate)

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
          <Analytics analytics={analytics}/>
          <Filter filter={filter} setFilter={setFilter}/>
          <ViewTheaters 
          setScreen={setScreen}
          theaterId={selectedTheaterId}
          setSelectedTheaterId={setSelectedTheaterId}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;