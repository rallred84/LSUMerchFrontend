import React from "react";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { createUser, loginUser } from "../api";
import { FormGroup, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginConfirm, setLoginConfirm] = useState("");

  const [registerVisible, setRegisterVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [error, setError] = useState("");

  const { setToken, theme } = useOutletContext();

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    console.log(loginEmail, loginPassword, loginConfirm);

    if (loginPassword !== loginConfirm) {
      setError("Passwords don't match!");
      return;
    }

    const login = await loginUser(loginEmail, loginPassword);
    console.log(login);

    if (!login.success) {
      setError(login.error.message);
      return;
    }

    setToken(login.data.token);
    localStorage.setItem("token", login.data.token);
    navigate("/account");
  }

  async function handleRegister(event) {
    event.preventDefault();
    //   console.log(firstName, lastName, registerEmail, registerPassword, registerConfirm);

    if (registerPassword !== registerConfirm) {
      setError("Passwords don't match!");
      return;
    }

    const result = await createUser(
      registerEmail,
      registerPassword,
      firstName,
      lastName
    );
    //   console.log(result)

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setToken(result.data.token);
    localStorage.setItem("token", result.data.token);
    navigate("/account");
  }

  return (
    <div id="login-page">
      <h1 id="headline">Log-in</h1>

      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
        component="form"
        noValidate
        autoComplete="off"
        color="secondary"
        size="medium"
        variant="outlined"
        className="login-form"
      >
        <TextField
          label="Email"
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          className="email-input"
          required
          color="secondary"
          size="small"
        />

        <TextField
          label="Password"
          type="password"
          onChange={(event) => setLoginPassword(event.target.value)}
          value={loginPassword}
          className="email-input"
          required
          color="secondary"
          size="small"
        />

        <TextField
          label="Confirm Password"
          type="password"
          onChange={(event) => setLoginConfirm(event.target.value)}
          value={loginConfirm}
          className="email-input"
          required
          color="secondary"
          size="small"
        />
        {/* {!loginConfirm && loginPassword ? (
              <Stack sx={{ width: "80%" }} spacing={2}>
                <Alert severity="error" variant="filled" onClick={setError}>
                  {error}
                </Alert>
              </Stack>
            ) : null} */}
        <ThemeProvider theme={theme}>
          <Button
            className="log-in"
            type="submit"
            onClick={handleLogin}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
          {error}
        </ThemeProvider>
      </FormGroup>
      <div className="new-register">
        No Account?
        <div onClick={() => setRegisterVisible(true)}>Register Here</div>
        <div>Forgot Password?</div>
      </div>
      {registerVisible && (
        <div>
          <h1 id="headline">Register</h1>
          <>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
              component="form"
              onSubmit={handleRegister}
              noValidate
              autoComplete="off"
              color="secondary"
              size="medium"
              variant="outlined"
              className="login-form"
            >
              <TextField
                label="First Name"
                type="name"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                className="email-input"
                required
                color="secondary"
                size="small"
              />
              <TextField
                label="Last Name"
                type="name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                className="email-input"
                required
                color="secondary"
                size="small"
              />

              <TextField
                label="Email"
                type="email"
                onChange={(event) => setRegisterEmail(event.target.value)}
                value={registerEmail}
                className="email-input"
                required
                color="secondary"
                size="small"
              />

              <TextField
                label="Password"
                type="password"
                onChange={(event) => setRegisterPassword(event.target.value)}
                value={registerPassword}
                className="email-input"
                required
                color="secondary"
                size="small"
              />
              <TextField
                label="Confirm Password"
                type="password"
                onChange={(event) => setRegisterConfirm(event.target.value)}
                value={registerConfirm}
                className="email-input"
                required
                color="secondary"
                size="small"
                style={theme}
              />

              <ThemeProvider theme={theme}>
                <Button
                  className="log-in"
                  type="submit"
                  onClick={handleRegister}
                  color="secondary"
                  size="large"
                  variant="contained"
                >
                  Register
                </Button>
              </ThemeProvider>

              {/* {registerPassword !== registerConfirm && (
              <Stack sx={{ width: "80%" }} spacing={2}>
                <Alert
                  severity="error"
                  variant="filled"
                  onClick={handleRegister}
                >
                  {error}
                </Alert>
              </Stack>
            )} */}
            </FormGroup>
          </>
        </div>
      )}
    </div>
  );
}

{
  /* <input
    placeholder="email"
    onChange={(event) => setLoginEmail(event.target.value)}
    value={loginEmail}
  /> */
}
{
  /* <input
    placeholder="password"
    type="password"
    onChange={(event) => setLoginPassword(event.target.value)}
    value={loginPassword}
  /> */
}
{
  /* <input
        placeholder="confirm"
        type="password"
        onChange={(event) => setLoginConfirm(event.target.value)}
        value={loginConfirm} />
      <div id="login-err">{error}</div>
      <button id="log-in">Login</button>
    </form><div>
        No Account?<Link to={`/register`}>Register Here</Link>
      </div><h1 id="headline">Register</h1><form onSubmit={handleRegister} id="registering">
        <input
          placeholder="first name"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName} />
        <input
          placeholder="last name"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName} />
        <input
          placeholder="email"
          onChange={(event) => setRegisterEmail(event.target.value)}
          value={registerEmail} />
        <input
          placeholder="password"
          type="password"
          onChange={(event) => setRegisterPassword(event.target.value)}
          value={registerPassword} />
        <input
          placeholder="confirm"
          type="password"
          onChange={(event) => setRegisterConfirm(event.target.value)}
          value={registerConfirm} />
        <div id="reg-err">{error}</div>
        <button id="register">Register</button>
      </form></></>
    </div>
  ); */
}

//   );

// }
