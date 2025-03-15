import axios from "axios";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

type PremiumRequest = {
  origin: number;
  birthdate: number;
  smoker: boolean;
  duration: number;
  coverage: number;
  height?: number;
  weight?: number;
};

dotenv.config();
const { API_BASE_URL, API_KEY } = process.env;

const premiumController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/squarelife_protection/api/v0/switzerland/life_insurance/premium`,
      req.body,
      {
        headers: {
          "X-SQUARELIFE-APIKEY": API_KEY,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.response?.data || "❌ Server ERROR" });
  }
};

export default premiumController;
