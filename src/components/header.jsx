import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import tigersden from "../assets/tigersden.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ user, cart }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  function checkout() {
    navigate("/checkout");
  }
  function account() {
    navigate("/account");
  }
  useEffect(() => {
    setCartCount(cart.products?.length);
  }, [cart]);

  return (
    <div id="header-container">
      <img id="logo-graphic" src={tigersden} />
      <div id="header-logo">TIGER'S DEN</div>
      <div id="header-menu">
        <div id="header-cart">
          <Button onClick={checkout}>
            <ShoppingCartIcon id="cart-icon" />
            {cartCount === 0 ? "" : <div id="cart-count">{cartCount}</div>}
          </Button>
        </div>
        {user?.id && (
          <>
            <div id="profile-header">
              <Button onClick={account}>
                <AccountCircleIcon id="account-icon" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
