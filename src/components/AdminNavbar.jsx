import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-lg">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Left Logo */}
        <div className="flex items-center gap-3 group">
          <span className="text-4xl group-hover:scale-110 transition">🎫</span>

          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EventHub Admin
          </h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">

          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-sm">
            ● Online
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              relative
              px-5 py-2 rounded-xl
              text-white font-semibold
              bg-gradient-to-r from-red-500 to-pink-600
              shadow-lg
              hover:shadow-red-500/40
              hover:scale-105
              active:scale-95
              transition-all
              overflow-hidden
            "
          >
            Logout

            {/* glow effect */}
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition"></span>
          </button>

        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;