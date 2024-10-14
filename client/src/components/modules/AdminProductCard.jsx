import { useState } from "react";
import { CiEdit } from "react-icons/ci";

import AdminEditProduct from "./AdminEditProduct";
import PropTypes from "prop-types";

const AdminProductCard = ({ data }) => {
  // ============== State ==============
  const [editProduct, setEditProduct] = useState(false);

  // ============== Rendering ==============
  return (
    <div className="flex flex-col items-center justify-center gap-2 border rounded p-4 shadow-lg">
      <img
        width={100}
        height={100}
        alt="productImage"
        src={data.productImage[0]}
        className="bg-blend-multiply"
      />
      <h1>{data.productName}</h1>
      <div
        onClick={() => setEditProduct(true)}
        className="w-fit ml-auto p-2 bg-red-400 hover:bg-red-600 rounded-full cursor-pointe r hover:text-white"
      >
        <CiEdit />
      </div>
      {editProduct && (
        <AdminEditProduct
          product={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

AdminProductCard.propTypes = {
  data: PropTypes.shape({
    productImage: PropTypes.arrayOf(PropTypes.string).isRequired,
    productName: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminProductCard;
