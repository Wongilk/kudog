import React from "react";
import { SmileOutlined } from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="mt-5">
      <div
        className="text-bg-light p-3"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
        }}
      >
        <p>
          <SmileOutlined />
        </p>
      </div>
    </div>
  );
};

export default Footer;
