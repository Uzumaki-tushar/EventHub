import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Calendar, MapPin, Star, Ticket, Clock } from "lucide-react";

function EventCard({ event, onBook }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    API.get(`/reviews/event/${event._id}`)
      .then((res) => {
        if (res.data.averageRating > 0) setRating(res.data.averageRating);
      })
      .catch((err) => console.log(err));
  }, [event._id]);

  const isFull = event.bookedSeats >= event.seats;

  const handleWaitlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("Please login first to join waitlist");
        return;
      }
      await API.post(`/events/${event._id}/waitlist`, { userId: user._id });
      toast.success("Successfully joined the waitlist!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join waitlist");
    }
  };

  return (
    <div className="group relative bg-[#111111] rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      
      {/* Image Container 16:9 */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#222]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
          <Calendar size={12} className="text-[#D80032]" />
          {new Date(event.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
        </div>

        {rating && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-bold text-xl text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#D80032] transition-colors">
          {event.title.toUpperCase()}
        </h2>

        <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-grow">
          {event.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-300 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5">
          <MapPin size={14} className="text-[#800080]" />
          <span className="truncate max-w-[200px]">{event.venue}</span>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-white/5">
          {isFull ? (
            <button
              onClick={handleWaitlist}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors border border-white/10"
            >
              <Clock size={16} />
              Join Waitlist
            </button>
          ) : (
            <button
              onClick={() => onBook(event)}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-full bg-[#D80032] text-white text-sm font-bold shadow-[0_4px_14px_0_rgba(216,0,50,0.39)] hover:shadow-[0_6px_20px_rgba(216,0,50,0.23)] hover:-translate-y-0.5 transition-all"
            >
              <Ticket size={16} />
              Book Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;