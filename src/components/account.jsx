const Account = () => {
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
        <button
        // onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
