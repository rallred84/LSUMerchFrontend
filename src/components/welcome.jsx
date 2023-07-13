import { Link, useOutletContext } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

export default function Welcome() {
  const { products, user, setUser, token, theme } = useOutletContext();

  if (!products) {
    return <></>;
  }

  return (
    <div id="home_page">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
      <div className="home-page-container">
        <div className="welcome-container">
          <div id="categories" className="categories-container">
            <h2 className="categories-heading">Categories</h2>
            <ul className="categories-list">
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
                      <Button className="product-btn">View Product </Button>{" "}
                    </ThemeProvider>
                  </Link>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
