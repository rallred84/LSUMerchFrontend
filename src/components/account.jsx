import { Link, useOutletContext, useParams } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import { deleteReview } from "../api";
import "../css/account.css";
import { WidthFull } from "@mui/icons-material";

const Account = () => {
  const { user, setToken, setUser, token, theme } = useOutletContext();

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
    <div className="account-page">
      {user.isAdmin && (
        <div className="admin-dashboard">
          <Button onClick={admin} variant="contained" theme={theme}>
            Admin Dashboard
          </Button>
        </div>
      )}
      <h1 className="account-heading">Account Details</h1>
      <div className="account-details">
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Name:</span> {user.firstName}
        </p>
      </div>
      <div className="order-history">
        <h1>Order History</h1>
        {user.orders && user.orders.length ? (
          user.orders.map((order) => (
            <div className="order" key={order.id}>
              <div className="order-id">
                <span>Id:</span> {order.id}
              </div>
              <div className="order-status">
                <span>Status:</span> {order.orderStatus}
              </div>
              {order.products && order.products.length
                ? order.products.map((product) => (
                    <div className="product" key={product.id}>
                      <div>{product.name}</div>
                      <div className="product-quantity">
                        <span>Quantity:</span> {product.quantity}
                      </div>
                    </div>
                  ))
                : null}
              <div className="order-price">
                <span>Total:</span> {order.totalPrice}
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">No order history found.</div>
        )}
      </div>
      <div className="my-reviews">
        <h1>My Reviews</h1>
        {user.reviews && user.reviews.length ? (
          user.reviews.map((review) => (
            <div className="review" key={review.id}>
              <div className="review-product">{review.productName}</div>
              <div className="review-message">{review.message}</div>
              <div className="review-rating">
                <span>Rating:</span> {review.rating}
              </div>
              <div className="review-date">
                <span>Date:</span> {review.date}
              </div>
              <ButtonGroup className="review-buttons" orientation="vertical">
                <Link to={`/${review.productId}/editreview`}>
                  <Button
                    variant="outlined"
                    theme={theme}
                    sx={{ width: "100%" }}
                  >
                    Edit Review
                  </Button>
                </Link>
                <br />
                <Button
                  onClick={() => handleDelete(review.productId)}
                  variant="outlined"
                  theme={theme}
                  sx={{ width: "100%" }}
                >
                  Delete Review
                </Button>
              </ButtonGroup>
            </div>
          ))
        ) : (
          <div className="no-reviews">No reviews found.</div>
        )}
      </div>
      <div className="logout-button">
        <Button onClick={handleLogout} variant="outlined" theme={theme}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
