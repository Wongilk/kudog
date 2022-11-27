import { React, useEffect, useState } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../../../_actions/user_actions";
import axios from "axios";

const ProductDetail = (detail) => {
  const product = detail.detail;
  const dispatch = useDispatch();
  const [selectSize, setSelectSize] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(product);
  }, [product]);

  const onClick = () => {
    dispatch(AddToCart(product._id, selectSize)).then((response) => {
      if (response.payload.success) alert("장바구니에 추가됨");
      else console.log("추가 실패");
    });
  };
  //상품 사이즈 render
  const renderSize = (productSizeAndQuantity) => {
    //재고 있는 것 확인
    let inStock = [];
    if (productSizeAndQuantity) {
      for (let i = 0; i < productSizeAndQuantity.length; i++) {
        if (productSizeAndQuantity[i].quantity > 0) {
          inStock.push(i);
        }
      }
    }
    if (productSizeAndQuantity) {
      return productSizeAndQuantity.map((item, index) =>
        inStock.includes(index) ? <option key={index}>{item.size}</option> : ""
      );
    }
  };

  const onChange = (e) => {
    setSelectSize(e.target.value);
    console.log(selectSize);
  };

  const getReviews = (product) => {
    if (product) {
      let body = {
        product_id: product._id,
      };
      axios.post("/api/reviews/get_reviews", body).then((response) => {
        console.log(response.data);
      });
    }
  };
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>{product.title}</h1>
        <h3>{product.brand}</h3>
        <pre style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          {product.description}
        </pre>
        <hr />
        <p>stamps : {product.price}</p>
        size :{" "}
        <select onChange={onChange}>
          <option>------------</option>
          {renderSize(product.sizeAndQuantity)}
        </select>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={onClick}>
          Add to cart
        </Button>
      </div>

      <hr />
    </div>
  );
};

export default ProductDetail;
//수정
