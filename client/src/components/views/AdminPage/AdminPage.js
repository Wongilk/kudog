import React, { useState } from "react";
import UploadPage from "./UploadPage/UploadPage";
import DeletePage from "./DeletePage/DeletePage";
import DeliverPage from "./DeliverPage/DeliverPage";
import CheckContactPage from "./CheckContactPage/CheckContactPage";
import axios from "axios";
import { USER_SERVER } from "../../Config";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isUpload, setIsUpload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeliver, setIsDeliver] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const onIsUploadClick = () => {
    setIsUpload(true);
    setIsDelete(false);
    setIsDeliver(false);
    setIsContact(false);
  };
  const onIsDeleteClick = () => {
    setIsUpload(false);
    setIsDelete(true);
    setIsDeliver(false);
    setIsContact(false);
  };
  const onIsDeliverClick = () => {
    setIsDelete(false);
    setIsUpload(false);
    setIsDeliver(true);
    setIsContact(false);
  };
  const onIsContactClick = () => {
    setIsDelete(false);
    setIsUpload(false);
    setIsDeliver(false);
    setIsContact(true);
  };
  const onLogoutClick = async () => {
    await axios.get(`${USER_SERVER}/logout`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        alert("로그아웃 완료");
        navigate("/");
      } else alert("로그아웃 실패");
    });
  };
  const onHomeClick = () => {
    navigate("/");
  };
  return (
    <div className="d-flex">
      <div className="m-5 mt-1">
        <div className="p-5 border bg-light">
          <h1 className="mb-4">Admin</h1>

          <ul style={{ listStyleType: "none" }}>
            <li>
              <a
                onClick={onHomeClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                KUDOG
              </a>
            </li>
            <li>
              <a
                onClick={onIsUploadClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Upload
              </a>
            </li>
            <li>
              <a
                onClick={onIsDeleteClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Delete
              </a>
            </li>
            <li>
              <a
                onClick={onIsDeliverClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Order
              </a>
            </li>
            <li>
              <a
                onClick={onIsContactClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                onClick={onLogoutClick}
                style={{ textDecoration: "none", color: "black" }}
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isUpload ? (
        <UploadPage />
      ) : isDelete ? (
        <DeletePage />
      ) : isContact ? (
        <CheckContactPage />
      ) : isDeliver ? (
        <DeliverPage />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminPage;
