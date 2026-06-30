const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

const sendBookingMail =
  async (
    email,
    eventName
  ) => {
    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Booking Confirmed",

      html: `
        <h1>Booking Confirmed</h1>

        <p>
          Your booking for
          <strong>${eventName}</strong>
          has been confirmed.
        </p>

        <p>
          Thank you for using EventHub.
        </p>
      `,
    });
  };

module.exports =
  sendBookingMail;