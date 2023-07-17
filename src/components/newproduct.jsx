import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createProduct, getAllProducts } from "../api";
import ImageUpload from "./imageUpload";

import "../css/productForm.css";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [size, setSize] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const { user, token, products, setProducts } = useOutletContext();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.isAdmin) {
        (async () => {
          const result = await createProduct(
            token,
            name,
            description,
            price,
            stockQuantity,
            imageURL,
            size,
            category,
            isFeatured
          );
          console.log(result);
          const fetchProducts = await getAllProducts();
          setProducts(fetchProducts);
          navigate(`/products/${result.data.product.id}`);
        })();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="new-product-container">
      <h1 className="new-product-title">Add Product to Inventory</h1>
      <form onSubmit={handleSubmit} className="new-product-form">
        <input
          className="new-product-input"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <textarea
          className="new-product-input"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <input
          className="new-product-input"
          placeholder="Price"
          type="number"
          step="0.01"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <input
          className="new-product-input"
          placeholder="Stock Quantity"
          type="number"
          onChange={(event) => setStockQuantity(event.target.value)}
          value={stockQuantity}
        />
        <input
          className="new-product-input"
          placeholder="Size"
          onChange={(event) => setSize(event.target.value)}
          value={size}
        />
        <select
          className="new-product-input"
          placeholder="Category"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          <option value="">Choose a Product Category:</option>
          <option value="Accessories">Accessories</option>
          <option value="Baby">Baby</option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
          <option value="Memorabilia">Memorabilia</option>
        </select>
        <label className="new-product-input">
          <div className="featured-select">
            <span>Featured Product?</span>
            <input
              className="new-product-input"
              type="checkbox"
              onChange={() => setIsFeatured(!isFeatured)}
              value={isFeatured}
            />
          </div>
        </label>
        <ImageUpload imageURL={imageURL} setImageURL={setImageURL} />
        <button className="new-product-button" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
