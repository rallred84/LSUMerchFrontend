import { Link, useOutletContext } from "react-router-dom";

export default function Welcome() {
  const token = localStorage.getItem("token");

  const { products } = useOutletContext();

  // console.log(products);

  if(!products) {
    return <></>
  }

  return (
    <div className="home_page">
      <h1 id="welcome">Welcome To Our LSU Merch!</h1>
        {products && products.length
        ? products.map((product) => {
          return(
            <div id="products-pg" key={product.id}>
              <div id="product-name">{product.name}</div> 
              <div id="product-des">{product.description}</div> 
              <div id="product-price">{product.price}</div> 
              <div id="product-stock">{product.stockQuantity}</div>
            </div>
          )
        }) : null}
    </div>
  );
}
