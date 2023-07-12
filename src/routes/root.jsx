// This is the main landing page for the app.

import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import { getAllProducts, getOrders, getProfile } from "../api";
import { createTheme } from "@mui/material/styles";

//All Global state to be saved in this file and then exported to other components via Outlet Context

const Root = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#3c1053",
            color: "white",
            textTransform: "none",

            "&:hover": {
              backgroundColor: "#d29f13",
              color: "white",
              textTransform: "none",
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoadingProducts(true);
      const fetchProducts = await getAllProducts();
      setProducts(fetchProducts);
      if (fetchProducts) {
        setIsLoadingProducts(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingProducts(true);
      const token = window.localStorage.getItem("token");
      if (token) {
        setToken(token);
        const fetchMe = await getProfile(token);
        setUser(fetchMe);
        setIsLoadingProducts(false);
      }
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (user.isAdmin) {
      const fetchOrders = async () => {
        const fetchAllOrders = await getOrders(token);
        console.log(fetchAllOrders);
        setOrders(fetchAllOrders);
      };
      fetchOrders();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      console.log(user.cart);
    }
  }, [user]);

  useEffect(() => {
    if (!user.id) {
      const cartString = window.localStorage.getItem("cart");
      if (!cartString) {
        window.localStorage.setItem("cart", JSON.stringify(cart));
      }
      console.log(JSON.parse(cartString));
    }
  }, []);

  if (isLoadingProducts) {
    return;

    <>Loading...</>;
  }

  return (
    <>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <Nav user={user} setUser={setUser} setToken={setToken} />
      <div id="main">
        <Outlet
          context={{
            theme,
            products,
            setToken,
            token,
            user,
            setUser,
            cart,
            setCart,
            setProducts,
            isLoadingProducts,
            setIsLoadingProducts,
            orders,
            setOrders,
          }}
        />
      </div>
    </>
  );
};

export default Root;
