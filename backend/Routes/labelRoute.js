import express from "express";
import * as controller from ".././Controllers/Labels.js";

import auth from ".././Middlewares/auth.js";

const app = express.Router();

app.get("/api/labels", controller.getLabels);

export default app;
