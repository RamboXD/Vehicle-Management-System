import { Link } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GrVmMaintenance } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FaWheelchairMove } from "react-icons/fa6";
const Sidebar: React.FC = () => {
  const role = localStorage.getItem("role")
    ? localStorage.getItem("role")
    : "admin";
  return (
    <aside className="sticky top-0 h-full min-w-fit w-80 text-gray-800 p-4 shadow-sm border-r">
      <nav className="space-y-2">
        {role === "admin" && (
          <>
            <Link
              to="/admin/drivers"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <FaWheelchairMove />
              <span className="text-md font-medium">Drivers</span>
            </Link>
            <Link
              to="/admin/fuels"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <BsFillFuelPumpFill />
              <span className="text-md font-medium">Fueling people</span>
            </Link>
            <Link
              to="/admin/maintenance"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <GrVmMaintenance />
              <span className="text-md font-medium">Maintenance people</span>
            </Link>
            <Link
              to="/admin/tasks"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <FaTasks />
              <span className="text-md font-medium">Tasks</span>
            </Link>
            <Link
              to="/admin/vehicles"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <IoCarSportSharp />
              <span className="text-md font-medium">Vehicles</span>
            </Link>
          </>
        )}
        {role === "driver" && (
          <>
            <Link
              to="/driver/tasks"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <FaWheelchairMove />
              <span className="text-md font-medium">Tasks</span>
            </Link>
            <Link
              to="/driver/me"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <BsFillFuelPumpFill />
              <span className="text-md font-medium">My profile</span>
            </Link>
          </>
        )}
        {role === "maintenance_person" && (
          <>
            <Link
              to="/maintenance/tasks"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <FaWheelchairMove />
              <span className="text-md font-medium">Create Task</span>
            </Link>
            <Link
              to="/maintenance/me"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <BsFillFuelPumpFill />
              <span className="text-md font-medium">My profile</span>
            </Link>
          </>
        )}
        {role === "fueling_person" && (
          <>
            <Link
              to="/fueling/tasks"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <FaWheelchairMove />
              <span className="text-md font-medium">Create Task</span>
            </Link>
            <Link
              to="/fueling/me"
              className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
            >
              <BsFillFuelPumpFill />
              <span className="text-md font-medium">My profile</span>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
