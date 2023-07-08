import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";

const Account = () => {

  const { user, setToken, setUser } = useOutletContext();

  function admin() {
    window.location.href = "/admin";
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }

  return (
    <div>
      <h1>Account Details</h1>
      <div>
        <p>
          Email:
          {user.email}
        </p>
        <p>
          Name:
          {user.firstName}
        </p>
      </div>
      <div>
        <h1>Order History</h1>
      </div>
      {user.isAdmin && (
        <>
          <div id="profile-header">
            <Button onClick={admin}>
              Admin Dashboard
            </Button>
          </div>
        </>
        )}
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
