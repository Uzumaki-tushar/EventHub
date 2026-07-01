import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import SEO from "../components/SEO";
import { UserPlus, Plus } from "lucide-react";

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
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SEO title="Admin Dashboard" />
      <div>
        
        {/* Welcome Section */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#D80032] rounded-full blur-[100px] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Admin 👋</h1>
            <p className="text-gray-400">Manage events, bookings, users, and revenue from one place.</p>
          </div>

          <div className="flex gap-4 relative z-10">
            <button
              onClick={() => navigate("/admin/create-admin")}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-semibold transition-colors border border-white/10 text-sm"
            >
              <UserPlus size={16} /> Create Admin
            </button>
            <button
              onClick={() => navigate("/admin/add-event")}
              className="flex items-center gap-2 bg-[#D80032] hover:bg-[#a60026] px-6 py-3 rounded-full font-bold transition shadow-lg text-sm"
            >
              <Plus size={16} /> Add Event
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 transition hover:border-[#D80032]/50">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Total Events</h3>
            <p className="text-4xl font-bold text-white">{stats.totalEvents}</p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 transition hover:border-[#D80032]/50">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Total Bookings</h3>
            <p className="text-4xl font-bold text-white">{stats.totalBookings}</p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 transition hover:border-[#D80032]/50">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Total Users</h3>
            <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 transition hover:border-[#D80032]/50 relative overflow-hidden">
             <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#800080] rounded-full blur-[30px] opacity-20 pointer-events-none" />
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-3">Total Revenue</h3>
            <p className="text-4xl font-bold text-[#D80032]">₹{stats.totalRevenue}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">
            <h3 className="text-white text-lg mb-6 font-bold">User Attendance %</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.eventStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="attendeePercentage" name="% of Users" fill="#D80032" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">
            <h3 className="text-white text-lg mb-6 font-bold">Revenue Per Event</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.eventStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#666" tick={{fill: '#666'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="revenue" name="Revenue (₹)" fill="#800080" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;