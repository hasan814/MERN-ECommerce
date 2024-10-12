import { uploadProduct } from "../controller/product.controller.js";

import express from "express";

const router = express.Router();

router.post("/upload-product", uploadProduct);

export default router;
