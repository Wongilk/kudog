import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
const DoUpload = ({ updateImages }) => {
  const [images, setImages] = useState([]);
  const fileHandler = (files) => {
    let formData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", files[0]);
    axios.post("/api/products/image", formData, config).then((response) => {
      if (response.data.success) {
        setImages([...images, response.data.filePath]);
        updateImages([...images, response.data.filePath]);
      } else {
        alert("파일 저장에 실패하였습니다.");
      }
    });
  };

  const deleteHandler = (image) => {
    const deleteIndex = images.indexOf(image);
    const newImages = [...images];
    newImages.splice(deleteIndex, 1);
    setImages(newImages);
    updateImages(newImages);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={fileHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: "300px",
                height: "250px",
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <PlusOutlined style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "300px",
          height: "250px",
          overflowX: "scroll",
        }}
      >
        {images.map((image, index) => (
          <div key={index} onClick={() => deleteHandler(image)}>
            <img
              style={{ minWidth: "250px", width: "300px", height: "250px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoUpload;
