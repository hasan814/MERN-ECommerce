import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SummaryApi } from "../../common";

import UploadProduct from "../modules/UploadProduct";
import Loader from "../modules/Loader";
import toast from "react-hot-toast";
import AdminProductCard from "../modules/AdminProductCard";

const AllProductsPage = () => {
  // ================ State =================
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================ Fetch Function =================
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.get_product.url, {
        method: SummaryApi.get_product.method,
        credentials: "include",
      });
      const responseData = await response.json();
      setAllProducts(responseData.data);
    } catch (error) {
      console.log(error);
      toast.error("Error in Fetching Data");
    } finally {
      setLoading(false);
    }
  };

  // ================ Effect =================
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ================ Close Function =================
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

      {/* All products or loader */}
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {allProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts.map((product) => (
                  <AdminProductCard
                    key={uuidv4()}
                    data={product}
                    fetchData={fetchAllProducts}
                  />
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </div>

      {/* Conditionally render the UploadProduct component */}
      {showUploadForm && (
        <div className="mb-6">
          <UploadProduct
            onClose={handleCloseForm}
            fetchData={fetchAllProducts}
          />
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
