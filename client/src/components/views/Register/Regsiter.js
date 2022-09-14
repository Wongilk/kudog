import { useDispatch } from "react-redux";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../_actions/user_actions";
import Auth from "../../../hoc/auth";

const Regsiter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsMatch, setPasswordIsMatch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setConfirmPassword("");
    } else {
      setPasswordIsMatch(true);
    }
    if (passwordIsMatch) {
      let data = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      dispatch(RegisterUser(data)).then((res) => {
        if (res.payload.success) {
          alert("가입되었습니다.");
          console.log("가입완료");
          navigate("/login");
        } else alert("fail to sign up");
      });
    } else return;
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
        <label>Name</label>
        <input type="name" value={name} onChange={onNameChange} />
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailChange} />
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordChange} />
        <label>confirmPassword</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />

        <button>Register</button>
      </form>
    </div>
  );
};

export default Regsiter;
