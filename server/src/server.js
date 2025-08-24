import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import categoryRoutes from "./routes/categories.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ ok: true, message: "TMS API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

async function start(){
  try{
    await sequelize.authenticate();
    await sequelize.sync(); // for dev; use migrations in prod
    console.log("✅ MySQL connected & models synced");
    app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));
  }catch(err){
    console.error("DB error:", err.message);
    process.exit(1);
  }
}
start();
