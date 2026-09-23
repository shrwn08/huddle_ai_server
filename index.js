import express  from "express";
import { connectDB } from "./src/config/connection.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;


connectDB();





app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));