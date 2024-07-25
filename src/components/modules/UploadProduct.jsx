import { FaCloudUploadAlt } from "react-icons/fa";
import { productCategory } from "../../utils/productCategory";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { CgClose } from "react-icons/cg";

import uploadImage from "../../utils/uploadImage";
import PropTypes from "prop-types";
import DisplayImage from "./DisplayImage";

const UploadProduct = ({ onClose }) => {
  // =========== State =============
  const [openFullSCreenImage, setOpenFullSCreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  // =========== Function =============
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadImageHandler = async (event) => {
    const file = event.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    console.log("index imgae", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({ ...prev, productImage: [...newProductImage] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    // Here you would typically make a request to your server to save the product
    // For example:
    // axios.post('/api/products', data)
    //   .then(response => {
    //     console.log('Product saved', response.data);
    //   })
    //   .catch(error => {
    //     console.error('There was an error saving the product!', error);
    //   });
  };

  // =========== Rendering =============
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            onClick={onClose}
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 pb-5 overflow-y-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={data.productName}
            onChange={changeHandler}
            placeholder="Enter Product Name..."
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="brandName">Brand Name: </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={data.brandName}
            onChange={changeHandler}
            placeholder="Enter Brand Name..."
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={changeHandler}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            {productCategory.map((category) => (
              <option key={category.id} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="cursor-pointer p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  className="hidden"
                  name="productImage"
                  id="uploadImageInput"
                  onChange={uploadImageHandler}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((item, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={item}
                      alt="item"
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullSCreenImage(true), setFullScreenImage(item);
                      }}
                    />
                    <div
                      onClick={() => handleDeleteProductImage(index)}
                      className="cursor-pointer hidden group-hover:block transition duration-100 absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full"
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price">Price : </label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={changeHandler}
            placeholder="Enter Price..."
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="sellingPrice">Selling Price: </label>
          <input
            type="text"
            id="sellingPrice"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={changeHandler}
            placeholder="Enter selling Price..."
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="description">Description: </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            rows={3}
            name="description"
            onChange={changeHandler}
          ></textarea>

          <button
            type="submit"
            className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
      {openFullSCreenImage && (
        <DisplayImage
          onClose={() => setOpenFullSCreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

UploadProduct.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UploadProduct;
