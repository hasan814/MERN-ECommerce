import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

import router from "./routes/index.jsx";

import "./index.css";
import store from "./store/store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
