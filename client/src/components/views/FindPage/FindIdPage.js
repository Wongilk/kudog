import { React, useState } from "react";
import Input from "antd/lib/input/Input";
import { Form } from "antd";
import axios from "axios";
const FindIdPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [exist, setExist] = useState(false);
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    let body = { email: email, name: name };
    axios.post("/api/users/find_id", body).then((response) => {
      if (response.data.findIdSuccess) setExist(true);
      setEmail(response.data.user.email);
    });
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
      <h1>Find your ID</h1>
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
          value="Find"
          onClick={onSubmit}
        />
      </Form>
      {exist ? "Your Email : " + email : ""}
      <br />
      <a href="/reset_user_password">Find Password</a>
    </div>
  );
};

export default FindIdPage;
