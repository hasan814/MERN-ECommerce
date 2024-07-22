import { RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import routers from "./routes";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
);
