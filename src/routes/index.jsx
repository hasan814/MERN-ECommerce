import { createBrowserRouter } from "react-router-dom";

import ForgotPassword from "../pages/ForgatPassword";
import Login from "../pages/Login";
import Home from "../pages/Home";
import App from "../App";
import SignUp from "../pages/SignUp";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default routers;
