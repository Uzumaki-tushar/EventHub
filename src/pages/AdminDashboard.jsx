import { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    eventStats: [],
    eventsList: [],
  });

  useEffect(() => {
    fetchStats();

    const interval = setInterval(
      fetchStats,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/admin/stats"
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl">
  <h1 className="text-4xl font-bold">
    Welcome Admin 👋
  </h1>

  <p className="mt-2 text-lg">
    Manage events, bookings, users and revenue from one place.
  </p>
</div>
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white p-8">

    <div className="flex justify-between items-center mb-10">
  <h1 className="text-5xl font-bold">
    📊 Admin Dashboard
  </h1>

  <div className="flex gap-4">
    <button
      onClick={() => navigate("/admin/create-admin")}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition shadow-lg cursor-pointer"
    >
      👤 Create Admin
    </button>

    <button
      onClick={() => navigate("/admin/add-event")}
      className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition shadow-lg cursor-pointer"
    >
      ➕ Add Event
    </button>
  </div>
</div>

    <div className="grid md:grid-cols-4 gap-6">

      {/* Total Events */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-gray-300 text-lg">
          Total Events
        </h3>

        <p className="text-5xl font-bold text-cyan-400 mt-3">
          {stats.totalEvents}
        </p>
      </div>

      {/* Total Bookings */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-gray-300 text-lg">
          Total Bookings
        </h3>

        <p className="text-5xl font-bold text-green-400 mt-3">
          {stats.totalBookings}
        </p>
      </div>

      {/* Total Users */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-gray-300 text-lg">
          Total Users
        </h3>

        <p className="text-5xl font-bold text-pink-400 mt-3">
          {stats.totalUsers}
        </p>
      </div>
      

      {/* Revenue */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition">
        <h3 className="text-gray-300 text-lg">
          Total Revenue
        </h3>

        <p className="text-5xl font-bold text-yellow-400 mt-3">
          ₹{stats.totalRevenue}
        </p>
      </div>

    </div>

      {/* Charts & Calendar Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        
        {/* Attendance Percentage Chart */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
          <h3 className="text-gray-300 text-lg mb-4 font-bold">User Attendance Percentage</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.eventStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                <Legend />
                <Bar dataKey="attendeePercentage" name="% of Users Attending" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
          <h3 className="text-gray-300 text-lg mb-4 font-bold">Revenue Per Event</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.eventStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff40" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue (₹)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl text-black overflow-hidden flex flex-col items-center">
          <h3 className="text-gray-300 text-lg mb-4 font-bold self-start">Events Calendar</h3>
          <div className="w-full bg-white rounded-xl p-4">
            <Calendar
              className="w-full border-none !font-sans"
              tileClassName={({ date, view }) => {
                if (stats.eventsList && stats.eventsList.find(x => new Date(x.date).toDateString() === date.toDateString())) {
                  return 'bg-cyan-500 text-white font-bold rounded-full';
                }
              }}
              tileContent={({ date, view }) => {
                if (!stats.eventsList) return null;
                const ev = stats.eventsList.find(x => new Date(x.date).toDateString() === date.toDateString());
                return ev ? <p className="text-xs text-center text-indigo-900 mt-1">{ev.title}</p> : null;
              }}
            />
          </div>
        </div>

      </div>

  </div>
    </>
);
}

export default AdminDashboard;