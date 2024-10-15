import { createBrowserRouter } from "react-router-dom";

import ForgotPassword from "../pages/ForgotPassword";
import AllProducts from "../pages/AllProducts";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-users", element: <AllUsers /> },
          { path: "all-products", element: <AllProducts /> },
        ],
      },
    ],
  },
]);

export default router;
