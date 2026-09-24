import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/connection.js";
import authRoutes from "./src/routes/auth.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors({ origin: "*" }));
app.use(express.json())

connectDB();

//route check
app.get("/check", (_, res) =>
  res.status(200).json({ message: "route is healthy..." }),
);

//auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
