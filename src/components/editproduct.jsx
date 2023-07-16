import { useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { editProduct } from "../api";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "../css/editProducts.css";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#3c1053",
          color: "white",
          textTransform: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          fontWeight: "bold",
          transition: "background-color 0.3s ease-in-out",
          fontSize: "16px",

          "&:hover": {
            backgroundColor: "#d29f13",
          },
        },
      },
    },
  },
});

const EditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const { user, token } = useOutletContext();

  const { productId } = useParams();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (user.isAdmin) {
        const result = await editProduct(
          token,
          productId,
          name,
          description,
          price,
          stockQuantity,
          size,
          category,
          isFeatured
        );
        console.log(result);
        navigate("/manage-products");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="edit-product-container">
      <h1 className="edit-product-heading">Edit Product</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <input
          placeholder="Name"
          className="edit-product-input"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <input
          placeholder="Description"
          className="edit-product-input"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <input
          placeholder="Price"
          className="edit-product-input"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <input
          placeholder="Stock Quantity"
          className="edit-product-input"
          onChange={(event) => setStockQuantity(event.target.value)}
          value={stockQuantity}
        />
        <input
          placeholder="Size"
          className="edit-product-input"
          onChange={(event) => setSize(event.target.value)}
          value={size}
        />
        <select
          className="new-product-input"
          placeholder="Category"
          onChange={(event) => setCategory(event.target.value)}
          value={category}>
          <option>Accessories</option>
          <option>Baby</option>
          <option>Clothing</option>
          <option>Household</option>
          <option>Memorabilia</option>
        </select>
        <label>Featured Product
          <input
            className="new-product-input"
            type="checkbox"
            onChange={() => setIsFeatured(!isFeatured)}
            value={isFeatured}
           />
        </label>
        <ThemeProvider theme={theme}>
          <Button type="submit" className="edit-product-button">
            Edit Product
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default EditProduct;
