import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User, LogIn } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "My Bookings", path: "/bookings" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/5 text-white px-8 py-4 flex justify-between items-center transition-all duration-300">
      
      {/* Logo */}
      <div className="cursor-pointer flex items-center gap-2" onClick={() => navigate("/")}>
        <div className="w-8 h-8 bg-gradient-to-tr from-[#D80032] to-[#800080] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(216,0,50,0.5)]">
          <span className="font-bold text-lg text-white">E</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          EventHub
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="relative text-sm font-medium transition-colors duration-300 hover:text-white group text-gray-300"
          >
            {link.name}
            {location.pathname === link.path && (
              <motion.div
                layoutId="navbar-indicator"
                className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#D80032] rounded-full"
              />
            )}
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5"
            >
              <User size={16} />
              <span className="hidden sm:inline">{user.name || 'Profile'}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-[#D80032] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-[#D80032] hover:bg-[#a60026] text-white px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_4px_14px_0_rgba(216,0,50,0.39)] hover:shadow-[0_6px_20px_rgba(216,0,50,0.23)] hover:-translate-y-0.5"
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;