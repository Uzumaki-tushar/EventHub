import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left Section (Logo & Text) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-[#D80032] to-[#800080] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(216,0,50,0.5)]">
              <span className="font-bold text-xs text-white">E</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">EventHub</h2>
          </div>
          <p className="text-sm text-gray-400">
            Your premium gateway to amazing events.
          </p>
        </div>

        {/* Middle Links */}
        <div className="flex gap-8 text-sm font-medium">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
          <Link to="/events" className="text-gray-400 hover:text-white transition-colors duration-300">Events</Link>
          <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-300">Login</Link>
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-sm text-gray-500">
          <p>© {new Date().getFullYear()} EventHub.</p>
          <p className="text-xs mt-1">All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;