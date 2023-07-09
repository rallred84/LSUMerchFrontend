import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { editProduct } from "../api";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [size, setSize] = useState("");

  const { user, token } = useOutletContext();

  const { productId } = useParams();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.isAdmin) {
        const result = await editProduct(token, productId, name, description, price, stockQuantity, size);
        console.log(result);
        navigate("/manage-products");
      }
    } catch (err) {
      console.error(err);
    }
    
  }


  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit} id="edit-product">
         <input placeholder="Name" onChange={(event) => setName(event.target.value)} value={name} />
         <input placeholder="Description" onChange={(event) => setDescription(event.target.value)} value={description} />
         <input placeholder="Price" onChange={(event) => setPrice(event.target.value)} value={price} />
         <input placeholder="Stock Quantity" onChange={(event) => setStockQuantity(event.target.value)} value={stockQuantity} />
         <input placeholder="Size" onChange={(event) => setSize(event.target.value)} value={size} />
         <button id="update-product">Edit Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
