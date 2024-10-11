import { authToken } from "../middleware/authToken.js";
import {
  AllUsers,
  userDetailsController,
} from "../controller/user.controller.js";

import express from "express";

const router = express.Router();

router.get("/user-details", authToken, userDetailsController);
router.get("/all-users", authToken, AllUsers);

export default router;
