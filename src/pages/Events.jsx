import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import API from "../services/api";
import toast from "react-hot-toast";
import { Search, Filter, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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
      if (page === 1) setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const bookEvent = async (event) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const { data } = await API.post("/payment/create-order", {
        amount: event.price,
      });

      const options = {
        key: "rzp_test_SyQ46GRotQ19ah",
        amount: data.amount,
        currency: data.currency,
        name: "EventHub",
        description: event.title,
        order_id: data.id,
        handler: async () => {
          await API.post("/bookings", {
            userId: user._id,
            eventId: event._id,
            tickets: 1,
          });
          toast.success("🎟 Booking Successful!");
          navigate("/payment-success");
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#D80032",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
      toast.error("Payment initiation failed");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <SEO title="Explore Events" description="Find and book the best events near you." />
      
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12 pt-8">
            <h1 className="text-5xl font-black mb-4">
              Explore <span className="text-[#D80032]">Events</span>
            </h1>
            <p className="text-gray-400 text-lg">Find your next unforgettable experience.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 p-4 bg-[#111] border border-white/10 rounded-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events, artists, venues..."
                className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/5 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                <select
                  className="appearance-none pl-12 pr-10 py-3 bg-[#0a0a0a] border border-white/5 rounded-full text-white focus:outline-none focus:border-[#D80032]/50 transition-colors"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Tech">Tech</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="relative">
                <input
                  type="date"
                  className="pl-4 pr-4 py-3 bg-[#0a0a0a] border border-white/5 rounded-full text-white focus:outline-none focus:border-[#D80032]/50 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between">
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/10">
              {events.length} Events Found
            </span>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-[#D80032]" size={40} />
            </div>
          ) : (
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              animate="show" 
              className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
            >
              <AnimatePresence>
                {events.map((event) => (
                  <motion.div key={event._id} variants={itemVariants} layout>
                    <EventCard event={event} onBook={bookEvent} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && events.length === 0 && (
            <div className="text-center py-20 bg-[#111] rounded-3xl border border-white/5 mt-8">
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No Events Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          )}

          {/* Load More */}
          {!loading && page < totalPages && (
            <div className="text-center mt-16">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-all"
              >
                Load More Events
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Events;