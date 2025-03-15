import express from "express";
import testController from "../controllers/testController";

const testRoute = express.Router();

testRoute.get("/", testController);

export default testRoute;
