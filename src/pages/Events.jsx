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

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
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

        <input
          type="text"
          placeholder="🔍 Search Events..."
          className="
            w-full
            p-4
            rounded-2xl
            bg-white/10
            backdrop-blur-lg
            border
            border-white/20
            text-white
    placeholder-gray-300
    mb-8
    focus:outline-none
    focus:ring-2
    focus:ring-cyan-400
  "
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
        <div className="mb-6">
  <span className="bg-cyan-500 px-4 py-2 rounded-full font-semibold">
    {events.length} Events Available
  </span>
</div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {events
            .filter((event) =>
              event.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            )
            .map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onBook={bookEvent}
                
              />
            ))}

        </div>

      </div>
    </>
  );
}

export default Events;