import express from "express";
import { Request, Response, NextFunction } from "express";
import { axiosApiInstans } from "../api/axios";

const memoRoute = express.Router();

memoRoute.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { authorization_key } = req.query;
  const requestData = req.body;

  try {
    const response = await axiosApiInstans.post(
      `/squarelife_protection/api/v0/upload/memo?authorization_key=${authorization_key}`,
      requestData
    );

    res.status(response.status).json(response.data);
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || "❌ Server ERROR");
  }
});

export default memoRoute;
