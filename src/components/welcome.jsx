import { useNavigate, useOutletContext } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { addToCart } from "../components/utils/cartFunctions";

import { inCartToast } from "../routes/root";
import { useEffect, useState } from "react";

import "../css/homepage.css";

export default function Welcome() {
  const { products, user, setUser, token, cart, setCart, theme } =
    useOutletContext();

  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    console.log(products);
    const featuredProducts = products.filter((product) => product.isFeatured);
    const displayedProducts = featuredProducts.sort(() => Math.random() - 0.5);
    setFeatured(displayedProducts.slice(0, 6));
  }, []);

  if (!products) {
    return <></>;
  }

  return (
    <div id="home-page">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
      <h2 id="featured-header">Check Out Some of Today's Featured Items!</h2>
      <div className="home-cards-container">
        {featured.length > 0 ? (
          featured.map((product) => (
            <div
              id="card"
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <h1 className="product-name">{product.name}</h1>
              <img
                className="home-product-image"
                src={product.imageURL}
                alt={products.name}
              />
              <div className="product-price">Price: {product.price}</div>

              <ThemeProvider theme={theme}>
                <Button
                  className="product-btn"
                  onClick={(e) => {
                    addToCart(
                      e,
                      product,
                      user,
                      setUser,
                      cart,
                      setCart,
                      token,
                      inCartToast
                    );
                  }}
                >
                  Add to Cart
                </Button>
              </ThemeProvider>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
}
