import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { server, app } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

 
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://chat-app-vb16.onrender.com", // thêm domain Render
    ],
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 API routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

// 🔹 Serve static frontend (React build)
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 🔹 Nếu không trùng API route, trả về index.html (cho React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});

// 🔹 Kết nối DB và khởi động server
const start = async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Error starting server:", err.message);
    process.exit(1);
  }
};

start();
