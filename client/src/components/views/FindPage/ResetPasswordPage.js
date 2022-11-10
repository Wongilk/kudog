import React, { useState } from "react";
import Form from "antd/es/form/Form";
import Input from "antd/lib/input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ResetPasswordPage = ({ email }) => {
  const [newPwd, setNewPWd] = useState("");
  const [confirmPwd, setConfirmPWd] = useState("");
  const navigate = useNavigate();
  const onNewpwdChange = (e) => {
    setNewPWd(e.target.value);
  };
  const onConfirmPwdChange = (e) => {
    setConfirmPWd(e.target.value);
  };
  const onSubmit = () => {
    if (newPwd === confirmPwd) {
      let body = {
        email: email,
        password: newPwd,
      };
      axios.post("/api/users/reset_password", body).then((response) => {
        console.log(response.data);
        if (response.data.resetSuccess) {
          alert("Password is changed");
          navigate("/login");
        }
      });
    } else {
      alert("password is not same as confirm password");
    }
  };
  return (
    <div
      style={{
        textAlign: "center",
        width: "80%",
        margin: "3rem auto",
        marginTop: "15%",
      }}
    >
      <h1>Reset Password</h1>
      <Form>
        <Input
          type="password"
          placeholder="Enter new password"
          style={{ width: "30%" }}
          value={newPwd}
          onChange={onNewpwdChange}
        />
        <br />
        <Input
          type="password"
          placeholder="Enter confirm password"
          style={{ width: "30%", marginTop: "1rem" }}
          value={confirmPwd}
          onChange={onConfirmPwdChange}
        />
        <br />
        <Input
          type="button"
          style={{ width: "30%", marginTop: "1rem" }}
          value="confirm"
          onClick={onSubmit}
        />
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
