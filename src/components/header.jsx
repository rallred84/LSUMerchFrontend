import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import tigersden from "../assets/tigersden.svg";
import { Button } from "@mui/material";

const Header = ({user}) => {
  function checkout() {
    window.location.href = "/checkout";
  }
  function account() {
    window.location.href = "/account";
  }
  return (
    <div id="header-container">
      <img id="logo-graphic" src={tigersden} />
      <div id="header-logo">TIGER'S DEN</div>
      <div id="header-menu">
        <div id="header-cart">
          <Button onClick={checkout}>
            {" "}
            <ShoppingCartIcon />
          </Button>
        </div>
        {user.id && (
        <>
          <div id="profile-header">
            <Button onClick={account}>
              <AccountCircleIcon />
            </Button>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Header;
