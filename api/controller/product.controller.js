import { uploadProductPermission } from "../utils/permission.js";

import Product from "../models/product.model.js";

// =============== Upload Product ================
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

// =============== Get Product ================
export const getProduct = async (req, res) => {
  try {
    const allProduct = await Product.find().sort({ createAt: -1 });
    if (!allProduct || allProduct.length === 0) {
      return res.status(404).json({
        message: "No products found",
        success: false,
        error: true,
        data: [],
      });
    }
    return res.status(200).json({
      message: "All Products",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

// =============== Edit Product ================
export const editProduct = async (req, res) => {
  const sessionUserId = req.userId;

  const hasPermission = await uploadProductPermission(sessionUserId);
  if (!hasPermission) {
    throw new Error("Permission Denied!");
  }

  const { _id, ...resBody } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(_id, resBody);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// =============== Get Category ================
export const getCategory = async (req, res) => {
  try {
    const ProductCategory = await Product.distinct("category");

    const ProductByCategory = [];
    for (const category of ProductCategory) {
      const product = await Product.findOne({ category });
      if (product) ProductByCategory.push(product);
    }

    return res.status(200).json({
      error: false,
      success: true,
      data: ProductByCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
