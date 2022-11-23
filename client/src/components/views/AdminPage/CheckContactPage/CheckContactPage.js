import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "antd";
const { Title } = Typography;

const CheckContactPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getcontacts();
  }, []);
  const getcontacts = () => {
    axios.post("/api/contacts/getcontacts").then((response) => {
      if (response.data.success) {
        setContacts([...response.data.contactInfo]);
      } else alert("데이터를 가져오지 못했습니다.");
    });
  };

  const renderCards = contacts
    .slice(0)
    .reverse()
    .map((contact, index) => {
      return (
        <div className="m-3 p-3 border-bottom">
          <p className="text-end">
            {contact.syncTime.toString().split(" ").slice(0, 5).join(" ")}
          </p>
          <p>Writer : {contact.writer}</p>
          <p>Email : {contact.email}</p>
          <p>Phone : {contact.phone}</p>
          <p>Content : {contact.content}</p>
        </div>
      );
    });
  return (
    <div style={{ width: "75%" }}>
      <Title level={3}>입점 문의 내역</Title>
      <div>{renderCards}</div>
    </div>
  );
};

export default CheckContactPage;
