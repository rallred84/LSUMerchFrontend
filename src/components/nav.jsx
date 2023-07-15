import { Link, Navigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// import { useState } from "react";

const Nav = () => {
  function loggedUser() {
    const user = localStorage.getItem("token");
    if (user) {
      return (
        <div id="nav-link1">
          <div className="user-nav">
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <Link to="/all-products" style={{ textDecoration: "none" }}>
              Shop All Products
            </Link>
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
                setUser({});
                window.location.reload();
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div id="nav-link2">
          <div className="non-user-nav">
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>

            <Link to="/all-products" style={{ textDecoration: "none" }}>
              Shop All Products
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login/Register
            </Link>
          </div>
        </div>
      );
    }
  }

  return <div id="nav-container">{loggedUser()}</div>;
};

export default Nav;
