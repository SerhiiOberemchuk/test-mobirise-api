import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { API_BASE_URL, API_KEY } = process.env;
console.log(API_BASE_URL, API_KEY);

export const axiosApi = async () =>
  await axios({
    url: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "X-SQUARELIFE-APIKEY": API_KEY,
    },
  });
