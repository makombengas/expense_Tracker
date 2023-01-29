import { body } from "express-validator";
import validate from "../Middlewares/validate.js";
import User from "../Models/userModel.js";

export const register = [
  body("name").isString().optional().withMessage("Bitte gib deinen namen ein"),
  body("password")
    .isStrongPassword()
    .withMessage("Bitte ein stärk password wählen"),
  body("email")
    .isEmail()
    .withMessage("Die Email ist nicht korrekt")
    .custom(async (value) => {
      const user = await User.findByEmail(value);
      if (user) throw new Error("Die Email existiert bereits");
      return true;
    }),
  validate,
];
export const transaction = [
  body("name").isString().withMessage("your name ist not correct"),
  body("type").isString().withMessage("your type ist not correct"),
  body("amount")
    .isNumeric()
    .withMessage("your transaction amount ist not correct"),
];

export const category = [
  body("type").isString().withMessage("your type ist not correct"),
  body("color").isString().withMessage("your color ist not correct"),
];

export const login = [
  body("password").isString(),
  body("email").isEmail().withMessage("Die Email ist nicht korrekt"),
  validate,
];
