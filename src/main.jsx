import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Welcome from "./components/welcome";
import Login from "./components/login";
import Checkout from "./components/checkout";
import Account from "./components/account";
import Admin from "./components/admin";
import Products from "./components/products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      /*Add Routes Here*/
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
