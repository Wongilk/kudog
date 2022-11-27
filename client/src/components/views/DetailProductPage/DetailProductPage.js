import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "antd";
import ProductDetail from "./Sections/ProductDetail";
import ProductImage from "./Sections/ProductImage";
const DetailProductPage = () => {
  const [product, setProduct] = useState({});
  let params = useParams();
  const productId = params.productId;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products/product_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
        getReviews(response.data[0]);
      })
      .catch((error) => alert(error));
  }, []);
  const getReviews = (product) => {
    if (product) {
      let body = {
        product_id: product._id,
      };
      axios.post("/api/reviews/get_reviews", body).then((response) => {
        setReviews(response.data.reviewInfo);
      });
    }
  };
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
        <h5>{item.productName}</h5>
        <p className="mb-0">작성자 : {item.email}</p>
        <p className="mb-0">구매 사이즈 : {item.size}</p>
        <p className="bg-light p-2 m-0">{item.description}</p>
        <p className="text-muted mb-0">{item.date}</p>
      </div>
    );
  };

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductDetail detail={product} />
        </Col>
      </Row>

      <>
        <div className="mt-5 pb-5 border">
          <h4 className="text-center p-5">Review</h4>
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
      </>
    </div>
  );
};

export default DetailProductPage;
