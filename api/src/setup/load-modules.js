// Imports
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const feedRoutes = require("../routes/feed");
const authRoutes = require("../routes/auth");
const userRoute = require("../routes/user");
const shopRoute = require("../routes/shop");
const adminRoute = require("../routes/admin");
const isAdmin = require("../middleware/is-admin");
// import feedRoutes from"../routes/feed";
// import authRoutes from"../routes/auth";
// import userRoute from"./routes/user";

// App Imports
import { NODE_ENV } from "../config/env";

// Load express modules
export default function(server) {
  console.info("SETUP - Loading modules...");

  // Enable CORS
  server.use(cors());

  // Request body parser
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  // Request body cookie parser
  server.use(cookieParser());

  server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

  // Static files folder
  server.use(
    "/public",
    express.static(path.join(__dirname, "..", "..", "/public"))
  );
  // server.use("/images", express.static(path.join(__dirname, "images")));

  // HTTP logger
  // if (NODE_ENV === "development") {
  //   server.use(morgan("tiny"));
  // }
  server.use(morgan("dev"))
  // Load routers
  server.use("/feed", feedRoutes);
  server.use("/auth", authRoutes);
  server.use("/user", userRoute);
  server.use("/shop", shopRoute);
  server.use("/admin", isAdmin, adminRoute);

  // error handler
  server.use((error, req, res, next) => {
    // todo log error properly
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
      message: message,
      data: data
    });
  });
}
