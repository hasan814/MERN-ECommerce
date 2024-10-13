import { getProduct, uploadProduct } from "../controller/product.controller.js";
import { authToken } from "../middleware/authToken.js";

import express from "express";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);
router.get("/get-product", authToken, getProduct);

export default router;
