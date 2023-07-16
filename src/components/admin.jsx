import React from "react";

const Admin = () => {
  function newProduct() {
    window.location.href = "/new-product";
  }

  function manageProducts() {
    window.location.href = "/manage-products";
  }

  function manageOrders() {
    window.location.href = "/manage-orders";
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-section">
        <h1 className="admin-section-title">Product Management</h1>
        <button className="admin-button" onClick={newProduct}>
          Create Product
        </button>
        <button className="admin-button" onClick={manageProducts}>
          Edit/Delete Products
        </button>
      </div>
      <div className="admin-section">
        <h1 className="admin-section-title">Order Management</h1>
        <button className="admin-button" onClick={manageOrders}>
          Update Orders
        </button>
      </div>
    </div>
  );
};

export default Admin;
