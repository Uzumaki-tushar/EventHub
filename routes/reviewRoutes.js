const express = require("express");
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get reviews for an event
router.get("/event/:eventId", async (req, res) => {
  try {
    const reviews = await Review.find({ eventId: req.params.eventId }).populate("userId", "name profilePicture");
    
    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
      averageRating = sum / reviews.length;
    }

    res.json({ reviews, averageRating: averageRating.toFixed(1), total: reviews.length });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

// Submit a review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;
    
    // Check if user already reviewed
    const existingReview = await Review.findOne({ userId: req.user.id, eventId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this event" });
    }

    const review = await Review.create({
      userId: req.user.id,
      eventId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit review" });
  }
});

module.exports = router;
