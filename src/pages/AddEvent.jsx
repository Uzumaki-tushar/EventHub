import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AddEvent() {
  const navigate = useNavigate();

  const [event, setEvent] =
    useState({
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
      await API.post(
        "/events",
        event
      );

      toast.success("🎉 Event Added Successfully!");
      navigate("/admin");

      setEvent({
        title: "",
        description: "",
        date: "",
        venue: "",
        price: "",
        seats: "",
        category: "Other",
        image: "",
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to add event";
      toast.error(errMsg);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex justify-center items-center px-4 py-10">

    {/* Background Glow Effects */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

    <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-20"></div>

    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

      <div className="text-center mb-8">
        <h1 className="text-5xl mb-2">🎉</h1>

        <h1 className="text-4xl font-bold">
          Add New Event
        </h1>

        <p className="text-gray-300 mt-2">
          Create and publish amazing events
        </p>
      </div>

      <form
        onSubmit={submitEvent}
        className="space-y-5"
      >
        <input
          placeholder="📌 Event Title"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="📝 Event Description"
          rows="4"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              description: e.target.value,
            })
          }
        />

        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              date: e.target.value,
            })
          }
        />

        <input
          placeholder="📍 Venue"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              venue: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="💰 Ticket Price"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              price: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="🎟 Available Seats"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              seats: e.target.value,
            })
          }
        />

        <select
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={event.category}
          onChange={(e) => setEvent({ ...event, category: e.target.value })}
        >
          <option value="Tech" className="text-black">Tech</option>
          <option value="Music" className="text-black">Music</option>
          <option value="Sports" className="text-black">Sports</option>
          <option value="Workshop" className="text-black">Workshop</option>
          <option value="Other" className="text-black">Other</option>
        </select>

        <input
          placeholder="🖼 Image URL"
          className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          onChange={(e) =>
            setEvent({
              ...event,
              image: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
        >
          ➕ Create Event
        </button>

      </form>

    </div>

  </div>
);
}

export default AddEvent;