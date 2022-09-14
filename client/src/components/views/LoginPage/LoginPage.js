import { useDispatch } from "react-redux";
import { React, useState } from "react";
import { LoginUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onClick = () => {
    navigate("/register");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    dispatch(LoginUser(data)).then((res) => {
      console.log(res);
      if (res.payload.loginSuccess) navigate("/");
      else alert(res.payload.message);
    });
  };
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailChange} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordChange} />

        <button>Log in</button>
        <button onClick={onClick}>Register</button>
      </form>
    </div>
  );
};

export default LoginPage;
