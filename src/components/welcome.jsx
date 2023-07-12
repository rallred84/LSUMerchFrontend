import { Link, useOutletContext } from "react-router-dom";
import { addProductToCart, createNewCart, getProfile } from "../api";

export default function Welcome() {
  const { products, user, setUser, cart, setCart, token } = useOutletContext();

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
      <div className="cards-container" key={products}>
        {products.length > 0
          ? products.map((product) => {
              // console.log(product);
              return (
                <div id="card" key={product.id}>
                  <div className="products-pg">
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h1 className="product-name">{product.name}</h1>

                      <div className="product-image">
                        <img src={product.imageURL} alt={products.name} />
                      </div>
                      <div className="product-price">
                        Price: {product.price}
                      </div>
                    </Link>
                    <button
                      className="product-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart{" "}
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
