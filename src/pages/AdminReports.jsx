import { useEffect, useState } from "react";
import API from "../services/api";
import SEO from "../components/SEO";

function AdminReports() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  return (
    <>
      <SEO title="Admin Reports" />
      <div>
        <h1 className="text-3xl font-bold mb-8">Admin Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Users</h2>
            <p className="text-4xl font-bold text-white">{stats.totalUsers || 0}</p>
          </div>

          <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Events</h2>
            <p className="text-4xl font-bold text-white">{stats.totalEvents || 0}</p>
          </div>

          <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Bookings</h2>
            <p className="text-4xl font-bold text-white">{stats.totalBookings || 0}</p>
          </div>

          <div className="bg-[#111111] border border-white/10 p-6 rounded-3xl">
            <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</h2>
            <p className="text-4xl font-bold text-[#D80032]">₹{stats.totalRevenue || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminReports;