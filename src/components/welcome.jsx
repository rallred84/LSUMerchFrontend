import { Link } from "react-router-dom";

export default function Welcome() {
  const token = localStorage.getItem("token");

  return (
    <div className="home_page">
      <h1 id="welcome">Welcome To Our LSU Merch!</h1>
    </div>
  );
}