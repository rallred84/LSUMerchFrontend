import { Link, useOutletContext } from "react-router-dom";
import { addProductToCart, createNewCart, getProfile } from "../api";

export default function Welcome() {
  const { products, user, setUser, token } = useOutletContext();

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
                      onClick={() => addToCart(product.id)}
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
