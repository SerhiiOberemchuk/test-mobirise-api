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

const testController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.options(
      `${API_BASE_URL}/squarelife_protection/api/v0/switzerland/life_insurance/premium`,
      {
        headers: {
          "X-SQUARELIFE-APIKEY": API_KEY,
        },
      }
    );

    res.status(200).json(true);
  } catch (error: any) {
    res.status(500).json(false);
  }
};

export default testController;
