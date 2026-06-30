import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import generateTicket from "../utils/generateTicket";
import toast from "react-hot-toast";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewModal, setReviewModal] = useState({ open: false, eventId: null, rating: 5, comment: "" });

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

  const submitReview = async () => {
    try {
      await API.post("/reviews", {
        eventId: reviewModal.eventId,
        rating: reviewModal.rating,
        comment: reviewModal.comment
      });
      toast.success("Review submitted!");
      setReviewModal({ open: false, eventId: null, rating: 5, comment: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings.filter(b => b.eventId && new Date(b.eventId.date) >= today);
  const pastBookings = bookings.filter(b => b.eventId && new Date(b.eventId.date) < today);

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

        {/* Booking Cards */}
        <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {upcomingBookings.map((booking) => (
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

        {upcomingBookings.length === 0 && (
          <div className="text-center mb-16">
            <p className="text-gray-400">No upcoming bookings.</p>
          </div>
        )}

        {pastBookings.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastBookings.map((booking) => (
                <div key={booking._id} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 opacity-70">
                  <h2 className="text-2xl font-bold mb-3">{booking.eventId.title}</h2>
                  <p className="text-gray-300 mb-4">Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
                  <button
                    onClick={() => setReviewModal({ open: true, eventId: booking.eventId._id, rating: 5, comment: "" })}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold hover:scale-105 transition"
                  >
                    ⭐ Leave a Review
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>

    {/* Review Modal */}
    {reviewModal.open && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
        <div className="bg-slate-800 border border-white/20 p-8 rounded-3xl max-w-md w-full shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Rate this Event</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Rating (1-5)</label>
            <input 
              type="number" min="1" max="5" 
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-400"
              value={reviewModal.rating}
              onChange={e => setReviewModal({...reviewModal, rating: Number(e.target.value)})}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Comment</label>
            <textarea 
              rows="3"
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-400"
              value={reviewModal.comment}
              onChange={e => setReviewModal({...reviewModal, comment: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setReviewModal({ open: false, eventId: null, rating: 5, comment: "" })}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            >
              Cancel
            </button>
            <button 
              onClick={submitReview}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}

export default MyBookings;