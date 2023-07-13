import { Link, useOutletContext } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

export default function Welcome() {

  const { products, user, setUser, token, cart, setCart, theme } =
    useOutletContext();


  if (!products) {
    return <></>;
  }
  async function addToCart(product) {
    if (!user.id) {
      addToAnonCart(product);
      return;
    }
    if (!user.cart.id) {
      await createNewCart(token);
    }
    await addProductToCart(token, product.id);
    const fetchMe = await getProfile(token);
    setUser(fetchMe);
  }

  function addToAnonCart(product) {
    if (!cart?.products) {
      console.log("no products yet");
      cart.products = [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
      console.log(cart);
      window.localStorage.setItem("cart", JSON.stringify(cart));

      return;
    }
    let alreadyInCart = false;
    cart.products.forEach((p) => {
      if (p.id === product.id) {
        alreadyInCart = true;
        return;
      }
    });

    if (alreadyInCart) {
      console.log("Item already in cart");
      return;
    }

    cart.products.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    console.log(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div id="home_page">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
      <div className="home-page-container">
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
                    <Button
                      className="product-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart{" "}
                    </Button>{" "}
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
  );
}
