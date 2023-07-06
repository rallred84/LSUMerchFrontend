const Account = () => {
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
          {/* {user.email} */}
        </p>
        <p>
          Username:
          {/* {user.username} */}
        </p>
      </div>
      <div>
        <h1>Order History</h1>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
