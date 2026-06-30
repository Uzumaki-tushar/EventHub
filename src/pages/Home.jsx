import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white min-h-screen">

        {/* Hero Section */}
        <section className="relative overflow-hidden py-28">

          <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-[180px] opacity-20"></div>

          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full blur-[180px] opacity-20"></div>

          <div className="max-w-6xl mx-auto px-6 text-center">

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
              Discover
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Amazing Events
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto">
              Book Concerts, Festivals, Sports Events,
              Workshops and unforgettable experiences with EventHub.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">

              <Link
                to="/events"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition shadow-lg"
              >
                🎟 Explore Events
              </Link>

              <Link
                to="/register"
                className="border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition"
              >
                🚀 Join Now
              </Link>

            </div>

          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl text-center">
              <h3 className="text-4xl font-bold text-cyan-400">
                100+
              </h3>
              <p className="text-gray-300">
                Events
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl text-center">
              <h3 className="text-4xl font-bold text-pink-400">
                5K+
              </h3>
              <p className="text-gray-300">
                Tickets Sold
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl text-center">
              <h3 className="text-4xl font-bold text-green-400">
                1K+
              </h3>
              <p className="text-gray-300">
                Happy Users
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl text-center">
              <h3 className="text-4xl font-bold text-yellow-400">
                24/7
              </h3>
              <p className="text-gray-300">
                Support
              </p>
            </div>

          </div>

        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto py-10 px-6">

          <h2 className="text-5xl font-bold text-center mb-14">
            Why Choose EventHub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:scale-105 transition">
              <div className="text-5xl mb-4">
                🎟
              </div>

              <h3 className="font-bold text-2xl mb-3">
                Easy Booking
              </h3>

              <p className="text-gray-300">
                Book tickets in seconds with a smooth and user-friendly process.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:scale-105 transition">
              <div className="text-5xl mb-4">
                🔒
              </div>

              <h3 className="font-bold text-2xl mb-3">
                Secure Payments
              </h3>

              <p className="text-gray-300">
                Integrated payment gateway with safe transactions.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:scale-105 transition">
              <div className="text-5xl mb-4">
                🎉
              </div>

              <h3 className="font-bold text-2xl mb-3">
                Best Events
              </h3>

              <p className="text-gray-300">
                Discover concerts, sports, workshops and festivals all in one place.
              </p>
            </div>

          </div>

        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Ready for Your Next Event?
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users booking unforgettable experiences.
          </p>

          <Link
            to="/events"
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            🎫 Start Booking
          </Link>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;