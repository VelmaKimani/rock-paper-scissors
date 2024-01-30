import React, { useState } from "react";

import httpClient from "../httpClient";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("//localhost:5000/login", {
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
      <p>Log Into Your Account</p>
      <form>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email"
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password"
          />
        </div>
        <button className="login-button" type="button" onClick={() => logInUser()}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
