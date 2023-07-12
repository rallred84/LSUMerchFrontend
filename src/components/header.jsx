import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import tigersden from "../assets/tigersden.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  function checkout() {
    navigate("/checkout");
  }
  function account() {
    navigate("/account");
  }

  return (
    <div id="header-container">
      <img id="logo-graphic" src={tigersden} />
      <div id="header-logo">TIGER'S DEN</div>
      <div id="header-menu">
        <div id="header-cart">
          <Button onClick={checkout}>
            {" "}
            <ShoppingCartIcon id="cart-icon" />
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
