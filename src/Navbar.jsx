import { useEffect, useState } from "react";
import logo from "./assets/tickettap_logo.png";
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Search from "./Search";
import { useNavigate } from "react-router";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const [authorized, setAuthorized] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const func = async () => {
      try {
        await axios.get(`http://localhost:3000/auth/verify`, {
          withCredentials: true,
        });
        setAuthorized(true);
      } catch (err) {
        setAuthorized(false);
      }
    };
    func();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full flex items-center justify-between h-16 bg-white px-3 sm:px-6 lg:px-10 shadow-sm">

        {/* LEFT */}
        <div className="flex items-center gap-4 sm:gap-6">

          {/* Logo */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="h-9 w-9 object-contain" />

            <h1 className="text-lg sm:text-xl font-semibold text-blue-950">
              Ticket
            </h1>

            <h1 className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent text-lg sm:text-xl font-bold">
              Tap
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:block">
            <Search search={search} setSearch={setSearch} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">

          {/* Mobile Search Icon */}
          <button
            className="sm:hidden text-xl"
            onClick={() => setShowSearch(true)}
          >
            <CiSearch />
          </button>

          {/* Location */}
          <div className="hidden sm:flex items-center gap-1 text-gray-600 hover:cursor-pointer"
          onClick={() => navigate("/orders")}>
            <ShoppingBag className="text-blue-800" size={18}/>
            <p className="cursor-pointer text-sm hover:text-black transition">
              Orders
            </p>
          </div>

          {/* Auth Button */}
          <button
            className="
              bg-red-400 hover:bg-red-500
              text-white
              px-3 sm:px-4
              py-1.5
              rounded-md
              text-sm
              font-medium
              transition-all
              active:scale-95
              hover:cursor-pointer
            "
            onClick={() => {
              const func = async () => {
                if (authorized) {
                  await axios.post(
                    "http://localhost:3000/auth/logout",
                    {},
                    { withCredentials: true }
                  );
                  setAuthorized(false);
                } else {
                  navigate(`/login`);
                }
              };
              func();
            }}
          >
            {authorized ? "Sign out" : "Sign in"}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {showSearch && (
        <div className="fixed inset-0 bg-white z-50 p-4">

          {/* Top bar */}
          <div className="flex items-center gap-3 mb-4">

            {/* Back button */}
            <button
              className="text-lg"
              onClick={() => setShowSearch(false)}
            >
              ←
            </button>

            {/* Search */}
            <div className="flex-1">
              <Search search={search} setSearch={setSearch} />
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Navbar;