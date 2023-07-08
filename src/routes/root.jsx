// This is the main landing page for the app.

import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api";

//All Global state to be saved in this file and then exported to other components via Outlet Context

const Root = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoadingProducts(true);
      const fetchProducts = await getAllProducts();
      setProducts(fetchProducts);
      setIsLoadingProducts(false);
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <Header />
      <Nav />
      <div id="main">
        <Outlet
          context={{ products, setToken, setIsLoadingProducts, setProducts }}
        />
      </div>
    </>
  );
};

export default Root;
