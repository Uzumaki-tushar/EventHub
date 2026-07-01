import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../components/SEO";

function AddEvent() {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    price: "",
    seats: "",
    category: "Other",
    image: "",
  });

  const submitEvent = async (e) => {
    e.preventDefault();

    if (!event.title || !event.description || !event.date || !event.venue || !event.price || !event.seats || !event.image) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await API.post("/events", event);
      toast.success("🎉 Event Added Successfully!");
      navigate("/admin");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to add event";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <SEO title="Add Event" />
      <div className="flex justify-center items-center py-6">

        <div className="w-full max-w-2xl bg-[#111111] border border-white/10 rounded-[2.5rem] shadow-2xl p-10 text-white relative">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D80032] rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <div className="text-center mb-10 relative z-10">
            <h1 className="text-4xl font-bold tracking-tight">Add New Event</h1>
            <p className="text-gray-400 mt-2">Create and publish amazing events</p>
          </div>

          <form onSubmit={submitEvent} className="space-y-4 relative z-10">
            
            <input
              placeholder="Event Title"
              className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
            />

            <textarea
              placeholder="Event Description"
              rows="4"
              className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors resize-none"
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
              />

              <input
                placeholder="Venue"
                className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
                onChange={(e) => setEvent({ ...event, venue: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Ticket Price (₹)"
                className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
                onChange={(e) => setEvent({ ...event, price: e.target.value })}
              />

              <input
                type="number"
                placeholder="Available Seats"
                className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
                onChange={(e) => setEvent({ ...event, seats: e.target.value })}
              />
            </div>

            <select
              className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors appearance-none"
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
            >
              <option value="Tech">Tech</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
              <option value="Other">Other</option>
            </select>

            <input
              placeholder="Image URL"
              className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              onChange={(e) => setEvent({ ...event, image: e.target.value })}
            />

            <div className="pt-4 flex gap-4">
               <button
                type="button"
                onClick={() => navigate("/admin")}
                className="flex-1 py-4 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition border border-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] py-4 rounded-full bg-[#D80032] text-white font-bold hover:bg-[#a60026] transition shadow-lg"
              >
                Create Event
              </button>
            </div>

          </form>

        </div>

      </div>
    </>
  );
}

export default AddEvent;