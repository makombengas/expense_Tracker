import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import categoryRoute from "./Routes/categoryRoute.js";
import transactionRoute from "./Routes/transactionRoute.js";
import userRoute from "./Routes/userRouter.js";
import labelRoute from "./Routes/labelRoute.js";
dotenv.config();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_CONN)
  .then(() => {
    console.log("connection avec la base de données");
  })
  .catch(() => {
    console.log("Erreur sur la connection avec la base de données ");
  });
const app = express();
/* use middleware */
app.use(cors({ origin: "*" }));
/* use middleware in json format */
app.use(express.json());
/* using Routes */
app.use("/", categoryRoute);
app.use("/", transactionRoute);
app.use("/user", userRoute);
app.use("/", labelRoute);
const PORT = process.env.port;
app.use((req, res, next) => {
  console.log("calling models");
  next({
    status: 404,
    message: "models not found",
  });
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    message: error.message,
  });
});
app.listen(PORT, () => {
  console.log("Application en écoute sur le port", PORT);
});
