import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import tigersden from "../assets/tigersden.svg";

const Header = () => {
  return (
    <div id="header-container">
      <div id="header-logo">LSU Logo</div>
      <div id="header-cart">
        <ShoppingCartIcon />
      </div>
    </div>
  );
};

export default Header;
