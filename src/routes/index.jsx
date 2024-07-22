import { createBrowserRouter } from "react-router-dom";

import ForgotPassword from "../pages/ForgatPassword";
import AdminPanel from "../pages/AdminPanel";
import Products from "../pages/Products";
import AllUsers from "../pages/AllUsers";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import App from "../App";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "all-products", element: <Products /> },
        ],
      },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default routers;
