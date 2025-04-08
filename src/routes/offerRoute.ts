import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";

import dotenv from "dotenv";
import { transporter } from "../utils/email";

dotenv.config();

const { API_BASE_EMAIL } = process.env;

const offerRoute = express.Router();

offerRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axiosApiInstans.post(
        "/squarelife_protection/api/v0/switzerland/life_insurance/offer",
        req.body
      );

      const documentsPointer = response.data.document_pointers || [];

      const attachments = await Promise.all(
        documentsPointer.map(
          async (item: { pointer: string; description: string }) => {
            const documentResponse = await axiosApiInstans.get(
              `/document_pointer/${item.pointer}`,
              { responseType: "arraybuffer" }
            );
            return {
              filename: `${item.description}.pdf`,
              content: Buffer.from(documentResponse.data),
              contentType: "application/pdf",
            };
          }
        )
      );

      try {
        const info = await transporter.sendMail({
          from: API_BASE_EMAIL,
          to: req.body.holder.email,
          subject: "Message",
          text: `ID dell'offerta:${req.body.id}`,
          attachments,
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
