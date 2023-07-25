import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/public", express.static("public"));

// all Routes
import allRoutes from "./routes/index.js";
app.use("/api", allRoutes);
export default server;
