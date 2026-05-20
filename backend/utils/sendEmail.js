import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS missing in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"CourierMS" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;