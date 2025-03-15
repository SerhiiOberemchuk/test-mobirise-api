import express from "express";
import premiumController from "../controllers/premiumController";

const premiumRoute = express.Router();

premiumRoute.post("/premium", premiumController);

export default premiumRoute;
