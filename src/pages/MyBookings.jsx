import { useEffect, useState } from "react";
import API from "../services/api";
import generateTicket from "../utils/generateTicket";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { Ticket, MapPin, Calendar, Star, Download, X } from "lucide-react";
import { motion } from "framer-motion";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviewModal, setReviewModal] = useState({ open: false, eventId: null, rating: 5, comment: "" });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await API.get(`/bookings/user/${user._id}`);
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
      <SEO title="My Bookings" />
      <div className="min-h-screen py-12 px-6">
        
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 pt-8">
            <h1 className="text-5xl font-black mb-4 tracking-tight">
              My <span className="text-[#D80032]">Bookings</span>
            </h1>
            <p className="text-gray-400 text-lg">Manage your tickets and upcoming events.</p>
          </div>

          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Ticket className="text-[#D80032]" /> Upcoming Events
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {upcomingBookings.map((booking, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={booking._id}
                className="bg-[#111111] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Ticket size={80} className="text-[#D80032] -rotate-12 translate-x-4 -translate-y-4" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 relative z-10">{booking.eventId.title}</h3>

                <div className="space-y-3 text-sm text-gray-400 mb-6 relative z-10">
                  <p className="flex items-center gap-2">
                    <Ticket size={16} className="text-white" />
                    <span className="text-white font-medium">{booking.tickets} Ticket(s)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#800080]" />
                    <span className="text-white truncate">{booking.eventId.venue}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-cyan-500" />
                    <span className="text-white">
                      {new Date(booking.eventId.date).toLocaleDateString("en-US", {
                        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => generateTicket(booking)}
                  className="w-full flex justify-center items-center gap-2 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition relative z-10"
                >
                  <Download size={16} /> Download Ticket
                </button>
              </motion.div>
            ))}
          </div>

          {upcomingBookings.length === 0 && (
            <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5 mb-16">
              <p className="text-gray-400 text-lg">No upcoming bookings.</p>
            </div>
          )}

          {pastBookings.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-400">
                <Calendar className="text-gray-500" /> Past Events
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastBookings.map((booking) => (
                  <div key={booking._id} className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 opacity-70">
                    <h3 className="text-xl font-bold mb-2 text-gray-300">{booking.eventId.title}</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      {new Date(booking.eventId.date).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => setReviewModal({ open: true, eventId: booking.eventId._id, rating: 5, comment: "" })}
                      className="w-full flex justify-center items-center gap-2 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition"
                    >
                      <Star size={16} /> Leave a Review
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] border border-white/10 p-8 rounded-[2rem] max-w-md w-full relative"
          >
            <button 
              onClick={() => setReviewModal({ open: false, eventId: null, rating: 5, comment: "" })}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">Rate this Event</h2>
            
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-2">Rating (1-5)</label>
              <input 
                type="number" min="1" max="5" 
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/5 text-white focus:outline-none focus:border-[#D80032]/50"
                value={reviewModal.rating}
                onChange={e => setReviewModal({...reviewModal, rating: Number(e.target.value)})}
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-400 text-sm mb-2">Comment</label>
              <textarea 
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/5 text-white focus:outline-none focus:border-[#D80032]/50"
                value={reviewModal.comment}
                onChange={e => setReviewModal({...reviewModal, comment: e.target.value})}
              />
            </div>

            <button 
              onClick={submitReview}
              className="w-full py-4 rounded-full bg-[#D80032] text-white font-bold hover:bg-[#a60026] transition shadow-lg"
            >
              Submit Review
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default MyBookings;