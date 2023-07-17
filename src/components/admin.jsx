import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  // function newProduct() {
  //   window.location.href = "/new-product";
  // }

  // function manageProducts() {
  //   window.location.href = "/manage-products";
  // }

  // function manageOrders() {
  //   window.location.href = "/manage-orders";
  // }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-section">
        <h1 className="admin-section-title">Product Management</h1>
        <button
          className="admin-button"
          onClick={() => navigate("/new-product")}
        >
          Create Product
        </button>
        <button
          className="admin-button"
          onClick={() => navigate("/manage-products")}
        >
          Edit/Delete Products
        </button>
        <h1 className="admin-section-title">Order Management</h1>
        <button
          className="admin-button"
          onClick={() => navigate("/manage-orders")}
        >
          Update Orders
        </button>
        <h1 className="admin-section-title">User Management</h1>
        <button
          className="admin-button"
          onClick={() => navigate("/manage-users")}
        >
          Update Users
        </button>
      </div>
    </div>
  );
};

export default Admin;
