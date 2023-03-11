import mongoose from "mongoose";
const Categories_model = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, default: "Investition" },
  color: { type: String, default: "#FCBE44" },
});

const Category = mongoose.model("Category", Categories_model, "category");
export default Category;
