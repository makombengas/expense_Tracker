import mongoose from "mongoose";
const Transaction_model = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  type: { type: String, default: "Investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now() },
});

const Transaction = mongoose.model(
  "Transactions",
  Transaction_model,
  "transactions"
);
export default Transaction;
