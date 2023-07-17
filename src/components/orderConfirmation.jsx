import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { placeOrder, createNewCart } from "../api";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user, cart, token } = useOutletContext();
  const navigate = useNavigate();
  const [securityCheck, setSecurityCheck] = useState(true);

  useEffect(() => {
    (async () => {
      const userCart = { ...cart };
      if (userCart.id && securityCheck) {
        if (userCart.id !== Number(orderId)) {
          navigate("/account");
        }
        setSecurityCheck(false);
        await placeOrder(token);
        await createNewCart(token);
      }
    })();
  }, [cart]);

  return cart?.id == orderId ? (
    <div>
      <h1>Your order has been placed, {user.firstName}!</h1>
      <h3>Order Details:</h3>
      <div className="grid confirmation-grid">
        <div>Item Name</div>
        <div>Item Quantity</div>
        <div>Item Price</div>
        <div>Item Total</div>
      </div>
      {cart.products.map((product, idx) => {
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
        <div>{cart.totalPrice}</div>
      </div>
    </div>
  ) : (
    <div>Error</div>
  );
};

export default OrderConfirmation;
