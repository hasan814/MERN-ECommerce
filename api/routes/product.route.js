import { uploadProduct } from "../controller/product.controller.js";
import { authToken } from "../middleware/authToken.js";

import express from "express";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);

export default router;
