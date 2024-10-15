import { useState } from "react";
import { CiEdit } from "react-icons/ci";

import AdminEditProduct from "./AdminEditProduct";
import PropTypes from "prop-types";

const AdminProductCard = ({ data, fetchData }) => {
  // ============== State ==============
  const [editProduct, setEditProduct] = useState(false);

  // ============== Rendering ==============
  return (
    <>
      <div className="max-w-sm bg-transparent rounded-lg shadow-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative group">
          <img
            alt="productImage"
            src={data.productImage[0]}
            className="w-full h-48 object-contain mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setEditProduct(true)}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              <CiEdit size={20} />
              Edit
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {data.brandName}
          </h3>
          <p className="text-gray-600 mb-2">Category: {data.category}</p>
          <p className="text-gray-600 mb-4">Price: ${data.price}</p>
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
    </>
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
