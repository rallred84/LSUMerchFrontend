import { useOutletContext, Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllProducts } from "../api";
import { useParams } from "react-router-dom";

export default function Products() {
  const { productId } = useParams();
  const { products, setToken, setIsLoadingProducts, setProducts } =
    useOutletContext();
  // useEffect(() => {
  //   const fetchAllProducts = async () => {
  //     setIsLoadingProducts(true);
  //     const fetchProducts = await getAllProducts();
  //     setProducts(fetchProducts);
  //     setIsLoadingProducts(false);
  //   };

  //   fetchAllProducts();
  // }, []);
  // let product = products.find((product) => product.id === productId);
  useEffect(() => {
    product = products.find((product) => product.id === productId);
  }, [products]);
  function addToCart() {
    alert("Product added to cart");
  }

  // function singleProduct() {
  //   <div id="products-pg" key={products.id}>
  //     <div id="product-name">${products.name}</div>
  //     <div id="product-des">${products.description}</div>
  //     <div id="product-price">${products.price}</div>
  //     <div id="product-stock">${products.stockQuantity}</div>
  //     <div id="product-img">
  //       <img src="${product.imageUrl}" alt="${product.name}" />
  //       <button id="product-btn" onClick="addToCart(${product.id})">
  //         Add to Cart
  //       </button>
  //     </div>
  //   </div>;
  //   // console.log(products);
  // }
  if (!products) {
    return <></>;
  }
  return (
    <div className="home_page">
      <h1 id="welcome">Welcome To Our LSU Merch!</h1>

      <div id="cards-container">
        {products.map((product) => {
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
        })}
      </div>
    </div>
  );
}
