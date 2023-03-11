import "express-async-errors";
import nodemailer from "nodemailer";
import User from "../Models/userModel.js";
/** @type {import("express").RequestHandler} */
export async function createUser(req, res, next) {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = new User(data);
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
      message: "Sie dürfen nicht eingeloggt sein, E-Mail stimmt nicht überein.",
    });
  }
  const passwordsAreEqual = await user.checkPassword(req.body.password);

  if (!passwordsAreEqual) {
    return next({
      status: 404,
      message:
        "Sie dürfen nicht eingeloggt sein, das Passwort stimmt nicht überein.",
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
    message: "Willkommen, Sie sind jetzt angemeldet !",
  });
}
/** @type {import("express").RequestHandler} */
export async function getUser(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(user.name);

  res.status(200).send(user);
}
//Logout
/** @type {import("express").RequestHandler} */
export async function logoutUser(req, res) {
  const user = req.user;
  const token = req.cookies.tokens;
  const filteredTokens = user.tokens.filter((el) => el !== token);
  user.tokens = filteredTokens;
  await user.save();
  res.clearCookie("token").status(200).send("Logout successfully completed");
}

// Send mail from testing email account
export async function sendMessage(req, res, next) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = {
    from: "berlioz2001@yahoo.fr", // sender address
    to: "berlioz2001@yahoo.fr, ", // list of receivers
    subject: "Deine mail an us!", // Subject line
    text: req.body.mail, // plain text body
    // html body
  };
  let receiveMessage = {
    from: "berlioz2001@yahoo.fr", // sender address
    to: "berlioz2001@yahoo.fr, ", // list of receivers
    subject: "Mail vom Kontaktformular", // Subject line
    text: req.body.mail, // plain text body
    // html body
  };
  try {
    const messageOne = await transporter.sendMail(message);
    console.log(messageOne);
    const messageTwo = await transporter.sendMail(receiveMessage);
    res.status(200).send({ id: [messageOne.messageId, messageTwo.messageId] });
  } catch (err) {
    res.status(500).send(err);
  }
}
// Send mail from real email address
