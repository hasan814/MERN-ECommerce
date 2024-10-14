import { FaCloudUploadAlt } from "react-icons/fa";
import { productCategory } from "../../utils/productCategory";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../../utils/uploadImage";
import { SummaryApi } from "../../common";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

import DisplayImage from "./DisplayImage";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const UploadProduct = ({ onClose, fetchData }) => {
  // =============== State ================
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [data, setData] = useState({
    price: "",
    category: "",
    selling: "",
    brandName: "",
    productName: "",
    description: "",
    productImage: "",
  });

  // =============== Handlers ================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(SummaryApi.upload_product.url, {
        method: SummaryApi.upload_product.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProductHandler = async (event) => {
    const file = event.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, uploadImageCloudinary.url],
    }));
  };

  const deleteProductHandler = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: [...newProductImage] }));
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

        <form onSubmit={submitHandler} className="">
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
                required
                name="category"
                value={data.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
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
              <label className="block text-sm font-medium">Product Image</label>
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
                {data?.productImage?.length > 0 ? (
                  <div className="flex items-center gap-2">
                    {data.productImage.map((item, index) => (
                      <div key={uuidv4()} className="relative group">
                        <img
                          alt="item"
                          width={80}
                          src={item}
                          height={80}
                          className="bg-slate-100 border"
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(item);
                          }}
                        />
                        <div
                          onClick={() => deleteProductHandler(index)}
                          className="cursor-pointer absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block"
                        >
                          <MdDelete />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="">*Please Upload Product Image</p>
                )}
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
              <input
                id="selling"
                type="number"
                name="selling"
                value={data.selling}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition"
          >
            Submit Product
          </button>
        </form>
      </div>
      {/* Display Image Full Screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

// ============== Prop Types ==============
UploadProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadProduct;
