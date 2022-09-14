import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import Regsiter from "./views/Register/Regsiter";
import Auth from "../hoc/auth";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Auth(LandingPage, null)}></Route>
        <Route path="/login" element={Auth(LoginPage, false)}></Route>
        <Route path="/register" element={Auth(Regsiter, false)}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
