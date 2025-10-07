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
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
// });

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});


const start = async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

start();
