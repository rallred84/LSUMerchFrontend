import { Link, useOutletContext } from "react-router-dom";

export default function Welcome() {
  const { products } = useOutletContext();

  // console.log(products);

  if (!products) {
    return <></>;
  }

  // function singleProduct(products) {
  //   window.location.href = `/products`;
  //   // <div id="products-pg" key={product.id}>
  //   //   <div id="product-name">${product.name}</div>
  //   //   <div id="product-des">${product.description}</div>
  //   //   <div id="product-price">${product.price}</div>
  //   //   <div id="product-stock">${product.stockQuantity}</div>
  //   //   <div id="product-img">
  //   //     <img src="${product.imageUrl}" alt="${product.name}" />
  //   //     <button id="product-btn" onClick="addToCart(${product.id})">
  //   //       Add to Cart
  //   //     </button>
  //   //   </div>
  //   // </div>;
  // }
  function addToCart() {
    alert("Product added to cart");
  }
  return (
    <div className="home_page">
      <h1 id="welcome">Welcome To Our LSU Merch!</h1>

      <div id="cards-container">
        {products && products.length
          ? products.map((product) => {
              return (
                <div id="card" key={product.id}>
                  <div className="products-pg">
                    <Link to="/products">
                      <h1 className="product-name">{product.name}</h1>
                      {/* <div id="product-des">{product.description}</div> */}
                      <div className="product-image">
                        <img
                          src="https://placekitten.com/640/360"
                          alt={product.name}
                        />
                      </div>
                    </Link>
                    <div className="product-price">{product.price}</div>
                    {/* <div id="product-stock">{product.stockQuantity}</div> */}
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
