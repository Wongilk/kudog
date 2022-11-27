import React, { useState } from "react";
import DoUpload from "../../../../utils/DoUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const WriteReviewPage = ({ proInfoForReview }) => {
  //selectItemId 삭제
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.userReducer.userData);
  const navigate = useNavigate();
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  console.log(!images);
  const onSubmit = () => {
    if (!description || !images) alert("모든 항목을 기입해주세요");
    else {
      let body = {
        writer: user._id,
        email: user.email,
        description: description,
        date: new Date().toLocaleString("ko-kr"),
        brand: proInfoForReview.brand,
        size: proInfoForReview.size,
        productName: proInfoForReview.productName,
        images: images,
        selectItemId: proInfoForReview.selectItemId, //수정
      };
      axios.post("/api/reviews/store", body).then((response) => {
        if (response.data.success) {
          alert("리뷰 등록 완료");
          navigate("/review");
        }
      });
    }
  };
  return (
    <div>
      <h1>Write review</h1>

      <form>
        <label>brand : </label>
        <input value={proInfoForReview.brand} />
        <br />
        <label>productName : </label>
        <input value={proInfoForReview.productName} />
        <br />
        <label>size : </label>
        <input value={proInfoForReview.size} />
        <br />
        <DoUpload updateImages={updateImages} />

        <label>review</label>
        <br />
        <textarea value={description} onChange={onDescriptionChange} required />
        <br />
        <input type="button" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default WriteReviewPage;
