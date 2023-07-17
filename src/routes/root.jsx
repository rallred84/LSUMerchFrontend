// This is the main landing page for the app.

import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Nav from "../components/nav";
import { useEffect, useState, useRef } from "react";
import { getAllProducts, getOrders, getProfile, createNewCart } from "../api";
import { createTheme } from "@mui/material/styles";
import { addLoggedOutCartToUser } from "../components/utils/cartFunctions";

import toast, { Toaster } from "react-hot-toast";

export const inCartToast = () => toast("Item Already In Cart");

//All Global state to be saved in this file and then exported to other components via Outlet Context

const Root = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const topOfHome = useRef(null);

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "#3c1053",
            color: "white",
            textTransform: "none",
            fontSize: "1rem",

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
    if (user.id) {
      (async () => {
        if (user.cart.id) {
          setCart(user.cart);
        } else {
          await createNewCart(token);
          const fetchMe = await getProfile(token);
          setUser(fetchMe);
        }

        //Merge existing Cart to User's Cart
        await addLoggedOutCartToUser(user.cart.products, token, setUser);
      })();
    } else {
      const cartString = window.localStorage.getItem("cart");
      console.log(cartString);
      if (cartString) {
        setCart(JSON.parse(cartString));
      } else {
        setCart({ products: [], totalPrice: 0 });
        window.localStorage.setItem(
          "cart",
          JSON.stringify({ products: [], totalPrice: 0 })
        );
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
      <Header user={user} setUser={setUser} setToken={setToken} cart={cart} />
      <Nav
        user={user}
        setUser={setUser}
        setToken={setToken}
        topOfHome={topOfHome}
      />
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
            topOfHome,
          }}
        />
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#f1eedb",
              color: "#461d7c",
              width: "1000px",
              fontSize: "30px",
            },
          }}
          position="bottom-center"
        />
      </div>
    </>
  );
};

export default Root;
