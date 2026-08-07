import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import documentRoutes from "./routes/document.routes.js";
import companyRoutes from "./routes/company.routes.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import qdrantRoutes from "./routes/qdrant.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://knowflow-ai-neon.vercel.app",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "KnowFlow AI Backend is running 🚀"
    });
});

app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/qdrant", qdrantRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/test", testRoutes);











// Always keep this last
app.use(errorHandler);

export default app;