const mongoose = require("mongoose");

const eventSchema =
  new mongoose.Schema({
    title: String,

    description: String,

    venue: String,

    date: Date,

    price: Number,

    seats: Number,

    image: String,
  });

module.exports =
  mongoose.model(
    "Event",
    eventSchema
  );