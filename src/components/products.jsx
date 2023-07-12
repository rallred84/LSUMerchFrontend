import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3c1053",
          color: "white",
          textTransform: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease-in-out",

          "&:hover": {
            backgroundColor: "#d29f13",
          },
        },
      },
    },
  },
});

export default function Products() {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({});

  const singleProduct = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts(productId);

      const product = products.find((product) => product.id == productId);
      setProduct(product);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleProduct();
  }, [productId]);

  function addToCart() {
    alert("Product added to cart");
  }
  if (loading) {
    return;
    <> Loading...</>;
  }

  return (
    <div id="product-pg">
      <h1 className="single-product-name">{product.name}</h1>
      <div className="product-details">
        <div className="single-product-image">
          <img src={product.imageURL} alt={product.name} />
        </div>
        <div className="product-info">
          <div className="single-product-price">Price: {product.price}</div>
          <div className="product-description">{product.description}</div>
          <div className="product-page-btn">
            <ThemeProvider theme={theme}>
              <ButtonGroup orientation="vertical">
                <Button onClick={addToCart} className="single-product-btn">
                  Add to Cart
                </Button>{" "}
                <br />
                <Link to="/">
                  <Button className="single-product-btn">
                    Back to Products
                  </Button>{" "}
                </Link>
              </ButtonGroup>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
