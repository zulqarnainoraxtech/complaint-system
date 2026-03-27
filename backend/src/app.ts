import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// ── Middlewares ──────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ── Health Check ────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running 🚀" });
});

// ── API Routes ──────────────────────────────────────────
import routes from "./routes";
app.use("/api/v1", routes);

// ── Error Handler (must be last) ────────────────────────
app.use(errorHandler);

export default app;
