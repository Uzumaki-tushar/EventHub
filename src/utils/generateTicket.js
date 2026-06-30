import jsPDF from "jspdf";

const generateTicket = (booking) => {
  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "EVENT BOOKING TICKET",
    20,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Event: ${booking.eventId.title}`,
    20,
    50
  );

  doc.text(
    `Venue: ${booking.eventId.venue}`,
    20,
    60
  );

  doc.text(
    `Date: ${booking.eventId.date}`,
    20,
    70
  );

  doc.text(
    `Tickets: ${booking.tickets}`,
    20,
    80
  );

  doc.text(
    `Booking ID: ${booking._id}`,
    20,
    90
  );

  doc.save("ticket.pdf");
};

export default generateTicket;