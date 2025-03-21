import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";

const testRoute = express.Router();

testRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axiosApiInstans.options(
      "/squarelife_protection/api/v0/switzerland/life_insurance/premium"
    );

    res.status(response.status).json(true);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(false);
  }
});

export default testRoute;
