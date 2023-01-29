import express from "express";
import * as validations from ".././Lib/userValidation.js";
import * as controller from "../Controllers/CategoryController.js";

const app = express.Router();
app.post(
  "/api/categories",
  ...validations.category,
  controller.createCategories
);
app.get("/api/categories", controller.getCategories);

export default app;
