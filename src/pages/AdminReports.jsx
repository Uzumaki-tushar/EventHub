import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function AdminReports() {
  const [stats, setStats] =
    useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {
      const res =
        await API.get(
          "/admin/stats"
        );

      setStats(res.data);
    };

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Admin Reports
        </h1>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white shadow p-6 rounded">
            <h2>Total Users</h2>

            <p className="text-3xl font-bold">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2>Total Events</h2>

            <p className="text-3xl font-bold">
              {stats.totalEvents}
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2>Total Bookings</h2>

            <p className="text-3xl font-bold">
              {stats.totalBookings}
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded">
            <h2>Total Revenue</h2>

            <p className="text-3xl font-bold">
              ₹{stats.totalRevenue}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminReports;