import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Welcome from "./components/welcome";

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
      // { path: "/login", element: <Login /> },
      // { path: "/register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
