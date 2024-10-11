import { FaCloudUploadAlt } from "react-icons/fa";
import { productCategory } from "../../utils/productCategory";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

import PropTypes from "prop-types";

const UploadProduct = ({ onClose }) => {
  // =============== State ================
  const [uploadProductImageInput, setUploadProductImageInput] = useState("");
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    selling: "",
  });

  // =============== Handlers ================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", data);
    onClose();
  };

  const uploadProductHandler = (event) => {
    const file = event.target.files[0];
    setUploadProductImageInput(file.name);
    console.log(file);
  };

  // =============== Rendering ================
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="p-4 bg-blue-300 rounded-lg w-full max-w-2xl h-full overflow-hidden max-h-[80%] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            onClick={onClose}
            className="w-fit text-2xl hover:text-red-500 cursor-pointer"
          >
            <CgClose />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium">Product Name</label>
              <input
                required
                type="text"
                name="productName"
                value={data.productName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Brand Name</label>
              <input
                required
                type="text"
                name="brandName"
                value={data.brandName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={data.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a category</option>
                {productCategory.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Product Image URL
              </label>
              <label htmlFor="UploadImageInput">
                <div className="p-2 bg-slate-100 border rounded h-32 w-full cursor-pointer">
                  <div className="text-slate-500 flex items-center justify-center gap-2 flex-col">
                    <span className="text-4xl">
                      <FaCloudUploadAlt />
                    </span>
                    <p className="text-sm">Upload Product Image</p>
                    <input
                      type="file"
                      className="hidden"
                      id="UploadImageInput"
                      onChange={uploadProductHandler}
                    />
                  </div>
                </div>
              </label>
              <div>
                <img
                  src=""
                  alt=""
                  height={80}
                  width={80}
                  className="bg-slate-100 border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Selling Status
              </label>
              <select
                name="selling"
                value={data.selling}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Status</option>
                <option value="For Sale">For Sale</option>
                <option value="Not for Sale">Not for Sale</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

// ============== Prop Types ==============
UploadProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadProduct;
