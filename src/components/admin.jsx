

const Admin = () => {

  function newProduct() {
    window.location.href = "/new-product";
  }

  function manageProducts() {
    window.location.href = "/manage-products";
  }

  return (
    <div>
      <h1>Admin</h1>
      <h2>Duties</h2>
         <button onClick={newProduct}>Create Products</button>
         <button onClick={manageProducts}>Edit/Delete Products</button>
    </div>
  );
}

export default Admin;
