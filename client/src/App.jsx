import { useDispatch } from "react-redux";
import { SummaryApi } from "./common";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Context } from "./context";
import { Outlet } from "react-router-dom";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  // ========== Redux ===========
  const dispatch = useDispatch();

  // ========== Function ===========
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const responseData = await response.json();
      if (responseData.success) {
        dispatch(setUserDetails(responseData.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // ========== Effect ===========
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // ========== Rendering ===========
  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <Toaster />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
};

export default App;
