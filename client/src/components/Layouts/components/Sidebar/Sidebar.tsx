import { Link } from "react-router-dom";
import { IoCarSportSharp } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GrVmMaintenance } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FaWheelchairMove } from "react-icons/fa6";
const Sidebar: React.FC = () => {
  return (
    <aside className="sticky top-0 h-full min-w-fit w-80 text-gray-800 p-4 shadow-sm border-r">
      <nav className="space-y-2">
        <Link
          to="/drivers"
          className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
        >
          {" "}
          <FaWheelchairMove />
          <span className="text-md font-medium">Drivers</span>
        </Link>
        <Link
          to="/fuels"
          className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
        >
          <BsFillFuelPumpFill />
          <span className="text-md font-medium">Fueling people</span>
        </Link>
        <Link
          to="/maintenance"
          className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
        >
          <GrVmMaintenance />
          <span className="text-md font-medium">Maintenance people</span>
        </Link>
        <Link
          to="/tasks"
          className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
        >
          <FaTasks />
          <span className="text-md font-medium">Tasks</span>
        </Link>
        <Link
          to="/vehicles"
          className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
        >
          <IoCarSportSharp />
          <span className="text-md font-medium">Vehicles</span>
        </Link>
        {/* </div> */}
        {/* </CollapsibleContent>
        </Collapsible> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
