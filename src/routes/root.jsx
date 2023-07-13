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

  //Use Effect for Fetching all Products and initial user when page first loads
  useEffect(() => {
    (async () => {
      setIsLoadingProducts(true);
      const fetchProducts = await getAllProducts();
      setProducts(fetchProducts);
      if (fetchProducts) {
        setIsLoadingProducts(false);
      }
      const tokenInStorage = window.localStorage.getItem("token");
      setToken(tokenInStorage);
      // if (!tokenInStorage) {
      //   window.localStorage.setItem("cart", JSON.stringify({ products: [] }));
      // }
    })();
    // };
  }, []);

  //After Token is assigned, fetch user
  useEffect(() => {
    (async () => {
      if (token) {
        setToken(token);
        const fetchMe = await getProfile(token);
        setUser(fetchMe);
      }
    })();
  }, [token]);

  //After user logs in, set user's cart
  useEffect(() => {
    if (user?.id) {
      setCart(user.cart);
      console.log(user.cart);
      //Will add merging cart functionality here later
      window.localStorage.removeItem("cart");
    } else {
      const cartString = window.localStorage.getItem("cart");
      if (cartString) {
        setCart(JSON.parse(cartString));
      } else {
        setCart({ products: [] });
        window.localStorage.setItem("cart", JSON.stringify({ products: [] }));
      }
    }
  }, [user]);

  useEffect(() => {
    if (cart.products) {
      console.log(cart);
    }
  }, [cart]);

  //Lets move this useEffect to the admin dashboard
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

  if (isLoadingProducts) {
    return <>Loading...</>;
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
