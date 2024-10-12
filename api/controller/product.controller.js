import { uploadProductPermission } from "../utils/permission.js";

import Product from "../models/product.model.js";

export const uploadProduct = async (req, res) => {
  try {
    const sessionUserId = req.userId;

    const hasPermission = await uploadProductPermission(sessionUserId);
    if (!hasPermission) {
      throw new Error("Permission Denied!");
    }

    const {
      price,
      selling,
      category,
      brandName,
      productName,
      description,
      productImage,
    } = req.body;

    if (!price || !category || !brandName || !productName) {
      return res.status(400).json({
        message:
          "Required fields missing: price, category, brandName, productName",
        error: true,
        success: false,
      });
    }

    const newProduct = new Product({
      price,
      selling,
      category,
      brandName,
      description,
      productName,
      productImage,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product uploaded successfully",
      product: savedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
