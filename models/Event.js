const mongoose = require("mongoose");

const eventSchema =
  new mongoose.Schema({
    title: String,

    description: String,

    venue: String,

    date: Date,

    price: Number,

    seats: Number,

    bookedSeats: {
      type: Number,
      default: 0,
    },

    waitlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    category: {
      type: String,
      default: "Other",
    },

    image: String,
  });

module.exports =
  mongoose.model(
    "Event",
    eventSchema
  );