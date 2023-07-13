import { Link, useOutletContext } from "react-router-dom";
import { addProductToCart, createNewCart, getProfile } from "../api";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

export default function AllProducts() {
  const { products, user, setUser, token, theme } = useOutletContext();

  if (!products) {
    return <></>;
  }
  return (
    <div id="home_page" className="home-page-container">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
      <div className="product-container">
        <div id="categories" className="categories-container">
          <h3 className="categories-heading">Category Name here</h3>
          <ul className="products-categories-list">
            <li>
              <Link to="/all-products">Men's</Link>
            </li>
            <li>
              <Link to="/all-products">Women's</Link>
            </li>
            <li>
              <Link to="/all-products">Kids's</Link>
            </li>
            <li>
              <Link to="/all-products">T-Shirts</Link>
            </li>
            <li>
              <Link to="/all-products">Sweatshirts</Link>
            </li>
            <li>
              <Link to="/all-products">Hats</Link>
            </li>
            <li>
              <Link to="/all-products">Accessories</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="cards-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div id="card" key={product.id} className="product-card">
              <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <h1 className="product-name">{product.name}</h1>
                <div className="product-image">
                  <img src={product.imageURL} alt={products.name} />
                </div>
                <div className="product-price">Price: {product.price}</div>

                <ThemeProvider theme={theme}>
                  <Button className="view-product-btn">View Product</Button>{" "}
                </ThemeProvider>
              </Link>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
}
