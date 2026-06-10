import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import actionsRoutes from "./routes/actions.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors({
  origin: [
    "https://cadastrodeacoessociais.vercel.app",
    "http://localhost:5173" 
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(helmet());
app.use(morgan("dev"));


app.use(express.json());


app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/actions", actionsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

export default app;
