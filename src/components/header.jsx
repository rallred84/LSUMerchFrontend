import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import tigersden from "../assets/tigersden.svg";

const Header = () => {
  return (
    <div id="header-container">
      <img id="logo-graphic" src={tigersden} />
      <div id="header-logo">TIGER'S DEN</div>
      <div id="header-menu">
        <div id="header-cart">
          <ShoppingCartIcon />
        </div>
        <div id="profile-header">
          <AccountCircleIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
