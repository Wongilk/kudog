import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const [writer, setWriter] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const onWriterChange = (e) => {
    setWriter(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!writer || !email || !phone || !content)
      alert("모든 항목을 기입해주세요");
    else {
      const body = {
        writer: writer,
        email: email,
        phone: phone,
        content: content,
        date: new Date().toLocaleString("ko-kr"),
      };
      console.log(body);

      axios.post("/api/contacts", body).then((response) => {
        if (response.data.success) {
          alert("입점 문의가 등록되었습니다.");
          navigate("/");
        } else {
          alert("입점 문의 등록에 실패하였습니다.");
        }
      });
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <form style={{ width: "400px" }}>
          <p>
            <h4 class="text-center m-5">브랜드 입점 문의</h4>
          </p>
          <p>
            <input
              className="border p-2 w-100"
              placeholder="Enter Your Name"
              onChange={onWriterChange}
            />
          </p>
          <p>
            <input
              className="border p-2 w-100"
              placeholder="Enter Your Email"
              onChange={onEmailChange}
            />
          </p>
          <p>
            <input
              className="border p-2 w-100"
              placeholder="Enter Your Phone Number"
              onChange={onPhoneChange}
            />
          </p>
          <p>
            <textarea
              className="border p-2 w-100"
              placeholder="Enter Your Message Here"
              onChange={onContentChange}
            />
          </p>
          <p>
            <input
              className="btn btn-secondary border w-100"
              type="button"
              value="Submit"
              onClick={onSubmit}
            />
          </p>
          <p className="text-center mb-5 text-muted">Thanks for submitting!</p>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
