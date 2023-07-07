import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirm, setRegisterConfirm] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(event) {
        event.preventDefault();
        console.log(firstName, lastName, registerEmail, registerPassword, registerConfirm);
      }

    return(
        <div>
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
         <div>Already Registered?<Link to={`/login`}>Log-In Here</Link></div>
       </div>
       )  
}