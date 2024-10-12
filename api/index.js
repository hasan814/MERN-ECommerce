import cookieParse from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json());
app.use(cookieParse());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.message || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).join({ success: false, statusCode, message });
});
