import { useContext } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10 text-white px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <div
        className="cursor-pointer"
        onClick={() => navigate("/")}
      >
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          🎫 EventHub
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="hover:text-cyan-400 transition duration-300 font-medium"
        >
          Home
        </Link>

        <Link
          to="/events"
          className="hover:text-cyan-400 transition duration-300 font-medium"
        >
          Events
        </Link>

        <Link
          to="/bookings"
          className="hover:text-cyan-400 transition duration-300 font-medium"
        >
          My Bookings
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="
              bg-gradient-to-r
              from-red-500
              to-pink-600
              px-5
              py-2
              rounded-xl
              font-semibold
              hover:scale-105
              transition
              shadow-lg
            "
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              px-5
              py-2
              rounded-xl
              font-semibold
              hover:scale-105
              transition
              shadow-lg
            "
          >
            Login
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;