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
import NewProduct from "./components/newproduct";
import ManageProducts from "./components/manageproducts";
import EditProduct from "./components/editproduct";
import ErrorPage from "./error";
import ManageOrders from "./components/manageorders";
import AllProducts from "./components/allproducts";
import CreateReview from "./components/newreview";
import EditReview from "./components/editreview";
import OrderConfirmation from "./components/orderConfirmation";
import ManageUsers from "./components/manageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
        path: "/new-product",
        element: <NewProduct />,
      },
      {
        path: "/manage-products",
        element: <ManageProducts />,
      },
      {
        path: "/manage-products/:productId",
        element: <EditProduct />,
      },
      {
        path: "/products/:productId",

        element: <Products />,
      },
      {
        path: "/manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/reviews/:productId",
        element: <CreateReview />,
      },
      {
        path: "/:productId/editreview",
        element: <EditReview />,
      },
      {
        path: "confirmation/:orderId",
        element: <OrderConfirmation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
