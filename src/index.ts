import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

import "dotenv/config";

import premiumRoute from "./routes/premiumRoute";
import testRoute from "./routes/testRoute";
import offerRoute from "./routes/offerRoute";
import applicationRoute from "./routes/applicationRoute";
import documentPointerRoute from "./routes/documentPointerRoute";
import memoRoute from "./routes/memoRoute";
import sendDocumentsRoute from "./routes/sendDocumentsRoute";

const { PORT = 3000 } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const startServer = async () => {
  try {
    app.use("/premium", premiumRoute);
    app.use("/test", testRoute);
    app.use("/offer", offerRoute);
    app.use("/application", applicationRoute);
    app.use("/document_pointer", documentPointerRoute);
    app.use("/send_documents", sendDocumentsRoute);
    app.use("/memo/upload", memoRoute);

    app.use((_, res) => {
      res.status(404).json({ message: "Route not found" });
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error("❌ ERROR:", err.message, err.stack);
      res
        .status(err.status || 500)
        .json({ message: err.message || "Server error" });
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
