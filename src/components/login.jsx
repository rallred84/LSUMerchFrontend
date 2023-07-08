import React from "react";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { createUser, loginUser } from "../api";

export default function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginConfirm, setLoginConfirm] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirm, setRegisterConfirm] = useState("");
    const [error, setError] = useState("");

    const { setToken } = useOutletContext();

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        console.log(loginEmail, loginPassword, loginConfirm);

        if (registerPassword !== registerConfirm) {
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

        const result = await createUser(registerEmail, registerPassword, firstName, lastName)
      //   console.log(result)

        if (!result.success) {
         setError(result.error.message);
         return;
        }

        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        navigate("/account");
      }

    return(
        <div>
         <h1 id="headline">Log-in</h1>
         <form onSubmit={handleLogin} id="logging-in">
            <input placeholder="email" onChange={(event) => setLoginEmail(event.target.value)} value={loginEmail}
               />
            <input placeholder="password" type="password" onChange={(event) => setLoginPassword(event.target.value)} value={loginPassword}
               />
            <input placeholder="confirm" type="password" onChange={(event) => setLoginConfirm(event.target.value)} value={loginConfirm}
               />
            <div id="login-err">{error}</div>
            <button id="log-in">Login</button>
         </form>
         <div>No Account?<Link to={`/register`}>Register Here</Link></div>
         <h1 id="headline">Register</h1>
         <form onSubmit={handleRegister} id="registering">
            <input placeholder="first name" onChange={(event) => setFirstName(event.target.value)} value={firstName}
               />
            <input placeholder="last name" onChange={(event) => setLastName(event.target.value)} value={lastName}
               />
            <input placeholder="email" onChange={(event) => setRegisterEmail(event.target.value)} value={registerEmail}
               />
            <input placeholder="password" type="password" onChange={(event) => setRegisterPassword(event.target.value)} value={registerPassword}
               />
            <input placeholder="confirm" type="password" onChange={(event) => setRegisterConfirm(event.target.value)} value={registerConfirm}
               />
            <div id="reg-err">{error}</div>
            <button id="register">Register</button>
         </form>
       </div>
       )  
}