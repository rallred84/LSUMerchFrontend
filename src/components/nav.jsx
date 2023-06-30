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
      <div id="nav-links">
        <li>
          <Link to="/">Category</Link>
        </li>
        <li>
          <Link to="/">Category</Link>
        </li>
        <li>
          <Link to="/">Category</Link>
        </li>
        <li>
          <Link to="/">Category</Link>
        </li>
      </div>
      <div id="nav-menu">
        <Button variant="text" id="menu-button">
          Menu
        </Button>
      </div>
    </div>
  );
};

export default Nav;
