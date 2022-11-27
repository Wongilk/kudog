import { React, useState } from "react";
import Input from "antd/lib/input/Input";
import { Form } from "antd";
import axios from "axios";
const FindIdPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [exist, setExist] = useState(false);
  const [foundEmail, setFoundEmail] = useState("");
  const onPhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const makeSecretEmail = (email) => {
    //wongil@naver.com temp = ["wongil","naver.com"]
    //temp2 = "won"
    let temp = email.split("@");
    let temp2 = temp[0].substr(0, temp[0].length / 2);
    let star = "*".repeat(temp[0].length - temp2.length);
    temp = temp2 + star + "@" + temp[1];
    setFoundEmail(temp);
  };
  const onSubmit = () => {
    let body = { phoneNumber: phoneNumber, name: name };
    axios.post("/api/users/find_id", body).then((response) => {
      if (response.data.findIdSuccess) {
        setExist(true);
        setFoundEmail(response.data.user.email);
        makeSecretEmail(response.data.user.email);
      } else {
        alert("해당 번호와 이름으로 가입된 이메일이 없습니다");
      }
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
          type="text"
          placeholder="write your phone number when you register"
          style={{ width: "30%" }}
          value={phoneNumber}
          onChange={onPhoneNumberChange}
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
      {exist ? "Your Email : " + foundEmail : ""}
      <br />
      <a href="/reset_user_password">Find Password</a>
    </div>
  );
};

export default FindIdPage;
