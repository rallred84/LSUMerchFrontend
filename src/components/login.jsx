import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(event) {
        event.preventDefault();
        console.log(email, password, confirm);
      }

    return(
        <div>
         <h1 id="headline">Log-in</h1>
         <form onSubmit={handleLogin} id="logging-in">
            <input placeholder="email" onChange={(event) => setEmail(event.target.value)} value={email}
               />
            <input placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} value={password}
               />
            <input placeholder="confirm" type="password" onChange={(event) => setConfirm(event.target.value)} value={confirm}
               />
            <div id="login-err">{error}</div>
            <button id="log-in">Login</button>
         </form>
         <div>Not Registered?<Link to={`/register`}>Register Here</Link></div>
       </div>
       )  
}