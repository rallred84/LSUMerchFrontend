import { Link, useOutletContext } from "react-router-dom";
import { addProductToCart, createNewCart, getProfile } from "../api";
import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

export default function Welcome() {
  const { products, user, setUser, token, theme } = useOutletContext();

  if (!products) {
    return <></>;
  }

  async function addToCart(productId) {
    alert("Added to cart");
    if (!user.cart.id) {
      await createNewCart(token);
    }
    await addProductToCart(token, productId);
    const fetchMe = await getProfile(token);
    setUser(fetchMe);
  }

  return (
    <div id="home_page">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
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
              </Link>
              <ThemeProvider theme={theme}>
                <Button
                  onClick={() => addToCart(product.id)}
                  className="product-btn"
                >
                  Add to Cart
                </Button>{" "}
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
