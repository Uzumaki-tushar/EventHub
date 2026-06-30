const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  venue: z.string().min(3, "Venue is required"),
  date: z.string().refine((date) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }, {
    message: "Date cannot be in the past",
  }),
  price: z.coerce.number().nonnegative("Price cannot be negative"),
  seats: z.coerce.number().positive("Seats must be a positive number"),
  category: z.string().optional(),
  image: z.string().url("Image must be a valid URL"),
});

module.exports = { registerSchema, loginSchema, eventSchema };
