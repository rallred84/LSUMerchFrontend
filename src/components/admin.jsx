import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createProduct } from "../api";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [size, setSize] = useState("");

  const { user, token, products, setProducts } = useOutletContext();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.isAdmin) {
        const result = await createProduct(token, name, description, price, stockQuantity, size);
        console.log(result);
        setProducts([result, ...products]);
        setName("");
        setDescription("");
        setPrice(0);
        setStockQuantity(0);
        setSize("");
        navigate("/")
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <h1>Admin</h1>
      <h2>Create Products</h2>
      <form onSubmit={handleSubmit} id="new-product">
         <input placeholder="Name" onChange={(event) => setName(event.target.value)} value={name} />
         <input placeholder="Description" onChange={(event) => setDescription(event.target.value)} value={description} />
         <input placeholder="Price" onChange={(event) => setPrice(event.target.value)} value={price} />
         <input placeholder="Stock Quantity" onChange={(event) => setStockQuantity(event.target.value)} value={stockQuantity} />
         <input placeholder="Size" onChange={(event) => setSize(event.target.value)} value={size} />
         <button id="create-product">Create Product</button>
      </form>
    </div>
  );
};

export default Admin;
