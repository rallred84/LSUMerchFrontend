import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { placeOrder, createNewCart, getProfile } from "../api";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user, setUser, cart, token } = useOutletContext();
  const navigate = useNavigate();
  const [securityCheck, setSecurityCheck] = useState(true);
  const [userCart, setUserCart] = useState({});

  useEffect(() => {
    if (orderId == cart.id) {
      setUserCart(cart);
    }
  }, [cart]);

  useEffect(() => {
    (async () => {
      if (userCart.id && securityCheck) {
        if (userCart.id !== Number(orderId)) {
          navigate("/account");
        }
        setSecurityCheck(false);
        await placeOrder(token);
        await createNewCart(token);
        const fetchMe = await getProfile(token);
        setUser(fetchMe);
      }
    })();
  }, [userCart]);

  return userCart?.id == orderId ? (
    <div>
      <h1>Your order has been placed, {user.firstName}!</h1>
      <h3>Order Details:</h3>
      <div className="grid confirmation-grid">
        <div>Item Name</div>
        <div>Item Quantity</div>
        <div>Item Price</div>
        <div>Item Total</div>
      </div>
      {userCart.products.map((product, idx) => {
        return (
          <div key={product.id} className="grid confirmation-grid">
            <div>{product.name}</div>
            <div>{product.quantity}</div>
            <div>{product.price}</div>
            <div>
              ${Number(product.quantity) * Number(product.price.slice(1))}.00
            </div>
          </div>
        );
      })}
      <div className="grid confirmation-grid">
        <div></div>
        <div></div>
        <div>Total Price</div>
        <div>{userCart.totalPrice}</div>
      </div>
    </div>
  ) : (
    <div>Error</div>
  );
};

export default OrderConfirmation;
