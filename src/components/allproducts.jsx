import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useRef } from "react";
import { addProductToCart, createNewCart, getProfile } from "../api";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { addToCart } from "./utils/cartFunctions";
import "../css/allproducts.css";

import { inCartToast } from "../routes/root";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const { products, user, setUser, cart, setCart, token, theme } =
    useOutletContext();

  const productContainer = useRef(null);

  const navigate = useNavigate();
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    setDisplayedProducts(products);
  }, []);

  const handleCategorySelect = (categoryString) => {
    if (categoryString === "All") {
      setDisplayedProducts(products);
      productContainer.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (categoryString === "Featured") {
      const newDisplayedProducts = products.filter(
        (product) => product.isFeatured === true
      );
      setDisplayedProducts(newDisplayedProducts);
      productContainer.current.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    const newDisplayedProducts = products.filter(
      (product) => product.category === categoryString
    );
    setDisplayedProducts(newDisplayedProducts);
    productContainer.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!products) {
    return <></>;
  }
  return (
    <div id="all-products">
      <div className="categories-container">
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("All")}
          >
            All Products
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Clothing")}
          >
            Clothing
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Accessories")}
          >
            Accessories
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Memorabilia")}
          >
            Memorabilia
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Baby")}
          >
            Baby
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Household")}
          >
            Household
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            className="category-button"
            onClick={() => handleCategorySelect("Featured")}
          >
            Featured
          </Button>
        </ThemeProvider>
      </div>

      <div ref={productContainer} className="cards-container">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div
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
                  onClick={(e) =>
                    addToCart(
                      e,
                      product,
                      user,
                      setUser,
                      cart,
                      setCart,
                      token,
                      inCartToast
                    )
                  }
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
