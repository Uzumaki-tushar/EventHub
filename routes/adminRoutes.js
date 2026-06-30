const express = require("express");
const User = require("../models/User");
const Event = require("../models/Event");
const Booking = require("../models/Booking");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });

    const totalEvents = await Event.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const eventsList = await Event.find({}, "title date");

    const bookings =
      await Booking.find()
        .populate("eventId")
        .populate("userId");

    let totalRevenue = 0;
    const eventDataMap = {};

    bookings.forEach((booking) => {
      if (booking.eventId) {
        const evId = booking.eventId._id.toString();
        if (!eventDataMap[evId]) {
          eventDataMap[evId] = {
            title: booking.eventId.title,
            revenue: 0,
            attendees: new Set(),
          };
        }

        const price = booking.eventId.price || 0;
        const rev = price * booking.tickets;
        totalRevenue += rev;
        eventDataMap[evId].revenue += rev;

        if (booking.userId && booking.userId.role !== "admin") {
          eventDataMap[evId].attendees.add(booking.userId._id.toString());
        }
      }
    });

    const eventStats = Object.values(eventDataMap).map((data) => ({
      name: data.title,
      revenue: data.revenue,
      attendees: data.attendees.size,
      attendeePercentage: totalUsers > 0 ? parseFloat(((data.attendees.size / totalUsers) * 100).toFixed(2)) : 0,
    }));

    res.json({
      totalUsers,
      totalEvents,
      totalBookings,
      totalRevenue,
      eventStats,
      eventsList,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Error fetching stats",
    });
  }
});

module.exports = router;