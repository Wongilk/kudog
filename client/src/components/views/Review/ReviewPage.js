import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageSlider from "../../../utils/ImageSlider";
const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios.post("/api/reviews/get_reviews").then((response) => {
      setReviews(response.data.reviewInfo);
    });
  }, []);

  const renderReviews = (item) => {
    return (
      <tr key={item.updatedAt}>
        <td>
          <img src={`http://localhost:5000/${item.images}`}></img>
        </td>
        <td>{item.email}</td>
        <td>{item.brand}</td>
        <td>{item.productName}</td>
        <td>{item.size}</td>
        <td>{item.date}</td>
        <td>{item.description}</td>
      </tr>
    );
  };
  return (
    <div>
      <h1>Reviews</h1>

      <table>
        <thead>
          <tr>
            <th>image</th>
            <th>writer</th>
            <th>brand</th>
            <th>productName</th>
            <th>size</th>
            <th>Date of written</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>{reviews && reviews.map((item) => renderReviews(item))}</tbody>
      </table>
    </div>
  );
};

export default ReviewPage;
