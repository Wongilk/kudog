import { useDispatch } from "react-redux";
import { React, useState } from "react";
import { LoginUser } from "../../../_actions/user_actions";
const LoginPage = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();
  const onEmailChange = (e) => {
    SetEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    SetPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    dispatch(LoginUser(data));
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
      </form>
    </div>
  );
};

export default LoginPage;
