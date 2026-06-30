import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import API from "../services/api";
import toast from "react-hot-toast";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, dateFilter]);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchEvents();
    }, 300);
    return () => clearTimeout(delayFetch);
  }, [page, search, categoryFilter, dateFilter]);

  const fetchEvents = async () => {
    try {
      const query = `?page=${page}&limit=6&search=${search}&category=${categoryFilter}&date=${dateFilter}`;
      const res = await API.get(`/events${query}`);
      
      if (page === 1) {
        setEvents(res.data.events);
      } else {
        setEvents((prev) => [...prev, ...res.data.events]);
      }
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const bookEvent = async (event) => {
    console.log("EVENT =", event);
    console.log("PRICE =", event.price);
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const { data } =
        await API.post(
          "/payment/create-order",
          {
            amount: event.price,
          }
        );

      const options = {
        key: "rzp_test_SyQ46GRotQ19ah",

        amount: data.amount,

        currency: data.currency,

        name: "EventHub",

        description: event.title,

        order_id: data.id,

        handler: async () => {
          await API.post(
            "/bookings",
            {
              userId: user._id,
              eventId: event._id,
              tickets: 1,
            }
          );

          toast.success("🎟 Booking Successful!");
          navigate("/payment-success");
        },

        prefill: {
          name: user.name,
          email: user.email,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor =
        new window.Razorpay(
          options
        );

      razor.open();
    } catch (err) {
      console.log(err);
      toast.error(
        "Payment initiation failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">
        {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-[180px] opacity-20"></div>

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-[180px] opacity-20"></div>
      </div>

      <div className="p-8"></div>

        <div className="text-center mb-12">

  <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
    Discover Amazing Events
  </h1>

  <p className="text-xl text-gray-300 mt-4">
    Book concerts, workshops, festivals and more.
  </p>

</div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Search Events..."
            className="flex-1 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All" className="text-black">All Categories</option>
            <option value="Tech" className="text-black">Tech</option>
            <option value="Music" className="text-black">Music</option>
            <option value="Sports" className="text-black">Sports</option>
            <option value="Workshop" className="text-black">Workshop</option>
            <option value="Other" className="text-black">Other</option>
          </select>

          <input
            type="date"
            className="p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div className="mb-6">
  <span className="bg-cyan-500 px-4 py-2 rounded-full font-semibold">
    {events.length} Events Available
  </span>
</div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onBook={bookEvent}
            />
          ))}
        </div>

        {page < totalPages && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold text-lg transition shadow-lg"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </>
  );
}

export default Events;