import express from "express";
import morgan from "morgan";
import cors from "cors";

import "dotenv/config";

import premiumRoute from "./routes/premiumRoute";
import testRoute from "./routes/testRoute";

const { PORT = 3000, API_BASE_URL } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const startServer = async () => {
  try {
    app.use("/premium", premiumRoute);
    app.use("/test", testRoute);

    app.use((_, res) => {
      res.status(404).json({ message: "Route not found" });
    });

    app.use((err: any, req: any, res: any, next: any) => {
      const { status = 500, message = "Server error" } = err;
      res.status(status).json({ message });
      next();
    });

    app.listen(PORT, () => {
      console.log(`Server runing on ${PORT}!`);
    });
  } catch (error) {
    console.error("Connection error", error);

    process.exit(1);
  }
};

startServer();

export default app;
