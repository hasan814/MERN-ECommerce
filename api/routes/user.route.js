import { userDetailsController } from "../controller/user.controller.js";
import { authToken } from "../middleware/authToken.js";

import express from "express";

const router = express.Router();

router.get("/user-details", authToken, userDetailsController);

export default router;
