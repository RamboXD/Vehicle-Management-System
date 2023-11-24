import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { GiPlatform } from "react-icons/gi";
const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-10 py-4 h-[8vh] shadow-sm flex justify-between z-50 border-b">
      <div className="flex  items-center gap-3">
        <GiPlatform />
        <span className="text-md font-medium">VMS Platform</span>
      </div>
      <div className="flex  items-center gap-3">
        <Button
          variant="outline"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
