function EventCard({ event, onBook }) {
  return (
    <div
      className="
      relative
      bg-white/10
      backdrop-blur-xl
      border border-white/20
      rounded-3xl
      overflow-hidden
      shadow-2xl
      transition-all duration-300
      hover:scale-[1.04]
      hover:shadow-purple-500/40
      hover:border-purple-400/40
      group
      "
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-40 transition"></div>

      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
          📅{" "}
          {new Date(event.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </div>
      </div>

      <div className="relative p-5 text-white">
        <h2 className="font-bold text-2xl tracking-wide group-hover:text-cyan-300 transition">
          {event.title}
        </h2>

        <p className="text-sm text-white/70 mt-2 line-clamp-2">
          {event.description}
        </p>

        {/* Venue badge */}
        <div className="mt-3 inline-block text-xs bg-white/10 px-3 py-1 rounded-full text-white/80">
          📍 {event.venue}
        </div>

        <button
          onClick={() => onBook(event)}
          className="
            w-full
            mt-5
            py-3
            rounded-2xl
            bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500
            text-white font-bold
            shadow-lg
            hover:shadow-purple-500/50
            hover:scale-[1.03]
            active:scale-95
            transition-all
          "
        >
          🎟 Book Now
        </button>
      </div>
    </div>
  );
}

export default EventCard;