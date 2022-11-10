import { React, useState } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../../../_actions/user_actions";
const ProductDetail = (detail) => {
  const product = detail.detail;
  const dispatch = useDispatch();
  const [selectSize, setSelectSize] = useState("");
  const onClick = () => {
    dispatch(AddToCart(product._id, selectSize)).then((response) => {
      if (response.payload.success) alert("장바구니에 추가됨");
      else console.log("추가 실패");
    });
  };
  const renderSize = (productSize) => {
    if (productSize)
      return productSize.map((item, index) => (
        <option key={index}>{item}</option>
      ));
  };
  const onChange = (e) => {
    setSelectSize(e.target.value);
    console.log(selectSize);
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
          {renderSize(product.size)}
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
    </div>
  );
};

export default ProductDetail;
