import axios from "axios";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const { API_BASE_URL, API_KEY } = process.env;
const premiumController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("📡 POST-request to Squarelife API...");

  try {
    const { origin, birthdate, smoker, duration, coverage, height, weight } =
      req.body;

    const response = await axios.post(
      `${API_BASE_URL}/squarelife_protection/api/v0/switzerland/life_insurance/premium`,

      { origin, birthdate, smoker, duration, coverage, height, weight },
      {
        headers: {
          "X-SQUARELIFE-APIKEY": API_KEY,
        },
      }
    );

    console.log("✅ Response from Squarelife API:", response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("❌ ERROR API:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "❌ Server ERROR" });
  }
};

export default premiumController;
