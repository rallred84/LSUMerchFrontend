import { useOutletContext } from "react-router-dom";
import "../css/checkout.css";
import { useEffect, useState } from "react";
import { removeFromCart, getProfile, updateCartItemQuantity } from "../api";

const Checkout = () => {
  const { user, setUser, cart, setCart, token } = useOutletContext();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (user.id) {
      setCart(user.cart);
    } else {
      const cartString = window.localStorage.getItem("cart");
      console.log(cartString);
      if (cartString) {
        setCart(JSON.parse(cartString));
      }
    }
  }, [user]);

  useEffect(() => {
    if (cart?.products) {
      setProductList(
        cart.products.sort(function (a, b) {
          if (a.id < b.id) return -1;
        })
      );
    }
  }, [cart]);

  const handleRemoveFromCart = async (productId) => {
    if (user.id) {
      await removeFromCart(productId, token);
      const fetchMe = await getProfile(token);
      setUser(fetchMe);
    } else {
      const newProducts = cart.products.filter(
        (product) => product.id !== productId
      );
      setCart({ products: newProducts });
    }
  };

  const handleEditItemQuantity = async (quantity, productId) => {
    if (user.id) {
      await updateCartItemQuantity(token, productId, quantity);
      const fetchMe = await getProfile(token);
      setUser(fetchMe);
    }
    const newProducts = cart.products.map((product) => {
      if (product.id === productId) {
        product.quantity = quantity;
        return product;
      } else {
        return product;
      }
    });
    setCart({ products: newProducts });
  };

  return (
    <>
      <div>
        <h1>Welcome to Checkout, {user.firstName}</h1>
      </div>
      <div id="checkout-table">
        <div className="grid checkout-head">
          <div>Item Id</div>
          <div>Item Name</div>
          <div>Item Quanity</div>
          <div>Item Price</div>
          <div>Item Total</div>
        </div>
        {productList[0] &&
          productList.map((product) => {
            return (
              <div key={product.id} className="grid checkout-body">
                <div>{product.id}</div>
                <div>{product.name}</div>
                <div>
                  <select
                    name="quantity-select"
                    defaultValue={product.quantity}
                    onChange={(e) =>
                      handleEditItemQuantity(e.target.value, product.id)
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>{product.price}</div>
                <div>
                  ${Number(product.price.slice(1)) * Number(product.quantity)}
                  .00
                </div>
                <span
                  className="delete-cart-button"
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  X
                </span>
              </div>
            );
          })}

        <div className="grid checkout-total">
          <div></div>
          <div></div>
          <div></div>
          <div>Total</div>
          <div>{user.cart && user.cart.totalPrice}</div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
