import express from "express";
import * as controller from "../Controllers/UserController.js";
import * as validations from ".././Lib/userValidation.js";
import auth from "../Middlewares/auth.js";

const app = express.Router();

app.post("/register", ...validations.register, controller.createUser);
app.post("/login", ...validations.login, controller.loginUser);
app.get("/", auth, controller.getUser);

export default app;
