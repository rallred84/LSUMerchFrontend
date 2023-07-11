

const Admin = () => {

  function newProduct() {
    window.location.href = "/new-product";
  }

  function manageProducts() {
    window.location.href = "/manage-products";
  }

  function manageOrders() {
    window.location.href = "/manage-Orders";
  }

  return (
    <div>
      <h1>Admin</h1>
      <h2>Duties</h2>
         <button onClick={newProduct}>Create Products</button>
         <button onClick={manageProducts}>Edit/Delete Products</button>
         <button onClick={manageOrders}>Update Orders</button>
    </div>
  );
}

export default Admin;
