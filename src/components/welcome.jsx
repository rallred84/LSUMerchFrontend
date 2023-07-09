import { Link, useOutletContext } from "react-router-dom";

export default function Welcome() {
  const { products } = useOutletContext();

  if (!products) {
    return <></>;
  }

  function addToCart() {
    alert("Added to cart");
  }
  return (
    <div id="home_page">
      <h1 id="welcome">Welcome To The Tigers Den!</h1>
      <div className="cards-container" key={products}>
        {products.length > 0
          ? products.map((product) => {
              return (
                <div id="card" key={product.id}>
                  <div className="products-pg">
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h1 className="product-name">{product.name}</h1>

                      <div className="product-image">
                        <img
                          src="https://placekitten.com/640/360"
                          alt={products.name}
                        />
                      </div>
                      <div className="product-price">
                        Price: {product.price}
                      </div>
                    </Link>
                    <button className="product-btn" onClick={addToCart}>
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
