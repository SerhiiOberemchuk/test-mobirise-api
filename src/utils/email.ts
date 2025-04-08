import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_EMAIL, EMAIL_KEY } = process.env;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: API_BASE_EMAIL,
    pass: EMAIL_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
