import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";

const documentPointerRoute = express.Router();

documentPointerRoute.get(
  "/:documentPointer",
  async (req: Request, res: Response, next: NextFunction) => {
    const { documentPointer } = req.params;
    try {
      const response = await axiosApiInstans.get(
        `/document_pointer/${documentPointer}`
      );

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || "❌ Server ERROR");
    }
  }
);

export default documentPointerRoute;
