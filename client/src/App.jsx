import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { useEffect } from "react";
import { SummaryApi } from "./common";
import { Context } from "./context";

const App = () => {
  // ========== State ===========
  // ========== Function ===========
  const fetchUserDetails = async () => {
    const response = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const responseData = await response.json();
    console.log(responseData);
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
