import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_URL, API_KEY } = process.env;

export const axiosApiInstans = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-SQUARELIFE-APIKEY": API_KEY,
  },
});
