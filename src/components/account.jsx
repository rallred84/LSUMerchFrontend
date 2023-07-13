import { Link, useOutletContext, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { deleteReview } from "../api";

const Account = () => {
  const { user, setToken, setUser, token } = useOutletContext();

  function admin() {
    window.location.href = "/admin";
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }

  async function handleDelete(productId) {
    const result = await deleteReview(token, productId);
    console.log(result);
  }

  return (
    <div>
      {user.isAdmin && (
        <>
          <div id="profile-header">
            <Button onClick={admin}>Admin Dashboard</Button>
          </div>
        </>
      )}
      <h1>Account Details</h1>
      <div>
        <p>
          Email:
          {user.email}
        </p>
        <p>
          Name:
          {user.firstName}
        </p>
      </div>
      <div>
        <h1>Order History</h1>
        {user.orders && user.orders.length
         ? user.orders.map((order) => {
          // console.log(order);
          return (
            <div id="order-id" key={order.id}>
              <div className="order-id">Id: {order.id}</div>
              <div className="order-status">Status: {order.orderStatus}</div>
              {order.products && order.products.length
              ? order.products.map((product) => {
                return (
                  <div key={product.id}>
                    <div className="product">{product.name}</div>
                    <div className="product-quantity">Quantity: {product.quantity}</div>
                  </div>
                )
              })
            : null }
              <div className="order-price">Total: {order.totalPrice}</div>
            </div>
          );
         })
        : null}
      </div>
      <div>
        <h1>My Reviews</h1>
        {user.reviews && user.reviews.length
         ? user.reviews.map((review) => {
          // console.log(review);
          return (
            <div id="review-id" key={review.id}>
              <div className="review-product">{review.productName}</div>
              <div className="review-message">{review.message}</div>
              <div className="review-rating">Rating: {review.rating}</div>
              <div className="review-date">Date: {review.date}</div>
              <Link to={`/${review.productId}/editreview`}>
              <button>Edit Review</button>
              </Link>
              <button onClick={() => handleDelete(review.productId)}>Delete Review</button>
            </div>
          );
         })
        : null}
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
