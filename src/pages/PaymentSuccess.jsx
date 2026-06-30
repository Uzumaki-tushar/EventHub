import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center px-4">

      {/* Background Glow Effects */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-green-400 rounded-full blur-[150px] opacity-20"></div>

      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400 rounded-full blur-[150px] opacity-20"></div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 text-center text-white max-w-lg w-full">

        <div className="text-7xl mb-6">
          ✅
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-200 text-lg mb-6">
          Your booking has been confirmed successfully.
        </p>

        <div className="bg-white/10 rounded-2xl p-4 mb-8">
          <p className="text-green-300 font-semibold">
            🎉 Thank you for booking with EventHub
          </p>

          <p className="text-gray-300 mt-2">
            Your ticket is now available in My Bookings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/bookings"
            className="
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-3
              rounded-xl
              font-bold
              hover:scale-105
              transition
            "
          >
            🎟 My Bookings
          </Link>

          <Link
            to="/events"
            className="
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              px-6
              py-3
              rounded-xl
              font-bold
              hover:scale-105
              transition
            "
          >
            🎉 Explore More Events
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentSuccess;