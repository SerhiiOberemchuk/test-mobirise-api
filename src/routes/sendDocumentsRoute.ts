import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";

import dotenv from "dotenv";
import { transporter } from "../utils/email";

dotenv.config();

const { API_BASE_EMAIL } = process.env;

const sendDocumentsRoute = express.Router();

sendDocumentsRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { documentsPointer = [], email, textEmail = "" } = req.body;

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

      const info = await transporter.sendMail({
        from: API_BASE_EMAIL,
        to: email,
        subject: "Message",
        text: textEmail,
        attachments,
      });

      res.status(200).json({ success: true, ...info });
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || "❌ Server ERROR");
    }
  }
);

export default sendDocumentsRoute;
