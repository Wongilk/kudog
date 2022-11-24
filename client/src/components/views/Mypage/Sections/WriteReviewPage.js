import React, { useState } from "react";
import DoUpload from "../../../../utils/DoUpload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const WriteReviewPage = ({ proInfoForReview, selectItemId }) => {
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
  console.log(proInfoForReview);
  const onSubmit = () => {
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
    console.log(body);
    if (!description || !images) alert("모든 항목을 기입해주세요");
    else {
      axios.post("/api/reviews/store", body).then((response) => {
        if (response.data.success) {
          alert("리뷰 등록 완료");
          navigate("/mypage");
        }
      });
    }
  };
  console.log(proInfoForReview);
  return (
    <div>
      <h1>Write review</h1>

      <form>
        <label>brand </label>
        <input className="border p-2 w-100 mb-1" value={proInfoForReview.brand} />
        <br />
        <label>productName</label>
        <input className="border p-2 w-100 mb-1" value={proInfoForReview.productName} />
        <br />
        <label>size</label>
        <input className="border p-2 w-100 mb-1" value={proInfoForReview.size} />
        <p className="mt-3 mb-3"><DoUpload updateImages={updateImages} /></p>

        <p><textarea
          className="border p-2 w-100"
          placeholder="Enter Your Review Here"
          value={description} onChange={onDescriptionChange} required/>
        </p>
        <p><input 
          className="btn btn-secondary border w-100"
          type="button"
          value="Submit"
          onClick={onSubmit}/>
          </p>
      </form>
    </div>
  );
};

export default WriteReviewPage;