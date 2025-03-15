import express from "express";
import premiumController from "../controllers/premiumController";

const premiumRoute = express.Router();

premiumRoute.post("/", premiumController);

export default premiumRoute;
