import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database connected successfully");
}).catch((error) => {
  console.log("Failed to connect to database:", error);
})

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", async (request, response) => {
  response.status(200).json({
    message: "Welcome to OU Task Management Backend API",
  });
});

app.use("/api-v1", routes);

//error middleware
app.use((error, request, response, next) => {
  console.log(error.stack);
  response.status(500).json({
    message: "Internal Server Error!",
  });
});

//Not found middleware
app.use((request, response) => {
  response.status(404).json({
    message: "Not Found!",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
