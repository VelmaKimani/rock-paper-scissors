import React, { useState } from "react";

import httpClient from "../httpClient";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/register", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className="intro">
      <p>Create an account</p>
      <br></br>
      <form>
        <div>
          <p>Email </p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
          />
        </div>
        <br></br>
        <div>
          <p>Password </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
          />
        </div>
        <button className="login-button" type="button" onClick={() => registerUser()}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
