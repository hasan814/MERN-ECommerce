import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    price: { type: Number, required: true },
    selling: { type: Number },
    productImage: { type: [String] },
    category: { type: String, required: true, trim: true },
    brandName: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
