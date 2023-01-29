import "express-async-errors";
import User from "../Models/userModel.js";
/** @type {import("express").RequestHandler} */
export async function createUser(req, res, next) {
  const user = new User(req.body);
  await user.save();
  const token = user.generateAuthToken("12h");
  await user.save();
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  };
  res
    .cookie("token", token, cookieOptions)
    .status(201)
    .send({
      name: user.name,
      message: `${user.name}, your account was created successfully`,
    });
}
/** @type {import("express").RequestHandler} */
export async function loginUser(req, res, next) {
  const user = await new User.findByEmail(req.body.email);
  if (!user) {
    return next({
      status: 404,
      message: "you shall not be logged in email not matches",
    });
  }
  const passwordsAreEqual = await user.checkPassword(req.body.password);

  if (!passwordsAreEqual) {
    return next({
      status: 404,
      message: "you shall not be logged in password not matches",
    });
  }

  const token = await user.generateAuthToken("12h");
  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    smeSite: "lax",
  };
  res.cookie("token", token, cookieOptions).status(200).send({
    name: user.name,
    message: "Welcome, you are now logged in",
  });
}
/** @type {import("express").RequestHandler} */
export async function getUser(req, res) {
  const user = req.user;
  console.log(user);

  res.status(200).send(user);
}
