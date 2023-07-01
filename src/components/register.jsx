import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, password, confirm);
      }

    return(
        <div>
         <h1 id="headline">Register</h1>
         <form onSubmit={handleLogin} id="registering">
            <input placeholder="first name" onChange={(event) => setFirstName(event.target.value)} value={firstName}
               />
            <input placeholder="last name" onChange={(event) => setLastName(event.target.value)} value={lastName}
               />
            <input placeholder="email" onChange={(event) => setEmail(event.target.value)} value={email}
               />
            <input placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} value={password}
               />
            <input placeholder="confirm" type="password" onChange={(event) => setConfirm(event.target.value)} value={confirm}
               />
            <div id="reg-err">{error}</div>
            <button id="register">Register</button>
         </form>
         <div>Already Registered?<Link to={`/login`}>Log-In Here</Link></div>
       </div>
       )  
}