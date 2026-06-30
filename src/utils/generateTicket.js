import jsPDF from "jspdf";
import QRCode from "qrcode";

const generateTicket = async (booking) => {
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

  try {
    const qrDataUrl = await QRCode.toDataURL(booking._id.toString());
    doc.addImage(qrDataUrl, "PNG", 120, 40, 50, 50);
  } catch (err) {
    console.error("Error generating QR code", err);
  }

  doc.save("ticket.pdf");
};

export default generateTicket;