import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";

function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Left Logo */}
        <Link to="/admin" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#D80032] to-[#800080] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(216,0,50,0.5)]">
            <span className="font-bold text-lg text-white">E</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            EventHub <span className="text-[#D80032] font-medium text-lg ml-1">Admin</span>
          </h1>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Online
          </div>

          <Link to="/admin/reports" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Reports
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-[#D80032] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;