import axios from "axios";

import React, { useEffect, useState } from "react";

import { Typography } from "antd";
const { Title } = Typography;

function DeletePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getall();
  }, [products]);

  const getall = () => {
    axios
      .post("/api/products/get_all")
      .then((response) => setProducts(response.data));
  };

  const onRemoveProduct = (productId) => {
    let body = {
      productId: productId,
    };
    axios.post("/api/products/remove_product", body).then((response) => {
      if (response.data.success) {
        alert("삭제 완료");
        getall();
      }
    });
    console.log(productId);
  };
  const renderImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };
  const renderProduct = (products) => {
    return products.map((item, index) => (
      <tr key={index}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={renderImage(item.images)}
          ></img>
        </td>
        <td>{item.brand}</td>
        <td>{item.title}</td>
        <td>
          <button
            className="btn btn-default border"
            onClick={() => onRemoveProduct(item._id)}
          >
            remove product
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <div className="w-75">
      <Title className="mb-3" level={3}>
        상품 정보 삭제
      </Title>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Brand</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{products ? renderProduct(products) : null}</tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default DeletePage;
