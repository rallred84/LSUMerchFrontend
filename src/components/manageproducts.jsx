import { Link, useNavigate, useOutletContext } from "react-router-dom";
const cardsContainer = document.querySelector("#cards-container");
import { deleteProduct } from "../api";

export default function ManageProducts() {
  const { products, setProducts, token } = useOutletContext();

  const navigate = useNavigate();

  async function handleDelete(productId) {
    const result = await deleteProduct(token, productId);
    setProducts(result);
  }

  if (!products) {
    return <></>;
  }

  return (
    <div>
      <h1>Manage Products</h1>
      <div id="cards-container">
        {products && products.length
          ? products.map((product) => {
              return (
                <div id="card" key={product.id}>
                  <div id="products-pg">
                    <h1 id="product-name">{product.name}</h1>
                    <div id="product-image">
                      <img src={product.imageURL} alt={product.name} />
                    </div>
                    <div id="product-des">{product.description}</div>
                    <div id="product-price">{product.price}</div>
                    <div id="product-stock">
                      In-Stock: {product.stockQuantity}
                    </div>
                    <Link to={`/manage-products/${product.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(product.id)}>
                      Delete
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
