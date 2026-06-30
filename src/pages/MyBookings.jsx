import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

import generateTicket from "../utils/generateTicket";

function MyBookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await API.get(
      `/bookings/user/${user._id}`
    );

    setBookings(res.data);
  };

  return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">

      {/* Background Glow Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-[180px] opacity-20"></div>

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-[180px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            🎟 My Bookings
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            View and manage all your event tickets
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 inline-block">
            <h3 className="text-gray-300">
              Total Bookings
            </h3>

            <p className="text-5xl font-bold text-cyan-400">
              {bookings.length}
            </p>
          </div>
        </div>

        {/* Booking Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
                rounded-3xl
                p-6
                shadow-xl
                hover:scale-105
                transition-all
                duration-300
              "
            >
              <div className="text-5xl mb-4">
                🎫
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {booking.eventId.title}
              </h2>

              <div className="space-y-2 text-gray-300">

                <p>
                  🎟 Tickets:
                  <span className="text-white font-semibold ml-2">
                    {booking.tickets}
                  </span>
                </p>

                <p>
                  📍 Venue:
                  <span className="text-white font-semibold ml-2">
                    {booking.eventId.venue}
                  </span>
                </p>

                <p>
                  📅 Date:
                  <span className="text-white font-semibold ml-2">
                    {new Date(
                      booking.eventId.date
                    ).toLocaleDateString()}
                  </span>
                </p>

              </div>

              <button
                onClick={() =>
                  generateTicket(booking)
                }
                className="
                  w-full
                  mt-6
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-green-500
                  to-emerald-600
                  text-white
                  font-bold
                  hover:scale-105
                  transition
                  shadow-lg
                "
              >
                📥 Download Ticket
              </button>

            </div>
          ))}

        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold mb-4">
              No Bookings Yet
            </h2>

            <p className="text-gray-400">
              Start exploring events and book your first ticket.
            </p>
          </div>
        )}

      </div>
    </div>
  </>
);
}

export default MyBookings;