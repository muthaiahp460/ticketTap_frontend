import { Home, Film, Building2, Layout, Ticket, Users} from "lucide-react";
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

export default Sidebar