import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";

const applicationRoute = express.Router();

applicationRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axiosApiInstans.post(
        "/squarelife_protection/api/v0/switzerland/life_insurance/application",
        req.body
      );

      res.status(response.status).json(response.data);
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || "❌ Server ERROR");
    }
  }
);

export default applicationRoute;
