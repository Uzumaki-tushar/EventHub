function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold tracking-wide">EventHub</h2>
          <p className="text-sm text-white/80 mt-1">
            Your gateway to amazing events in 2026
          </p>
        </div>

        {/* Middle Links */}
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/events" className="hover:text-yellow-300 transition">Events</a>
          
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-sm text-white/80">
          <p>© 2026 EventHub</p>
          <p className="text-xs">All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;