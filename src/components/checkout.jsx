import { useOutletContext } from "react-router-dom";
import "../css/checkout.css";
import { useEffect, useState } from "react";
import { removeFromCart, getProfile } from "../api";

const Checkout = () => {
  const { user, setUser, token } = useOutletContext();
  const [cart, setCart] = useState({});

  useEffect(() => {
    setCart(user.cart);
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId, token);
    const fetchMe = await getProfile(token);
    setUser(fetchMe);
  };

  return (
    <>
      <div>
        <h1>Welcome to Checkout, {user.firstName}</h1>
      </div>
      <table id="checkout-table">
        <thead>
          <tr>
            <th>Item Id</th>
            <th>Item Name</th>
            <th>Item Quanity</th>
            <th>Item Price</th>
          </tr>
        </thead>
        <tbody>
          {cart?.products &&
            cart.products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td className="no-border">
                    <span
                      className="delete-cart-product"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      X
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>total</td>
            <td>{user.cart && user.cart.totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Checkout;
