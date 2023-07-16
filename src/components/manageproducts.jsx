import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { deleteProduct } from "../api";

import "../css/manageProducts.css";

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
    <div className="manage-products-container">
      <h1 className="manage-products-title">Manage Products</h1>
      <div className="cards-container">
        {products && products.length ? (
          products.map((product) => {
            return (
              <div className="card" key={product.id}>
                <div className="product-info">
                  <h1 className="product-name">{product.name}</h1>
                  <div className="product-image">
                    <img src={product.imageURL} alt={product.name} />
                  </div>
                  <div className="product-description">
                    {product.description}
                  </div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-stock">
                    In-Stock: {product.stockQuantity}
                  </div>
                </div>
                <div className="product-actions">
                  <Link
                    to={`/manage-products/${product.id}`}
                    className="product-action"
                  >
                    Edit
                  </Link>
                  <button
                    className="product-action"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-products-message">No products available</p>
        )}
      </div>
    </div>
  );
}
