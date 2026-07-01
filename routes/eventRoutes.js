const express =
  require("express");

const Event =
  require("../models/Event");

const validate = require("../middleware/validate");
const { eventSchema } = require("../utils/validators");
const { cache, clearCache } = require("../middleware/cache");

const router =
  express.Router();

router.post(
  "/",
  validate(eventSchema),
  async (req, res) => {
    const eventDate = new Date(req.body.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (eventDate < today) {
      return res.status(400).json({ message: "Cannot create event in the past" });
    }

    const event =
      await Event.create(
        req.body
      );

    await clearCache("events");
    res.json(event);
  }
);

router.get("/", cache("events"), async (req, res) => {
  try {
    const { page = 1, limit = 6, search = "", category = "All", date = "" } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let query = { date: { $gte: today } };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    
    if (category && category !== "All") {
      query.category = category;
    }

    if (date) {
      const filterDate = new Date(date);
      const nextDay = new Date(filterDate);
      nextDay.setDate(filterDate.getDate() + 1);
      query.date = { $gte: filterDate, $lt: nextDay };
    }

    const events = await Event.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Event.countDocuments(query);
    const totalPages = Math.ceil(total / Number(limit));

    res.json({ events, totalPages, currentPage: Number(page) });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.get(
  "/:id",
  cache("events"),
  async (req, res) => {
    const event =
      await Event.findById(
        req.params.id
      );

    res.json(event);
  }
);

router.put(
  "/:id",
  async (req, res) => {
    const updated =
      await Event.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    await clearCache("events");
    res.json(updated);
  }
);

router.delete(
  "/:id",
  async (req, res) => {
    await Event.findByIdAndDelete(
      req.params.id
    );

    await clearCache("events");
    res.json({
      message:
        "Event Deleted",
    });
  }
);

router.post("/:id/waitlist", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { userId } = req.body;
    if (event.waitlist.includes(userId)) {
      return res.status(400).json({ message: "Already on waitlist" });
    }

    event.waitlist.push(userId);
    await event.save();
    res.json({ message: "Added to waitlist" });
  } catch (err) {
    res.status(500).json({ message: "Error joining waitlist" });
  }
});

module.exports = router;