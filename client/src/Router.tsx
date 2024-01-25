import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  Component={LandingPage} />
        <Route path="/login"  Component={LoginPage} />
        <Route path="/register"  Component={RegisterPage} />
        <Route Component={ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
}; 

export default Router;
