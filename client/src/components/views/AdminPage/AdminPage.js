import React, { useState } from "react";
import UploadPage from "./UploadPage/UploadPage";
import DeletePage from "./DeletePage/DeletePage";
import DeliverPage from "./DeliverPage/DeliverPage";
const AdminPage = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeliver, setIsDeliver] = useState(false);
  const onIsUploadClick = () => {
    setIsUpload(true);
    setIsDelete(false);
    setIsDeliver(false);
  };
  const onIsDeleteClick = () => {
    setIsUpload(false);
    setIsDelete(true);
    setIsDeliver(false);
  };
  const onIsDeliverClick = () => {
    setIsDelete(false);
    setIsUpload(false);
    setIsDeliver(true);
  };
  return (
    <div className="d-flex">
      <div className="m-5 mt-1">
        <div className="p-5 border">
          <h1 className="mb-4">MyPage</h1>

          <ul style={{ listStyleType: "none" }}>
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
                Deliver
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isUpload ? (
        <UploadPage />
      ) : isDelete ? (
        <DeletePage />
      ) : isDeliver ? (
        <DeliverPage />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminPage;
