import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_EMAIL, EMAIL_KEY } = process.env;

const offerRoute = express.Router();

const transporter = nodemailer.createTransport({
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

offerRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axiosApiInstans.post(
        "/squarelife_protection/api/v0/switzerland/life_insurance/offer",
        req.body
      );

      const document_pointer1 = response.data.document_pointers[0].pointer;

      const documentResponse = await axiosApiInstans.get(
        `/document_pointer/${document_pointer1}`
      );
      // const documentBuffer = Buffer.from(documentResponse.data);
      // console.log(req.body);

      // Налаштування листа
      try {
        const info = await transporter.sendMail({
          from: API_BASE_EMAIL,
          to: req.body.holder.email,
          subject: "Message",
          text: "I hope this message gets delivered!",
          attachments: [
            {
              filename: "document.pdf",
              content: documentResponse.data,
              contentType: "application/pdf",
            },
          ],
        });
        console.log("Email send successful:", info);
      } catch (err) {
        console.error("Error send mail:", err);
      }
      console.log("point after sendmail");
      res.status(response.status).json(response.data);
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || "❌ Server ERROR");
    }
  }
);

export default offerRoute;
