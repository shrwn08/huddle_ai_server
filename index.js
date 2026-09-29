import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/connection.js";
import authRoutes from "./src/routes/auth.routes.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const PORT = 3000;
const server = createServer(app);

const io = new Server(server, {cors :{ origin: "*" }});

//make connection from the sockets

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);




//user diconnect here
  socket.on("client disconnected:", ()=>{
    console.log("client disconnected:", socket.id);
  });
});

connectDB();

//route check
app.get("/check", (_, res) =>
  res.status(200).json({ message: "route is healthy..." }),
);

//auth routes
app.use("/api/auth", authRoutes);


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
