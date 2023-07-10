import { useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, getAllProducts } from "../api";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";


import { ThemeProvider } from "@mui/material/styles";

export default function Products() {
  const { productId } = useParams();
  const { products } = useOutletContext();

  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { theme } = useOutletContext();

  const singleProduct = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts(productId);

      let productName = response[productId - 1].name;
      let price = response[productId - 1].price;
      let description = response[productId - 1].description;

      setProductName(productName);
      setPrice(price);
      setDescription(description);
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
      <h1 className="single-product-name">{productName}</h1>
      <div className="product-description">{description}</div>
      <div className="single-product-image">
        <img src="https://placekitten.com/640/360" alt={products.name} />
      </div>
      <div className="single-product-price">Price: {price}</div>
      <div className="product-page-btn">
        {" "}
        <ThemeProvider theme={theme}>
          {" "}
          <Button onClick={addToCart} className="single-product-btn">
            Add to Cart
          </Button>{" "}
          <br />
          <Link to="/">
            <Button className="single-product-btn">Back to Products</Button>{" "}
          </Link>
        </ThemeProvider>
      </div>
    </div>
  );
}
