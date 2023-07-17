import { Link, useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";
// import { useState } from "react";

const Nav = ({ setToken, setUser, topOfHome }) => {
  function loggedUser() {
    const user = localStorage.getItem("token");

    const navigate = useNavigate();

    const handleNavigateHome = () => {
      navigate("/");
      if (topOfHome.current) {
        topOfHome.current.scrollIntoView({ top: 0, behavior: "smooth" });
      }
    };

    if (user) {
      return (
        <div id="nav-link1">
          <div className="user-nav">
            <div onClick={() => handleNavigateHome()}>Home</div>
            <div onClick={() => navigate("/all-products")}>
              Shop All Products
            </div>
            <div
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
                setUser({});
                navigate("/");
                if (topOfHome.current) {
                  topOfHome.current.scrollIntoView({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Logout
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="nav-link2">
          <div className="non-user-nav">
            <div onClick={() => handleNavigateHome()}>Home</div>
            <div onClick={() => navigate("/all-products")}>
              Shop All Products
            </div>
            <div onClick={() => navigate("/login")}>Login/Register</div>
          </div>
        </div>
      );
    }
  }

  return <div id="nav-container">{loggedUser()}</div>;
};

export default Nav;
