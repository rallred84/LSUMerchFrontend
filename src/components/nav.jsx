import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
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
          </div>
        </div>
      </div>
      <div id="nav-menu"></div>
    </>
  );
};

export default Nav;
