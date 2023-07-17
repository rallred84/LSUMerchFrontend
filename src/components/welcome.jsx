import { useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { addToCart } from "../components/utils/cartFunctions";

import { inCartToast } from "../routes/root";
import { useEffect, useState } from "react";

import "../css/homepage.css";

import tigersdenbanner from "../assets/tdbanner2.png";

export default function Welcome() {
  const { products, user, setUser, token, cart, setCart, theme, topOfHome } =
    useOutletContext();

  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);

  const featuredContainer = useRef(null);

  const handleScrollToStore = () => {
    featuredContainer.current.scrollIntoView({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    console.log(products);
    const featuredProducts = products.filter((product) => product.isFeatured);
    const displayedProducts = featuredProducts.sort(() => Math.random() - 0.5);
    setFeatured(displayedProducts.slice(0, 8));
  }, []);

  if (!products) {
    return <></>;
  }

  return (
    <div id="home-page">
      <div ref={topOfHome} className="tigersden-banner">
        <div onClick={handleScrollToStore}>
          <span>Shop Now!</span>
        </div>
        <img src={tigersdenbanner} alt="tigersden banner" />
      </div>
      <h2 ref={featuredContainer} id="featured-header">
        Check Out Some of Today's Featured Items!
      </h2>
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
                className="product-image"
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
      <div>
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        <img
         alt="Creative Commons License"
         style={{ borderWidth: 0 }}
         src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"
        />
      </a>
      <br />
      <span
        xmlns:dct="http://purl.org/dc/terms/"
        href="http://purl.org/dc/dcmitype/StillImage"
        property="dct:title"
        rel="dct:type"
      >
        Tigers Den
      </span>{" "}
        is licensed under a{" "}
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        Creative Commons Attribution-ShareAlike 4.0 International License
      </a>
      <br />
        Based on a work at{" "}
      <a href="https://commons.wikimedia.org/wiki/File:LSU_football_game.jpg">
        Getawaypaul27
      </a>
      <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>,
      via Wikimedia Commons
      </div>
    </div>
  );
}
