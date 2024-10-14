import { authToken } from "../middleware/authToken.js";
import {
  editProduct,
  getProduct,
  uploadProduct,
} from "../controller/product.controller.js";

import express from "express";

const router = express.Router();

router.post("/upload-product", authToken, uploadProduct);
router.get("/get-product", getProduct);
router.post("/edit-product", authToken, editProduct);

export default router;
