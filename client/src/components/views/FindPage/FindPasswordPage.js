import { React, useState } from "react";
import Input from "antd/lib/input/Input";
import { Form } from "antd";
import axios from "axios";
import ResetPasswordPage from "./ResetPasswordPage";

const FindPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [authVisible, setAuthvisible] = useState(false);
  const [certificationNum, setCertificationNum] = useState("");
  const [authNum, setAuthNum] = useState(0);
  const [resetPassword, setResetPassword] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  //이메일로 온 인증 번호
  const onCertiChange = (e) => {
    setCertificationNum(e.target.value);
  };
  const onSubmit = () => {
    console.log(email, name);
    let body = { email: email, name: name };
    axios.post("/api/users/find_password", body).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setAuthNum(response.data.authNum);
        setAuthvisible(true);
      }
    });
  };
  const onAuthSubmit = () => {
    if (authNum === parseInt(certificationNum)) {
      setResetPassword(true);
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
      {authVisible ? (
        resetPassword ? (
          <ResetPasswordPage email={email} />
        ) : (
          <div>
            <Form>
              <Input
                type="text"
                placeholder="write Certification Number"
                style={{ width: "30%" }}
                value={certificationNum}
                onChange={onCertiChange}
              />
              <br />
              <Input
                type="button"
                style={{ width: "30%", marginTop: "1rem" }}
                value="certify"
                onClick={onAuthSubmit}
              />
            </Form>
          </div>
        )
      ) : (
        <div>
          <h1>Find your Password</h1>
          <Form>
            <Input
              type="email"
              placeholder="write your email when you register"
              style={{ width: "30%" }}
              value={email}
              onChange={onEmailChange}
              required
            />
            <br />
            <Input
              type="text"
              placeholder="write your name without lastname"
              style={{ width: "30%", marginTop: "1rem" }}
              value={name}
              onChange={onNameChange}
            />
            <br />
            <Input
              type="button"
              style={{ width: "30%", marginTop: "1rem" }}
              value="Send email"
              onClick={onSubmit}
            />
          </Form>
          <br />
          <a href="/reset_user_id">Find ID</a>
        </div>
      )}
    </div>
  );
};

export default FindPasswordPage;
