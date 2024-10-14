import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from "./AdminEditProduct";
import PropTypes from "prop-types";

const AdminProductCard = ({ data, fetchData }) => {
  // ============== State ==============
  const [editProduct, setEditProduct] = useState(false);

  // ============== Rendering ==============
  return (
    <div className="w-full max-w-md p-6 border rounded-lg shadow-lg bg-transparent">
      <div className="w-full max-w-md flex flex-col justify-between min-h-[300px]">
        {/* Product Image */}
        <div className="flex justify-center mb-4">
          <img
            width={150}
            height={150}
            alt="productImage"
            src={data.productImage[0]}
            className="rounded-lg"
          />
        </div>
        {/* Product Details */}
        <div className="mb-4 text-center">
          <p className="text-lg text-gray-600 mb-2">Brand: {data.brandName}</p>
          <p className="text-lg text-gray-600 mb-2">
            Category: {data.category}
          </p>
          <p className="text-lg text-gray-600 mb-2">Price: ${data.price}</p>
        </div>
        {/* Edit Button */}
        <div className="flex justify-center mt-auto">
          <button
            onClick={() => setEditProduct(true)}
            className="flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
          >
            <CiEdit size={20} />
            Edit
          </button>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editProduct && (
        <AdminEditProduct
          product={data}
          fetchData={fetchData}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

AdminProductCard.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    productImage: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default AdminProductCard;
