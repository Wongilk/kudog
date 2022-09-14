import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const onLogoutClick = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log(response);
      if (response.data.success) {
        navigate("/login");
      } else alert("로그아웃 실패");
    });
  };
  const onLoginClick = () => {
    axios.get("/api/users/auth").then((response) => {
      console.log(response);
      if (!response.data.isAuth) navigate("/login");
      else alert("로그인 실패");
    });
  };
  useEffect(() => {
    axios.get("/api/users/auth").then((response) => {
      if (response.data.isAuth) setIsLogin(true);
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      LandingPage
      {isLogin ? "" : <button onClick={onLoginClick}>Log in</button>}
      <button onClick={onLogoutClick}>Log out</button>
    </div>
  );
};

export default LandingPage;
