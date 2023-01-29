import express from "express";
import * as validations from ".././Lib/userValidation.js";
import * as controller from "../Controllers/TransactionController.js";

const app = express.Router();

// post a new transaction
app.post(
  "/api/transaction",
  ...validations.transaction,
  controller.createTransaction
);

//get all the transaction
app.get("/api/transaction", controller.getTransaction);
app.delete("/api/transactions", controller.deleteAllTransaction);

export default app;
