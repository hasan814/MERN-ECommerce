import { useState } from "react";

import UploadProduct from "../modules/UploadProduct";

const AllProductsPage = () => {
  // ================ State =================
  const [showUploadForm, setShowUploadForm] = useState(false);

  // ================ Handlers =================
  const handleCloseForm = () => {
    setShowUploadForm(false);
  };

  // ================ Rendering =================
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          {showUploadForm ? "Close Upload Form" : "Upload Product"}
        </button>
      </div>

      {/* Conditionally render the UploadProduct component */}
      {showUploadForm && (
        <div className="mb-6">
          <UploadProduct onClose={handleCloseForm} />
        </div>
      )}

      {/* You can add your product list rendering logic here */}
      <div className="border-t pt-4">
        {/* Placeholder for product list */}
        <p>Product List will be displayed here.</p>
      </div>
    </div>
  );
};

export default AllProductsPage;
