import { CircleUserRound } from "lucide-react";

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

export default Navbar