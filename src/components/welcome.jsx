import { useNavigate, useOutletContext } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { addToCart } from "../components/utils/cartFunctions";

import { inCartToast } from "../routes/root";

export default function Welcome() {
  const { products, user, setUser, token, cart, setCart, theme } =
    useOutletContext();

  const navigate = useNavigate();

  if (!products) {
    return <></>;
  }

  return (
    <div id="home_page">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
      <div className="home-page-container">
        <div className="cards-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                id="card"
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <h1 className="product-name">{product.name}</h1>
                <div className="product-image">
                  <img src={product.imageURL} alt={products.name} />
                </div>
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
    </div>
  );
}
