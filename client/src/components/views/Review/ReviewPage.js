import axios from "axios";
import React, { useEffect, useState } from "react";
const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.post("/api/reviews/get_reviews").then((response) => {
      setReviews(response.data.reviewInfo);
    });
  }, []);

  const renderReviews = (item) => {
    return (
      <div className="float-start m-2 p-3 border" style={{ width: "250px" }}>
        <p>
          <img
            className="w-100"
            style={{ height: "250px" }}
            src={`http://localhost:5000/${item.images}`}
          ></img>
        </p>
        <p className="mb-0 text-muted">{item.brand}</p>
        <h5>
          <a
            href={`http://localhost:3000/product/${item.selectItemId}`}
            style={{ color: "black" }}
          >
            {item.productName}
          </a>
        </h5>
        <p className="mb-0">작성자 : {item.email}</p>
        <p className="mb-0">구매 사이즈 : {item.size}</p>
        <p className="bg-light p-2 m-0">{item.description}</p>
        <p className="text-muted mb-0">{item.date}</p>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <h4 className="text-center p-5">전체 상품 리뷰</h4>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          {reviews &&
            reviews
              .map((item) => renderReviews(item))
              .slice(0)
              .reverse()}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
