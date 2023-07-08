import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import { createTheme } from "@mui/material/styles";
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: " #6a1b9a",
//     },
//   },
// });
const Nav = () => {
  return (
    <div id="nav-container">
      <div id="nav-link">
        <div id="nav-link1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <div id="nav-link2">
            <li>
              <Link to="/products">Shop All Products</Link>
            </li>
          </div>
          <div id="nav-link3">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
          <div id="nav-link4">
            {/* <li>
              <Link to="/register">Register</Link>
            </li> */}
          </div>
        </div>
      </div>
      <div id="nav-menu">
        {/* <Button variant="text" id="menu-button">
          Menu
        </Button> */}
      </div>
    </div>
  );
};

export default Nav;
