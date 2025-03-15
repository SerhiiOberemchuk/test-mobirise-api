import { PremiumController } from "./premium.types";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_URL, API_KEY } = process.env;

if (!API_BASE_URL || !API_KEY) {
  throw new Error("API_BASE_URL or API_KEY not found in .env file");
}
const premiumController = async (req: PremiumController, res, next) => {
  const { origin, birthdate, smoker, duration, coverage } = req.body;
  const response = await axios.get(API_BASE_URL, {
    headers: {
      "Content-Type": "application/json",
      "X-SQUARELIFE-APIKEY": API_KEY,
    },
    params: { origin, birthdate, smoker, duration, coverage },
  });
  res.json(response.data);
};

export default premiumController;
