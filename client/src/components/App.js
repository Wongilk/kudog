import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import Regsiter from "./views/Register/Regsiter";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Regsiter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
