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
      const event = await Event.findById(req.body.eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });

      const ticketsToBook = req.body.tickets || 1;
      if (event.bookedSeats + ticketsToBook > event.seats) {
        return res.status(400).json({ message: "Not enough seats available" });
      }

      const booking =
        await Booking.create(
          req.body
        );

      event.bookedSeats += ticketsToBook;
      await event.save();

      const user =
        await User.findById(
          req.body.userId
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

    res.json(bookings);
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

router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const event = await Event.findById(booking.eventId);
    if (event) {
      event.bookedSeats -= booking.tickets;
      await event.save();
      // Logic to notify waitlisted users could go here
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cancellation failed" });
  }
});

module.exports = router;