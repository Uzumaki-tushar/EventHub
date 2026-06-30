const express =
  require("express");

const Booking =
  require("../models/Booking");

const sendBookingMail =
  require("../utils/sendEmail");

const router =
  express.Router();

const User =
  require("../models/User");

const Event =
  require("../models/Event");

router.post(
  "/",
  async (req, res) => {
    try {
      const booking =
        await Booking.create(
          req.body
        );

      const user =
        await User.findById(
          req.body.userId
        );

      const event =
        await Event.findById(
          req.body.eventId
        );

      if (
        user &&
        event
      ) {
        await sendBookingMail(
          user.email,
          event.title
        );
      }

      res.json(booking);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message:
          "Booking Failed",
      });
    }
  }
);

router.get(
  "/user/:id",
  async (req, res) => {
    const bookings =
      await Booking.find({
        userId:
          req.params.id,
      })
        .populate(
          "eventId"
        );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingBookings = bookings.filter((booking) => {
      if (!booking.eventId) return false;
      return new Date(booking.eventId.date) >= today;
    });

    res.json(upcomingBookings);
  }
);

router.get(
  "/",
  async (req, res) => {
    const bookings =
      await Booking.find()
        .populate(
          "userId"
        )
        .populate(
          "eventId"
        );

    res.json(bookings);
  }
);

module.exports = router;