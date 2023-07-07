// This is the main landing page for the app.

import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Nav from '../components/nav';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../api';

//All Global state to be saved in this file and then exported to other components via Outlet Context

const Root = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const fetchProducts = await getAllProducts();
      setProducts(fetchProducts)
    }

    fetchAllProducts()
  }, [])

  return (
    <>
      <Header />
      <Nav />
      <div id="main">
        <Outlet context={{products, setToken}} />
      </div>
    </>
  );
};

export default Root;
