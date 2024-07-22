import { ToastContainer } from "react-toastify";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import { SummaryApi } from "./utils/Api";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Context from "./context/index";
import Header from "./components/modules/Header";
import Footer from "./components/modules/Footer";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // ============ Dispatch =============
  const dispatch = useDispatch();

  // ============ Fetch Data =============
  const fetchUserDetails = async () => {
    const response = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const responseData = await response.json();
    if (responseData.success) dispatch(setUserDetails(responseData.data));
  };
  // ============ Effect =============
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // ============ Rendering =============
  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Context.Provider>
  );
};

export default App;
