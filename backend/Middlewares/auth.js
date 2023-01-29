import User from "../Models/userModel.js";
import httpErrors from "http-errors";

export default async function auth(req, res, next) {
  const token = req.cookies.token;
  // console.log(req.cookies.token);

  if (!token) throw httpErrors.Unauthorized("Not allowed to pass");

  const user = await User.findByAuthToken(token);

  if (!user) throw httpErrors.Unauthorized("Not allowed to pass");

  req.user = user;
  next();
}
