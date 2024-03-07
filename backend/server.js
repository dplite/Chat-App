import express from "express";
import path from "path";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.routes.js";
import { app, server } from "./socket/socket.js";
// const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();

// app.get("/", (req, res) => {
//   res.send("hello N W");
// });
app.use(express.json()); // middlware to access the req as json obj from req.body
app.use(cookieParser());
app.use("/api/auth", authRoutes); // used middleware to separate concerns
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/api/auth/signup", (req, res) => {
//   console.log("signup route");
// });'

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`connected to port ${PORT}`);
});
