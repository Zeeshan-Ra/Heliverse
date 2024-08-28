import { useDispatch } from "react-redux";
import { IoHome } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { clearAll } from "../store/teamContext";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-full md:w-64 h-full flex flex-col bg-gray-900 text-white">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-cyan-500">TEAMS</h1>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <span className="text-2xl">{open ? "✖" : "☰"}</span>
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className={`flex-1 ${open ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col space-y-2 p-4">
          <li
            className={`flex items-center p-2 rounded-lg cursor-pointer ${currentPath === "/" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            onClick={() => navigate("/")}
          >
            <IoHome className="mr-2 text-xl" />
            Home
          </li>
          <li
            className={`flex items-center p-2 rounded-lg cursor-pointer ${currentPath === "/team" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            onClick={() => navigate("/team")}
          >
            <AiOutlineTeam className="mr-2 text-xl" />
            Team
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
