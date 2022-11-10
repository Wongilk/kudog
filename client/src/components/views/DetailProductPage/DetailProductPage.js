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
  useEffect(() => {
    axios
      .get(`/api/products/product_by_id?id=${productId}&type=single`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((error) => alert(error));
  }, []);
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
    </div>
  );
};

export default DetailProductPage;
